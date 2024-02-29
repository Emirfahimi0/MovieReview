/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, FunctionComponent } from "react";
import {
  BsChevronCompactLeft,
  BsChevronCompactRight,
  BsDot,
} from "react-icons/bs";
import { Link } from "react-router-dom";

export interface TopSectionProps {
  handleViewDetails: () => void;
  handlePrevSlide: () => void;
  handleNextSlide: () => void;
  handleCurrentSlide: (value: number) => void;
  value: any;
  currentIndex: number;
}

export const TopSection: FunctionComponent<TopSectionProps> = ({
  handleViewDetails,
  handlePrevSlide,
  handleNextSlide,
  value,
  handleCurrentSlide,
  currentIndex,
}: TopSectionProps) => {
  return (
    <Fragment>
      <div className="max-w-[1400px] h-[780px] w-full m-auto py-16 relative group">
        <div
          style={{
            backgroundImage: `url(${process.env.PUBLIC_API_IMAGE_PATH_ORIGINAL}/${value[currentIndex].backdrop_path})`,
          }}
          className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
        ></div>
        <div className="absolute top-0 right-0 bottom-0 left-0 my-16 rounded-2xl h-auto w-auto overflow-hidden bg-[hsla(0,0%,0%,0.75)]">
          <div className="flex items-center justify-center  h-full ">
            <div className="px-6 text-center text-white md:px-12">
              <h1 className="mt-6 mb-16 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl">
                {value[currentIndex].title}
              </h1>
              <Link
                className="mb-2 inline-block rounded-full border-2 border-neutral-50 px-[46px] pt-[14px] pb-[12px] text-sm font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 md:mr-2 md:mb-0"
                data-te-ripple-init
                data-te-ripple-color="light"
                role="button"
                onClick={handleViewDetails}
                to={"/MovieReview/Details"}
              >
                More Details
              </Link>
              <div
                className="inline-block rounded-full px-12 pt-4 pb-3.5 text-sm font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:bg-neutral-500 hover:bg-opacity-20 hover:text-neutral-200 focus:text-neutral-200 focus:outline-none focus:ring-0 active:text-neutral-300"
                data-te-ripple-init
                data-te-ripple-color="light"
                role="button"
              >
                Watch Trailer
              </div>
            </div>
          </div>
        </div>
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactLeft size={30} onClick={handlePrevSlide} />
        </div>
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactRight size={30} onClick={handleNextSlide} />
        </div>
        <div className="flex top-4 justify-center py-2 max-w-auto truncate">
          {value.map((_slide: any, index: number) => {
            return (
              <div key={index} className="text-2xl cursor-pointer">
                <BsDot onClick={() => handleCurrentSlide(index)} />
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};
