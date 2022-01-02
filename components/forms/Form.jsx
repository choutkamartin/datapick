export default function Form({ children, ...props }) {
  const required = children.map((item) => {
    if (item.type.name === "Input") {
      Object.keys(item.props).map(function (key) {
        if (key === "required") return true;
      });
    }
  });

  return (
    <form className="flex flex-col gap-y-4" {...props}>
      {children}
      {required && (
        <span className="font-semibold text-sm">* Required fields</span>
      )}
    </form>
  );
}
