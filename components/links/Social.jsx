import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Social({ to, icon }) {
  return (
    <a
      href={to}
      className="w-8 h-8 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 rounded text-white cursor-pointer"
    >
      <FontAwesomeIcon icon={icon} />
    </a>
  );
}
