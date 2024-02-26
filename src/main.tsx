import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { reportWebVitals } from "./reportWebVitals"; // Import the function
import { MovieProvider as GlobalProvider } from "./context";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage, MetricsPage, MovieDetailsPage } from "./layout/index.ts";

const appRouter = createBrowserRouter([
  {
    path: "/MovieReview/",
    element: <HomePage />,
    children: [
      {
        path: "/MovieReview/Details",
        element: <MovieDetailsPage />,
      },
      {
        path: "/MovieReview/Metrics",
        element: <MetricsPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalProvider>
      <RouterProvider router={appRouter} />
    </GlobalProvider>
  </React.StrictMode>
);

reportWebVitals();
