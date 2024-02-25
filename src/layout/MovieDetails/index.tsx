import {
  Fragment,
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useMovie } from "../../context/Provider";
import { IMovieDetails } from "../../types/movie";
import { MovieDetailsComponent } from "./MovieDetailsComponent";
import { UseApiPerformance } from "../../hooks";

export const MovieDetailsPage: FunctionComponent = () => {
  const { currentMovie, addApiMetrics } = useMovie();
  const [loading, setLoading] = useState<boolean>(false);
  const [details, setDetails] = useState<IMovieDetails | undefined>(undefined);

  const handleFetchMovieDetails = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.PUBLIC_BEARER_TOKEN}`,
      },
    };
    setLoading(true);
    const response = await fetch(
      `${process.env.PUBLIC_API_ENDPOINT}/3/movie/${
        currentMovie!.id
      }?language=en-US`,
      options
    );

    if (!response.ok) throw new Error("Unknown error occurred");

    const details = await response.json();

    setLoading(false);
    return setDetails(details);
  };

  const apiFunction = useCallback(
    async () => await handleFetchMovieDetails(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const apiName = "Details Movie API";

  const { loadingTime, functionName } = UseApiPerformance({
    apiName,
    apiFunction,
  });

  useEffect(() => {
    if (details === undefined) handleFetchMovieDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    addApiMetrics(apiName, loadingTime, functionName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingTime]);
  return (
    <Fragment>
      <MovieDetailsComponent loading={loading} details={details!} />
    </Fragment>
  );
};
