import { Fragment, FunctionComponent } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

  const routes = [
    {
      index: true,
      path: "MovieReview/movies/",
      element: <ComponentTimingHomePage componentName={"HomePage"} />,
    },
    {
      path: "MovieReview/movies/Details",
      element: (
        <ComponentTimingMovieDetailsPage componentName={"MovieDetailsPage"} />
      ),
    },
    {
      path: "MovieReview/movies/Metrics",
      element: <ComponentTimingMetricsPage componentName={"MetricsPage"} />,
    },
  ];

  return (
    <Fragment>
      <ComponentTimingProvider>
        <BrowserRouter basename={import.meta.env.DEV ? "/" : "/MovieReview/"}>
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} {...route} />
            ))}
          </Routes>
        </BrowserRouter>
      </ComponentTimingProvider>
    </Fragment>
  );
};
