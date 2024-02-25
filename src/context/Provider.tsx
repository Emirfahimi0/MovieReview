import { ReactNode, createContext, useContext, useState } from "react";
import { IMovieResults } from "../types/movie";

type MovieProviderType = {
  children: ReactNode;
};

interface MovieProviderContextProps {
  currentMovie: IMovieResults | undefined;
  apiMetrics: { [key: string]: { loadingTime: number; functionName: string } };
  addApiMetrics: (
    apiName: string,
    loadingTime: number,
    functionName: string
  ) => void;
  addCurrentMovie: (value: IMovieResults) => void;
}

const MovieContext = createContext<MovieProviderContextProps | undefined>(
  undefined
);

const { Provider } = MovieContext;

// eslint-disable-next-line react-refresh/only-export-components
export const useMovie = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("must be used within a MovieProvider");
  }
  return context;
};

export const MovieProvider = ({ children }: MovieProviderType) => {
  const [currentMovie, setCurrentMovie] = useState<IMovieResults | undefined>(
    () => {
      // Retrieve the currentMovie from localStorage on component mount
      const storedMovie = localStorage.getItem("currentMovie");
      return storedMovie ? JSON.parse(storedMovie) : undefined;
    }
  );

  const [apiMetrics, setApiMetrics] = useState<{
    [key: string]: { loadingTime: number; functionName: string };
  }>({});

  const addCurrentMovie = (movie: IMovieResults) => {
    setCurrentMovie(movie);

    // Save the currentMovie to localStorage when it changes
    localStorage.setItem("currentMovie", JSON.stringify(movie));
  };

  const addApiMetrics = (
    apiName: string,
    loadingTime: number,
    functionName: string
  ) => {
    setApiMetrics((prevMetrics) => ({
      ...prevMetrics,
      [apiName]: { loadingTime, functionName },
    }));
  };

  const contextValue: MovieProviderContextProps = {
    addCurrentMovie,
    addApiMetrics,
    apiMetrics,
    currentMovie,
  };

  return <Provider value={contextValue}>{children}</Provider>;
};
