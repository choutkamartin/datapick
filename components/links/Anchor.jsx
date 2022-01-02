import Link from "next/link";
import { forwardRef } from "react";
import { joinClassNames } from "utils/helpers";

export default forwardRef(function Anchor(
  { children, to, type, variant, className },
  ref
) {
  const getClassNames = () => {
    if (type === "link") {
      return "text-gray-600 hover:text-black font-medium";
    } else {
      if (variant === "primary") {
        return "uppercase whitespace-nowrap flex items-center justify-center px-4 py-2 border border-transparent rounded shadow-sm text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700";
      } else {
        return "uppercase whitespace-nowrap flex items-center justify-center px-4 py-2 border border-transparent rounded shadow-sm text-base font-semibold text-gray-700 bg-gray-300 hover:bg-gray-400";
      }
    }
  };

  return (
    <Link href={to} ref={ref}>
      <a className={joinClassNames(getClassNames(), className)}>{children}</a>
    </Link>
  );
});
