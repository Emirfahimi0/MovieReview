// ComponentTimingProvider.tsx
import { FunctionComponent, ReactNode, useState } from "react";

type ComponentTimingProviderProps = {
  children: ReactNode;
};

import { createContext, useContext } from "react";

interface ComponentTimingContextProps {
  timings: Record<string, number>;
  addTiming: (componentName: string, duration: number) => void;
}

const ComponentTimingContext = createContext<
  ComponentTimingContextProps | undefined
>(undefined);

const { Provider } = ComponentTimingContext;
// eslint-disable-next-line react-refresh/only-export-components
export const useComponentTiming = () => {
  const context = useContext(ComponentTimingContext);
  if (!context) {
    throw new Error(
      "useComponentTiming must be used within a ComponentTimingProvider"
    );
  }
  return context;
};

export const ComponentTimingProvider: FunctionComponent<
  ComponentTimingProviderProps
> = ({ children }) => {
  const [timings, setTimings] = useState<Record<string, number>>({});

  const addTiming = (componentName: string, duration: number) => {
    setTimings((prevTimings) => ({
      ...prevTimings,
      [componentName]: duration,
    }));
  };

  const contextValue = {
    timings,
    addTiming,
  };

  return <Provider value={contextValue}>{children}</Provider>;
};
