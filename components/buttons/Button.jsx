import { joinClassNames } from "utils/helpers";

export default function Button({ children, className, ...props }) {
  return (
    <button
      className={joinClassNames(
        "uppercase whitespace-nowrap flex items-center justify-center px-4 py-2 border border-transparent rounded shadow-sm text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
