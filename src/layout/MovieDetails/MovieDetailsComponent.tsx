import { Fragment, FunctionComponent } from "react";
import { Loading } from "../../components/Loader";
import { DetailsContainer } from "./DetailsContainer";
import { IMovieDetails } from "../../types/movie";

interface MovieDetailsComponentProps {
  loading: boolean;
  details: IMovieDetails;
}

export const MovieDetailsComponent: FunctionComponent<
  MovieDetailsComponentProps
> = ({ loading, details }: MovieDetailsComponentProps) => {
  return (
    <Fragment>
      {loading === true ? (
        <div className="flex items-center justify-center bg-gray-100 min-h-screen">
          <Loading />
        </div>
      ) : (
        <Fragment>
          <div className="flex min-h-screen sm:max-h-screen">
            <div className="relative overflow-hidden sm:overflow-y-auto">
              <img
                src={`${process.env.PUBLIC_API_IMAGE_PATH_ORIGINAL}/${details?.backdrop_path}`}
                className="object-cover w-full h-full"
                loading={"lazy"}
                alt="Backdrop"
              />
              <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full bg-fixed bg-[hsla(0,0%,0%,0.5)]">
                <div className="flex justify-center items-center h-full p-24 overflow-y-auto overflow-x-hidden">
                  {details === undefined ? null : (
                    <DetailsContainer {...details} />
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
