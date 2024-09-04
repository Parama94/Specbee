export type Stock = {
  title: string;
  image: string;
  date: string;
  body: string;
  source: string;
  author: string;
};

export type StockList = Stock[];

export const fetchStocksService = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/news`);
  const result = await response.json();
  return { data: result };
};
