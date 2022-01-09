import UserHeader from "components/layout/UserHeader";
import ScrollButton from "components/ScrollButton";
import UserFooter from "components/layout/UserFooter";

export default function PrivateLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen justify-between bg-slate-100">
      <UserHeader />
      {children}
      <UserFooter />
      <ScrollButton />
    </div>
  );
}
