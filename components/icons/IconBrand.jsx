import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function IconBrand({ icon }) {
  return (
    <div className="w-12 h-12 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 rounded-full text-white cursor-pointer">
      <FontAwesomeIcon icon={icon} size="lg" />
    </div>
  );
}
