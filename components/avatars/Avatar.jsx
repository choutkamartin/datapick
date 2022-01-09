import Image from "next/image";
import { joinClassNames } from "utils/helpers";

export default function Avatar({ src, className, alt }) {
  return (
    <div
      className={joinClassNames(
        "relative inline-block rounded-full shadow overflow-hidden ring-offset-2 ring-1 lg:ring-2",
        className
      )}
    >
      <Image src={src} alt={alt} layout="fill" />
    </div>
  );
}
