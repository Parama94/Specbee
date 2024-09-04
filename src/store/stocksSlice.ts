import { PayloadAction } from "@reduxjs/toolkit";
import { FilterProps } from "../components/Filter/Filter";
import { fetchStocksService, Stock, StockList } from "../services/fetchStocks";
import { createAppSlice } from "./createAppSlice";
import { PAGE_LENGTH } from "../constants/constants";

export type StocksSliceState = {
  data: StockList;
  paginatedData: StockList;
  totalStocks: number;
  status: "loading" | "success" | "failed";
  filters: Partial<FilterProps>[];
};

type PayloadType = { page: number; filters: { [key: string]: string[] } };

const initialState: StocksSliceState = {
  data: [],
  paginatedData: [],
  totalStocks: 0,
  status: "success",
  filters: [],
};

export const stocksSlice = createAppSlice({
  name: "stocks",
  initialState,
  reducers: (create) => ({
    getPaginatedData: create.reducer(
      (state, action: PayloadAction<PayloadType>) => {
        state.paginatedData = [];

        const { page, filters } = action.payload;
        const pageNumber = page ?? 1;

        // Filtering
        const filteredData = state.data.filter((item) => {
          return Object.keys(filters).every((category) => {
            if (category === "sort by") return true;
            const selectedOptions = filters[category];
            if (selectedOptions.length === 0) return true;
            return selectedOptions.includes(item[category as keyof Stock]);
          });
        });

        // Sorting
        let sortFields = filters["sort by"].map((field) => ({
          field: field,
          order: filters["sort by"].includes(field) ? "asc" : "desc",
        }));

        if (sortFields.length === 0) {
          sortFields = [
            { field: "Date", order: "desc" },
            { field: "Title", order: "desc" },
          ];
        }

        filteredData.sort((a, b) => {
          for (const { field, order } of sortFields) {
            const lowerCaseField = field.toLowerCase() as keyof Stock;
            if (a[lowerCaseField] < b[lowerCaseField])
              return order === "asc" ? -1 : 1;
            if (a[lowerCaseField] > b[lowerCaseField])
              return order === "asc" ? 1 : -1;
          }
          return 0;
        });

        // Pagination
        const result = filteredData.slice(
          (pageNumber - 1) * PAGE_LENGTH,
          pageNumber * PAGE_LENGTH
        );

        state.paginatedData = [...result];
        state.totalStocks = filteredData.length;
      }
    ),
    fetchStocks: create.asyncThunk(
      async () => {
        const response = await fetchStocksService();
        return response.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "success";
          state.data.push(...action.payload);
          state.totalStocks = action.payload.length;
          stocksSlice.caseReducers.getPaginatedData(state, {
            type: "getPaginatedData",
            payload: {
              page: 1,
              filters: { source: [], author: [], "sort by": ["Date"] },
            },
          });

          // Filters
          const authors: string[] = [];
          const categories: string[] = [];
          action.payload.forEach((ele: Stock) => {
            authors.push(ele.author);
            categories.push(ele.source);
          });

          const uniqueAuthors = Array.from(new Set(authors));
          const uniqueCategories = Array.from(new Set(categories));

          state.filters.push(
            {
              title: "Category",
              list: uniqueCategories,
            },
            {
              title: "Author",
              list: uniqueAuthors,
            },
            {
              title: "Sort By",
              list: ["Date", "Title"],
            }
          );
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
  }),
  selectors: {
    selectPaginatedData: (state) => state.paginatedData,
    selectFilters: (state) => state.filters,
    selectStatus: (state) => state.status,
    selectTotalStocks: (state) => state.totalStocks,
  },
});

export const { getPaginatedData, fetchStocks } = stocksSlice.actions;

export const {
  selectPaginatedData,
  selectFilters,
  selectStatus,
  selectTotalStocks,
} = stocksSlice.selectors;
