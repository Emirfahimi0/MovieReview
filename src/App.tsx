import { Fragment, FunctionComponent } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage, MovieDetailsPage, MetricsPage } from "./layout";
import { ComponentTiming } from "./layout/ComponentTiming";
import { ComponentTimingProvider } from "./context";
import { Header } from "./components/NavBar";

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

  return (
    <Fragment>
      <ComponentTimingProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route
              path="/MovieReview/"
              element={<ComponentTimingHomePage componentName={"HomePage"} />}
            />
            <Route
              path="/MovieReview/Details"
              element={
                <ComponentTimingMovieDetailsPage
                  componentName={"MovieDetailsPage"}
                />
              }
            />
            <Route
              path="/MovieReview/Metrics"
              element={
                <ComponentTimingMetricsPage componentName={"MetricsPage"} />
              }
            />
          </Routes>
        </BrowserRouter>
      </ComponentTimingProvider>
    </Fragment>
  );
};
