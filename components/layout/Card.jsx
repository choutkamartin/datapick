import { joinClassNames } from "utils/helpers";

export default function Card({ children, className }) {
  return (
    <div
      className={joinClassNames("w-full lg:w-auto p-4 lg:p-16 rounded", className)}
    >
      {children}
    </div>
  );
}
