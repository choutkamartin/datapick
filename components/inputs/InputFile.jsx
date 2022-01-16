export default function InputFile({ ...props }) {
  return (
    <input
      type="file"
      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-violet-100 file:cursor-pointer focus-visible:outline-0 focus:outline-0"
      {...props}
    />
  );
}
