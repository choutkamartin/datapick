import { joinClassNames } from "utils/helpers";

export default function VerticalLine({ className }) {
  return (
    <div
      className={joinClassNames(
        "hidden lg:block absolute border-l border-gray-300 h-full left-2/4",
        className
      )}
    />
  );
}
