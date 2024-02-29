import { Fragment, FunctionComponent } from "react";
import { IMovieDetails } from "../../types/movie";

interface DetailsContainerProps extends IMovieDetails {}

export const DetailsContainer: FunctionComponent<DetailsContainerProps> = ({
  original_language,
  original_title,
  genres,
  overview,
  release_date,
  poster_path,
}: DetailsContainerProps) => {
  return (
    <Fragment>
      <div className="flex justify-center items-center flex-col gap-4 md:flex-row text-pretty">
        <div className="w-64 max-h-max">
          <img
            src={`${process.env.PUBLIC_API_IMAGE_PATH_ORIGINAL}/${poster_path}`}
            className="rounded-lg object-cover h-auto"
          />
        </div>
        <div className="flex-1 max-w-96">
          <h2 className="text-white font-bold font-sans text-justify text-4xl">
            {original_title}
          </h2>
          <span className="uppercase text-white font-bold">
            {original_language}
          </span>
          <div className="flex flex-row gap-4 mt-4 flex-wrap">
            {genres.map((item, index) => {
              return (
                <div
                  key={index}
                  className="px-4 py-1 rounded-full border-2 border-gray-500"
                >
                  <span className="text-white font-md text-center">
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="w-auto mt-4 text-ellipsis overflow-hidden">
            <p className="text-white text-wrap">{overview}</p>
            <p className="w-auto mt-4 text-white">Release on: {release_date}</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
