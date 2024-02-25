// MetricsPage.tsx
import { Fragment, FunctionComponent } from "react";
import { useComponentTiming, useMovie } from "../../context";
import { CardContainer } from "../../components/CardContainer";

export const MetricsPage: FunctionComponent = () => {
  const { timings } = useComponentTiming();
  const { apiMetrics } = useMovie();

  return (
    <div className="mx-auto">
      <h2 className="flex justify-center items-center py-8 font-bold uppercase text-lg">
        Component Timings
      </h2>
      <div className="grid md:grid-flow-col justify-evenly py-10">
        {Object.entries(timings).map(([componentName, duration], index) => (
          <Fragment key={index}>
            <CardContainer label={componentName} duration={duration} />
          </Fragment>
        ))}
      </div>
      <Fragment>
        {!apiMetrics ? null : (
          <Fragment>
            <h2 className="flex justify-center items-center py-8 font-bold uppercase text-lg">
              API Time
            </h2>
            <div className="grid md:grid-flow-col justify-evenly py-10">
              {Object.entries(apiMetrics).map(
                ([apiName, { loadingTime }], index) => (
                  <Fragment key={index}>
                    <CardContainer label={apiName} duration={loadingTime} />
                  </Fragment>
                )
              )}
            </div>
          </Fragment>
        )}
      </Fragment>
    </div>
  );
};
