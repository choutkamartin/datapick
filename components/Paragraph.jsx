import { joinClassNames } from "utils/helpers";

export default function Paragraph({ children, className }) {
  return <p className={joinClassNames(className)}>{children}</p>;
}
