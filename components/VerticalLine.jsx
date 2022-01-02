import { joinClassNames } from "utils/helpers";

export default function VerticalLine({ className }) {
  return (
    <div
      className={joinClassNames(
        "hidden lg:block absolute border-l border-gray-400 h-full left-2/4",
        className
      )}
    />
  );
}
