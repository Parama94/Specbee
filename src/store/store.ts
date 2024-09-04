import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { stocksSlice } from "./stocksSlice";

const rootReducer = combineSlices(stocksSlice);
export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });

  return store;
};

export const store = makeStore();

export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
