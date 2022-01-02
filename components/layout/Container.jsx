import { joinClassNames } from "utils/helpers";

export default function Container({ children, variant, className }) {
  return (
    <section
      className={joinClassNames(
        variant == "box" && "flex px-4 md:px-8 lg:px-20 xl:px-40 2xl:px-80",
        className
      )}
    >
      {children}
    </section>
  );
}
