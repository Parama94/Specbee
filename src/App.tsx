import { createBrowserRouter, RouterProvider } from "react-router-dom";
import StocksPage from "./pages/Stocks/StocksPage";
import { Provider } from "react-redux";
import { store } from "./store/store";
import NotFound from "./pages/NotFound/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <StocksPage />,
    errorElement: <NotFound />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
