import { Fragment, FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface MovieCardProps {
  handleSetCurrentMovie: () => void;
  imgPath: string;
  label: string;
  routePath: string;
}

export const MovieCard: FunctionComponent<MovieCardProps> = ({
  handleSetCurrentMovie,
  imgPath,
  label,
  routePath,
}: MovieCardProps) => {
  return (
    <Fragment>
      <Link to={routePath} onClick={handleSetCurrentMovie}>
        <img
          src={imgPath}
          className="w-full h-80 object-fit rounded-tl-lg rounded-tr-lg"
        />
      </Link>
      <h3 className="font-sans font-bold p-4 text-wrap truncate text-center">
        {label}
      </h3>
    </Fragment>
  );
};
