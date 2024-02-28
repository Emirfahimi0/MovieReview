import { Fragment, FunctionComponent, useState } from "react";
import { IMovieResults } from "../../types/movie";
import { Loading } from "../../components/Loader";
import { Link } from "react-router-dom";
import { TopSection, TopSectionProps } from "../../components/TopSection";

interface HomeComponentProps {
  addCurrentMovie: (value: IMovieResults) => void;
  categorizedMovies: Record<string, IMovieResults[]>;
  loading: boolean;
  popularMovie: IMovieResults[];
}

export const HomeComponent: FunctionComponent<HomeComponentProps> = ({
  categorizedMovies,
  loading,
  addCurrentMovie,
  popularMovie,
}: HomeComponentProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handlePrevSlide = () => {
    const isFirstIndex = currentIndex === 0;
    const newIndex = isFirstIndex ? popularMovie.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const handleNextSlide = () => {
    const isLastIndex = currentIndex === popularMovie.length - 1;
    const newIndex = isLastIndex ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const handleCurrentMovie = () => {
    addCurrentMovie(popularMovie[currentIndex]);
  };

  const handleCurrentSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const topSectionProps: TopSectionProps = {
    currentIndex,
    handleCurrentSlide,
    handleNextSlide,
    handlePrevSlide,
    handleViewDetails: handleCurrentMovie,
    value: popularMovie,
  };

  return (
    <Fragment>
      {loading === true ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <Loading />
        </div>
      ) : (
        <Fragment>
          {popularMovie !== undefined && popularMovie.length > 0 ? (
            <TopSection {...topSectionProps} />
          ) : null}

          <section className="mx-auto justify-center">
            <div className="flex-1">
              {Object.entries(categorizedMovies).map(([genre, movies]) => (
                <div className="m-6 bg-gray-800 rounded-md p-4" key={genre}>
                  <h2 className="text-2xl font-semibold py-4 text-white">
                    {genre}
                  </h2>
                  <div>
                    <div className="flex flex-row gap-4 overflow-x-auto">
                      {movies.map((movie, index) => {
                        const handleSetCurrentMovie = () => {
                          addCurrentMovie(movie);
                        };

                        return (
                          <Fragment key={index}>
                            <div className="flex-none">
                              <Link
                                to={"/MovieReview/Details"}
                                onClick={handleSetCurrentMovie}
                              >
                                <img
                                  src={`${process.env.PUBLIC_API_IMAGE_PATH}/${movie.poster_path}`}
                                  className="w-full h-80 object-fit rounded-lg"
                                  alt={movie.title}
                                />
                              </Link>
                              <h3 className="text-white font-bold p-4 text-wrap truncate">
                                {movie.title}
                              </h3>
                            </div>
                          </Fragment>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};
