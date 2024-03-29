import { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Loading } from "../../components/Loader";
import { DetailsContainer } from "./DetailsContainer";
import {
  IMovieDetails,
  IMovieRecommendation,
  IMovieResults,
} from "../../types/movie";

interface MovieDetailsComponentProps {
  loading: boolean;
  details: IMovieDetails;
  addCurrentMovie: (value: IMovieResults) => void;
  currentMovie: IMovieResults | undefined;
}

export const MovieDetailsComponent: FunctionComponent<
  MovieDetailsComponentProps
> = ({
  loading,
  details,
  currentMovie,
  addCurrentMovie,
}: MovieDetailsComponentProps) => {
  const [loader, setLoading] = useState<boolean>(false);

  const [recommendations, setRecommendations] = useState<
    IMovieRecommendation[] | undefined
  >(undefined);
  const handleFetchSimilarMovies = async () => {
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
      }/recommendations?language=en-US&page=1`,
      options
    );
    if (!response.ok) throw new Error("Unknown error occurred");

    const result = await response.json();
    setRecommendations(result.results);
    setLoading(false);
  };

  useEffect(() => {
    if (recommendations === undefined) handleFetchSimilarMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      {loading === true ? (
        <div className="flex items-center justify-center bg-gray-100 min-h-screen">
          <Loading />
        </div>
      ) : (
        <Fragment>
          <div className="flex min-h-screen">
            <div
              className="relative overflow-hidden w-full bg-cover"
              style={{
                backgroundImage: `url(${process.env.PUBLIC_API_IMAGE_PATH_ORIGINAL}/${details?.backdrop_path})`,
              }}
            >
              <div className="h-full w-full bg-fixed bg-[hsla(0,0%,0%,0.75)]">
                <div className="top-0 flex justify-center items-center h-full p-8 md:p-16 lg:p-24 flex-col text-justify">
                  {details === undefined ? null : (
                    <DetailsContainer {...details} />
                  )}
                  {loader === true ? (
                    <div className="py-8">
                      <Loading />
                    </div>
                  ) : (
                    <section className="flex justify-center items-center gap-4 overflow-x-scroll py-8 max-w-[1024px] mt-8 w-full">
                      {recommendations &&
                        recommendations.map((recommendation, index) => {
                          const handleRecommendation = () => {
                            addCurrentMovie(recommendation);
                          };

                          return (
                            <Fragment key={index}>
                              <div className="flex-none text-center text-pretty space-y-4 text-white">
                                <img
                                  src={`${process.env.PUBLIC_API_IMAGE_PATH}/${recommendation?.backdrop_path}`}
                                  className="rounded-lg object-cover md:w-64 lg:w-96 w-80 h-full"
                                  alt={`Recommendation ${index + 1}`}
                                  onClick={handleRecommendation}
                                />
                                <p className="font-semibold font-sans text-sm sm:text-base md:text-lg overflow-ellipsis line-clamp-2 truncate">
                                  {recommendation.title}
                                </p>
                              </div>
                            </Fragment>
                          );
                        })}
                    </section>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
