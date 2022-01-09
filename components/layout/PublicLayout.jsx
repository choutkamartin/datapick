import Header from "components/layout/Header";
import Footer from "components/layout/Footer";
import ScrollButton from "components/ScrollButton";

export default function PublicLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen justify-between bg-slate-100">
      <Header />
      {children}
      <Footer />
      <ScrollButton />
    </div>
  );
}
