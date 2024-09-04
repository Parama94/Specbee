import styles from "./StocksPage.module.css";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchStocks,
  getPaginatedData,
  selectFilters,
  selectPaginatedData,
  selectStatus,
  selectTotalStocks,
} from "../../store/stocksSlice";
import { PAGE_LENGTH } from "../../constants/constants";
import { Card, Filter, Pagination } from "../../components";

const StocksPage = () => {
  const stocks = useAppSelector(selectPaginatedData);
  const filters = useAppSelector(selectFilters);
  const status = useAppSelector(selectStatus);
  const totalStocks = useAppSelector(selectTotalStocks);
  const dispatch = useAppDispatch();
  const [filtersApplied, setFiltersApplied] = useState<{
    [key: string]: string[];
  }>({
    source: [],
    author: [],
    "sort by": ["Date"],
  });

  useEffect(() => {
    dispatch(fetchStocks());
  }, []);

  useEffect(() => {
    console.log("filters", filtersApplied);
    dispatch(
      getPaginatedData({
        page: 1,
        filters: {
          ...filtersApplied,
        },
      })
    );
  }, [filtersApplied]);

  const onFilter = (source: string, value: string, checked: boolean) => {
    setFiltersApplied((prevFilters) => {
      const categoryFilters = prevFilters[source] || [];
      return {
        ...prevFilters,
        [source]: checked
          ? [...categoryFilters, value]
          : categoryFilters.filter((item) => item !== value),
      };
    });
  };

  const onPageChange = (page: number) => {
    dispatch(
      getPaginatedData({
        page: page,
        filters: {
          ...filtersApplied,
        },
      })
    );
  };

  return (
    <>
      {status === "loading" && (
        <div className={styles.loaderContainer}>
          <div className={styles.loader}></div>
        </div>
      )}
      {status === "failed" && <div>Something went wrong. Try again</div>}
      {status === "success" && stocks.length <= 0 && (
        <div>No result found for Selection</div>
      )}
      {status === "success" && stocks.length > 0 && (
        <div>
          <div className={styles.container}>
            <div className={styles.filters}>
              {filters.map(({ title, list }) => (
                <Filter
                  key={crypto.randomUUID()}
                  title={title ?? ""}
                  list={list ?? []}
                  filtersApplied={filtersApplied}
                  onFilter={onFilter}
                />
              ))}
            </div>

            <div className={styles.stocks}>
              {stocks.map((stock) => (
                <Card
                  key={crypto.randomUUID()}
                  title={stock.title}
                  image={stock.image}
                  date={stock.date}
                  body={stock.body}
                  source={stock.source}
                  author={stock.author}
                />
              ))}
            </div>
          </div>
          <Pagination
            totalPages={Math.ceil(totalStocks / PAGE_LENGTH)}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </>
  );
};

export default StocksPage;
