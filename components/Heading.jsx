import { createElement } from "react";
import { joinClassNames } from "utils/helpers";

export default function Heading({ children, headingLevel, className }) {
  const validHeadingLevels = ["h1", "h2", "h3", "h4", "h5", "h6"];
  const safeHeading = headingLevel ? headingLevel.toLowerCase() : "";
  const level = validHeadingLevels.includes(safeHeading) ? safeHeading : "p";
  let classes;
  switch (level) {
    case "h1":
      classes = "font-bold text-4xl lg:text-5xl";
      break;
    case "h2":
      classes = "font-semibold text-2xl lg:text-3xl";
      break;
    case "h3":
      classes = "font-semibold text-xl lg:text-2xl";
      break;
    case "h4":
      classes = "font-bold text-lg";
      break;
    case "h5":
      classes = "font-bold";
      break;
    case "h6":
      classes = "font-semibold";
      break;

    default:
      break;
  }
  return createElement(
    level,
    { className: joinClassNames(classes, className) },
    children
  );
}
