import { useState } from "react";
import {
  EyeIcon,
  EyeOffIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/outline";
import Label from "components/inputs/Label";
import { joinClassNames } from "utils/helpers";

export default function Input({
  label,
  register,
  required,
  id,
  errors,
  type,
  readOnly,
  ...props
}) {
  const [mutableType, setMutableType] = useState(type);

  function setPasswordVisibility() {
    if (mutableType === "password") {
      setMutableType("text");
    } else {
      setMutableType("password");
    }
  }

  const ShowPasswordIcon = ({ ...props }) => {
    if (type === "password") {
      if (mutableType === "password") {
        return (
          <EyeIcon
            className="w-4 h-4 text-gray-400 cursor-pointer"
            {...props}
          />
        );
      } else {
        return (
          <EyeOffIcon
            className="w-4 h-4 text-gray-400 cursor-pointer"
            {...props}
          />
        );
      }
    }
    return null;
  };

  return (
    <div className="flex flex-col gap-y-1 w-full">
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <div className="relative">
        <input
          className={joinClassNames(
            errors
              ? "ring-1 ring-red-700 focus:ring-red-700"
              : "focus:ring-indigo-600",
            readOnly && "bg-slate-50",
            "min-w-full border-gray-300 focus:border-gray-300 focus:ring-2 rounded shadow-sm read-only:cursor-not-allowed read-only:text-gray-500"
          )}
          id={id}
          type={mutableType}
          readOnly={readOnly}
          {...register(id, { required })}
          {...props}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 gap-x-2">
          <ShowPasswordIcon onClick={() => setPasswordVisibility()} />
          {errors && <ExclamationCircleIcon className="w-4 h-4 text-red-700" />}
        </div>
      </div>
      <p className="text-red-700 text-sm font-medium">
        {errors?.type === "required" && `${label} is required`}
      </p>
    </div>
  );
}
