import { useState } from "react";
import { SunIcon } from "@heroicons/react/outline";

export default function SliderBrightness({ value, setValue }) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <button
        className="p-2 bg-indigo-600 rounded hover:bg-indigo-700"
        onClick={() => setVisible(!visible)}
      >
        <SunIcon className="h-6 w-6 text-white" />
      </button>
      {visible && (
        <div className="absolute mt-4 p-2 bg-white flex items-center py-5 rounded-sm shadow z-10">
          <input
            type="range"
            min="0"
            max="200"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="appearance-none border-t h-0 bg-transparent"
          />
        </div>
      )}
    </div>
  );
}
