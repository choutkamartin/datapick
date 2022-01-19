export default function Label({ children, htmlFor, required }) {
  return (
    <label className="font-semibold" htmlFor={htmlFor}>
      {children}
      {required && <span className="ml-1">*</span>}
    </label>
  );
}
