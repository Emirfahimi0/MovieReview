import React, { useEffect, useRef, ComponentType } from "react";
import { useComponentTiming } from "../context";

interface WithComponentTimingProps {
  componentName: string;
}

export const ComponentTiming = <P extends object>(
  WrappedComponent: ComponentType<P>,
  componentName: string
) => {
  const ComponentTimingWrapper: React.FC<P & WithComponentTimingProps> = (
    props
  ) => {
    const { addTiming } = useComponentTiming();
    const renderStartTime = useRef(performance.now());

    useEffect(() => {
      const renderEndTime = performance.now();
      const renderDuration = renderEndTime - renderStartTime.current;

      addTiming(componentName, renderDuration);
      /* eslint-disable react-hooks/exhaustive-deps */
    }, [componentName]);

    return <WrappedComponent {...props} />;
  };

  return ComponentTimingWrapper;
};
