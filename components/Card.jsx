import { joinClassNames } from "utils/helpers";

function Card({ children, className }) {
  return (
    <div
      className={joinClassNames(
        "w-full rounded overflow-hidden shadow-md",
        className
      )}
    >
      {children}
    </div>
  );
}

function Head({ children, className }) {
  return (
    <div
      className={joinClassNames(
        "px-4 lg:px-16 py-8 flex border-b bg-indigo-600",
        className
      )}
    >
      {children}
    </div>
  );
}

function Body({ children }) {
  return <div className="bg-white px-4 py-8 lg:p-16 relative">{children}</div>;
}

function Footer({ children }) {
  return <div className="px-4 lg:px-16 py-6 bg-gray-100">{children}</div>;
}

Card.Head = Head;
Card.Body = Body;
Card.Footer = Footer;
export default Card;
