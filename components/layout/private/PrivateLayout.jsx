import PrivateHeader from "components/layout/private/PrivateHeader";
import PrivateFooter from "components/layout/private/PrivateFooter";
import ButtonScroll from "components/buttons/ButtonScroll";

export default function PrivateLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen justify-between bg-slate-100">
      <PrivateHeader />
      {children}
      <PrivateFooter />
      <ButtonScroll />
    </div>
  );
}
