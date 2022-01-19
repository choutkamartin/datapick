import Image from "next/image";
import Anchor from "components/Anchor";

export default function LogoBrand() {
  return (
    <Anchor to="/" type="link">
      <span className="sr-only">Datapick</span>
      <Image src="/logo.svg" width={32} height={40} alt="Datapick logo" />
    </Anchor>
  );
}
