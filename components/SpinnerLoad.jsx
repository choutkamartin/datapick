import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function SpinnerLoad() {
  return (
    <FontAwesomeIcon
      icon={faSpinner}
      className="block animate-spin text-indigo-600"
      size="3x"
    />
  );
}
