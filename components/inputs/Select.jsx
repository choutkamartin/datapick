import { ExclamationCircleIcon } from "@heroicons/react/outline";
import { joinClassNames } from "utils/helpers";

export default function Select({
  children,
  label,
  register,
  required,
  id,
  errors,
  readOnly,
  ...props
}) {
  return (
    <div className="flex flex-col gap-y-1">
      <label className="font-semibold" htmlFor={id}>
        {label}
        {required && <span className="ml-1">*</span>}
      </label>
      <div className="relative">
        <select
          className={joinClassNames(
            errors
              ? "ring-1 ring-red-700 focus:ring-red-700"
              : "focus:ring-indigo-600",
            readOnly && "bg-slate-50",
            "min-w-full border-gray-300 focus:border-gray-300 focus:ring-2 rounded shadow-sm read-only:cursor-not-allowed read-only:text-gray-500"
          )}
          id={id}
          readOnly={readOnly}
          {...register(id, { required })}
          {...props}
        >
          {children}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 gap-x-2">
          {errors && <ExclamationCircleIcon className="w-4 h-4 text-red-700" />}
        </div>
      </div>
      <p className="text-red-700 text-sm font-medium">
        {errors?.type === "required" && `${label} is required`}
      </p>
    </div>
  );
}
