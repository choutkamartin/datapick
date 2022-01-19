import { ArrowCircleLeftIcon } from "@heroicons/react/outline";
import Link from "next/link";
import Filter from "components/label/SliderBrightness";

export default function LabelSidebarLeft({ brightness, setBrightness }) {
  return (
    <div className="sidebar-left row-span-9 bg-white p-4 border-r flex flex-col gap-y-4 items-center">
      <Link href="/projects/dashboard">
        <a className="p-2 bg-indigo-700 rounded hover:bg-indigo-600">
          <ArrowCircleLeftIcon className="h-6 w-6 text-white" />
        </a>
      </Link>
      <Filter setValue={setBrightness} value={brightness}/>
    </div>
  );
}
