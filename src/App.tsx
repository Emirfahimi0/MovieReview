import { Fragment, FunctionComponent } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage, MovieDetailsPage, MetricsPage } from "./layout";
import { ComponentTiming } from "./layout/ComponentTiming";
import { ComponentTimingProvider } from "./context";

export const App: FunctionComponent = () => {
  const ComponentTimingHomePage = ComponentTiming(HomePage, "HomePage");
  const ComponentTimingMovieDetailsPage = ComponentTiming(
    MovieDetailsPage,
    "MovieDetailsPage"
  );
  const ComponentTimingMetricsPage = ComponentTiming(
    MetricsPage,
    "MetricsPage"
  );

  const appRoutes = createBrowserRouter([
    {
      index: true,
      path: "/MovieReview/",
      element: <ComponentTimingHomePage componentName={"HomePage"} />,
    },
    {
      path: "/MovieReview/Details",
      element: (
        <ComponentTimingMovieDetailsPage componentName={"MovieDetailsPage"} />
      ),
    },
    {
      path: "/MovieReview/Metrics",
      element: <ComponentTimingMetricsPage componentName={"MetricsPage"} />,
    },
  ]);

  return (
    <Fragment>
      <ComponentTimingProvider>
        <RouterProvider router={appRoutes} />
      </ComponentTimingProvider>
    </Fragment>
  );
};
