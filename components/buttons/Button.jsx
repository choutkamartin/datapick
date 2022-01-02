export default function Button({ children, ...props }) {
  return (
    <button
      className="uppercase whitespace-nowrap flex items-center justify-center px-4 py-2 border border-transparent rounded shadow-sm text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700"
      {...props}
    >
      {children}
    </button>
  );
}
