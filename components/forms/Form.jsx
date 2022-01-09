import { joinClassNames } from "utils/helpers";

function Form({ children, className, ...props }) {
  // const required = children.map((item) => {
  //   if (item.type.name === "Input") {
  //     Object.keys(item.props).map(function (key) {
  //       if (key === "required") return true;
  //     });
  //   }
  // });

  const required = true;

  return (
    <form
      className={joinClassNames("flex flex-col gap-y-4", className)}
      {...props}
    >
      {children}
      {required && (
        <span className="font-medium text-sm mt-2">* Required fields</span>
      )}
    </form>
  );
}

function Body({ children }) {
  return <div className="flex flex-col gap-y-4">{children}</div>;
}

Form.Body = Body;
export default Form;
