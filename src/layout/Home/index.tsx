import {
  Fragment,
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { IMovieResults } from "../../types/movie";
import { genres } from "../../constant";
import { HomeComponent } from "./HomeComponent";
import { useMovie } from "../../context";
import { UseApiPerformance } from "../../hooks";

interface HomePageProps {}

export const HomePage: FunctionComponent<HomePageProps> = () => {
  const [popularMovie, setPopularMovie] = useState<IMovieResults[] | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(false);
  const categorizedMovies: Record<string, IMovieResults[]> = {};

  const { addCurrentMovie, addApiMetrics } = useMovie();

  const handleFetchNowPlayingMovie = async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.PUBLIC_BEARER_TOKEN}`,
      },
    };

    setLoading(true);

    const response = await fetch(
      `${process.env.PUBLIC_API_ENDPOINT}/3/movie/now_playing?language=en-US&page=1`,
      options
    );

    if (!response.ok) throw new Error("Unknown error occurred");

    const movie = await response.json();
    setLoading(false);

    // eslint-disable-next-line react-hooks/rules-of-hooks

    return setPopularMovie(movie.results);
  };

  popularMovie?.forEach((movie) => {
    movie.genre_ids.forEach((genreId) => {
      const genreName =
        genres.find((genre) => genre.id === genreId)?.name || "Other";

      if (!categorizedMovies[genreName]) {
        categorizedMovies[genreName] = [];
      }

      categorizedMovies[genreName].push(movie);
    });
  });

  const apiFunction = useCallback(
    async () => await handleFetchNowPlayingMovie(),
    []
  );

  const apiName = "Popular Movies API";

  const { loadingTime, functionName } = UseApiPerformance({
    apiName,
    apiFunction,
  });

  useEffect(() => {
    if (popularMovie === undefined) handleFetchNowPlayingMovie();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    addApiMetrics(apiName, loadingTime, functionName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingTime]);

  return (
    <Fragment>
      <HomeComponent
        popularMovie={popularMovie === undefined ? [] : popularMovie}
        categorizedMovies={categorizedMovies}
        loading={loading}
        addCurrentMovie={addCurrentMovie}
      />
    </Fragment>
  );
};
