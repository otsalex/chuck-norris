import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Root from "./routes/Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./routes/About";
import Jokes from "./routes/Jokes";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Favourites from "./routes/Favourites";
import EditJoke from "./routes/EditJoke";
import ErrorPage from "./routes/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "about",
        element: <About />,
      },
      {
        path: "",
        element: <Jokes />,
      },
      {
        path: "favourites",
        element: <Favourites />,
      },
      {
        path: "edit/:id",
        element: <EditJoke />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
