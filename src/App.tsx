import { Fragment, FunctionComponent } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage, MovieDetailsPage, MetricsPage } from "./layout";
import { ComponentTiming } from "./layout/ComponentTiming";
import {
  ComponentTimingProvider,
  MovieProvider as GlobalProvider,
} from "./context";

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
      path: "/vite-react-router/",
      element: <ComponentTimingHomePage componentName={"HomePage"} />,
    },
    {
      path: "vite-react-router/Details",
      element: (
        <ComponentTimingMovieDetailsPage componentName={"MovieDetailsPage"} />
      ),
    },
    {
      path: "vite-react-router//Metrics",
      element: <ComponentTimingMetricsPage componentName={"MetricsPage"} />,
    },
  ];

  return (
    <Fragment>
      <GlobalProvider>
        <ComponentTimingProvider>
          <BrowserRouter>
            <Routes>
              {routes.map((route, index) => (
                <Route key={index} {...route} />
              ))}
            </Routes>
          </BrowserRouter>
        </ComponentTimingProvider>
      </GlobalProvider>
    </Fragment>
  );
};
