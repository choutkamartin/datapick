import PublicHeader from "components/layout/public/PublicHeader";
import PublicFooter from "components/layout/public/PublicFooter";
import ButtonScroll from "components/buttons/ButtonScroll";

export default function PublicLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen justify-between bg-slate-100">
      <PublicHeader />
      {children}
      <PublicFooter />
      <ButtonScroll />
    </div>
  );
}
