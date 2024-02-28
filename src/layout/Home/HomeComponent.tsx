import { Fragment, FunctionComponent, useState } from "react";
import { IMovieResults } from "../../types/movie";
import { Loading } from "../../components/Loader";
import { Link } from "react-router-dom";
import {
  BsChevronCompactLeft,
  BsChevronCompactRight,
  BsDot,
} from "react-icons/bs";

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

  return (
    <Fragment>
      {loading === true ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <Loading />
        </div>
      ) : (
        <Fragment>
          {popularMovie !== undefined && popularMovie.length > 0 ? (
            <div className="max-w-[1400px] h-[780px] w-full m-auto py-16 relative group">
              <div
                style={{
                  backgroundImage: `url(${process.env.PUBLIC_API_IMAGE_PATH_ORIGINAL}/${popularMovie[currentIndex].backdrop_path})`,
                }}
                className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
              ></div>
              <div className="absolute top-0 right-0 bottom-0 left-0 my-16 rounded-2xl h-auto w-auto overflow-hidden bg-[hsla(0,0%,0%,0.75)]">
                <div className="flex items-center justify-center  h-full ">
                  <div className="px-6 text-center text-white md:px-12">
                    <h1 className="mt-6 mb-16 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl">
                      {popularMovie[currentIndex].title}
                    </h1>
                    <Link
                      className="mb-2 inline-block rounded-full border-2 border-neutral-50 px-[46px] pt-[14px] pb-[12px] text-sm font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 md:mr-2 md:mb-0"
                      data-te-ripple-init
                      data-te-ripple-color="light"
                      role="button"
                      onClick={handleCurrentMovie}
                      to={"/MovieReview/Details"}
                    >
                      More Details
                    </Link>
                    <Link
                      className="inline-block rounded-full px-12 pt-4 pb-3.5 text-sm font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:bg-neutral-500 hover:bg-opacity-20 hover:text-neutral-200 focus:text-neutral-200 focus:outline-none focus:ring-0 active:text-neutral-300"
                      data-te-ripple-init
                      data-te-ripple-color="light"
                      to={"/MovieReview/Metrics"}
                      role="button"
                    >
                      Watch Metrics Performance
                    </Link>
                  </div>
                </div>
              </div>
              <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                <BsChevronCompactLeft size={30} onClick={handlePrevSlide} />
              </div>
              <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                <BsChevronCompactRight size={30} onClick={handleNextSlide} />
              </div>
              <div className="flex top-4 justify-center py-2 max-w-auto">
                {popularMovie.map((_slide, index) => {
                  const handleCurrentSlide = () => {
                    setCurrentIndex(index);
                  };
                  return (
                    <div key={index} className="text-2xl cursor-pointer ">
                      <BsDot onClick={handleCurrentSlide} />
                    </div>
                  );
                })}
              </div>
            </div>
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
