import { forwardRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { joinClassNames } from "utils/helpers";

export default forwardRef(function Anchor(
  { children, to, type, variant, className },
  ref
) {
  const router = useRouter();
  const getClassNames = () => {
    var styles;
    if (type === "link") {
      if (to === router.pathname) {
        styles = "underline";
      } else {
        styles = "text-gray-600";
      }
      return joinClassNames("hover:text-black font-medium", styles);
    } else {
      if (variant === "primary") {
        return "uppercase whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded shadow-sm text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700";
      } else {
        return "uppercase whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded shadow-sm text-base font-semibold text-gray-700 bg-gray-300 hover:bg-gray-400";
      }
    }
  };

  return (
    <Link href={to} ref={ref}>
      <a className={joinClassNames(getClassNames(), className)}>{children}</a>
    </Link>
  );
});
