import { useState, useEffect } from "react";
import { ApiType } from "../types/movie";

interface UseApiPerformanceProps {
  apiFunction: () => Promise<void>;
  apiName: ApiType;
}

interface UseApiPerformanceResult {
  loadingTime: number;
  functionName: string;
}

export const UseApiPerformance = ({
  apiFunction,
  apiName,
}: UseApiPerformanceProps): UseApiPerformanceResult => {
  const [loadingTime, setLoadingTime] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const startTime = performance.now();

      try {
        await apiFunction();
      } finally {
        const endTime = performance.now();
        const duration = endTime - startTime;

        setLoadingTime(duration);
      }
    };

    fetchData();
  }, [apiFunction, apiName]);

  return { functionName: apiName, loadingTime };
};
