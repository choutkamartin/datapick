import Image from "next/image";

export default function Avatar({ image }) {
  return (
    <div className="relative inline-block h-full w-8 h-8 rounded-full shadow overflow-hidden">
      <Image src={image} alt="Picture of the author" layout="fill" />
    </div>
  );
}
