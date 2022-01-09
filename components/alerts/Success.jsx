import { CheckCircleIcon } from "@heroicons/react/outline";
import { joinClassNames } from "utils/helpers";

export default function Success({ title, className }) {
  return (
    <div
      className={joinClassNames(
        "relative px-4 py-3 leading-normal text-green-700 bg-green-100 rounded",
        className
      )}
    >
      <span className="absolute inset-y-0 left-0 flex items-center ml-4">
        <CheckCircleIcon className="h-4 w-4" />
      </span>
      <p className="ml-6">{title}</p>
    </div>
  );
}
