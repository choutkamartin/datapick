import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { joinClassNames } from "utils/helpers";

export default function OAuthButton({ title, icon, className, ...props }) {
  return (
    <button
      type="button"
      className={joinClassNames(
        "whitespace-nowrap w-full inline-flex items-center justify-center gap-x-4 px-4 py-2 border border-transparent rounded-sm shadow-sm text-base font-medium",
        className
      )}
      {...props}
    >
      <FontAwesomeIcon icon={icon} />
      Continue with {title}
    </button>
  );
}
