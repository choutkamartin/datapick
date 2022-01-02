import { joinClassNames } from "utils/helpers";

export default function Container({ children, variant, className }) {
  return (
    <section
      className={joinClassNames(
        variant == "box" && "flex px-2 lg:px-80",
        className
      )}
    >
      {children}
    </section>
  );
}
