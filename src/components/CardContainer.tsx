import { FunctionComponent } from "react";

interface CardContainerProps {
  label: string;
  duration: number;
}
export const CardContainer: FunctionComponent<CardContainerProps> = ({
  label,
  duration,
}: CardContainerProps) => {
  return (
    <div className="hover:bg-neutral-100 relative grid-cols-2 text-gray-700 shadow-md rounded-md w-64 h-32">
      <div className="grid grid-row-3">
        <span className="p-4 text-wrap text-xs font-bold text-gray-400">
          {label}:
        </span>
        <div className="flex flex-row p-2 gap-2">
          <span className="text-wrap text-xs font-bold">Time to load:</span>
          <span className=" text-wrap text-xs font-bold text-green-300">
            {duration.toFixed(3)} ms
          </span>
        </div>
      </div>
    </div>
  );
};
