import { joinClassNames } from "utils/helpers";

export default function BlockCode({ children, className }) {
  return (
    <div
      className={joinClassNames(
        "bg-gray-100 p-8 overflow-auto h-80 rounded-md border",
        className
      )}
    >
      <pre>{children}</pre>
    </div>
  );
}
