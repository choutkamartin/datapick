import { ExclamationCircleIcon } from "@heroicons/react/outline";
import Paragraph from "components/Paragraph";
import { joinClassNames } from "utils/helpers";

export default function AlertError({ title, className }) {
  return (
    <div
      className={joinClassNames(
        "relative px-4 py-3 leading-normal text-red-700 bg-red-100 rounded",
        className
      )}
    >
      <span className="absolute inset-y-0 left-0 flex items-center ml-4">
        <ExclamationCircleIcon className="h-4 w-4" />
      </span>
      <Paragraph className="ml-6">{title}</Paragraph>
    </div>
  );
}
