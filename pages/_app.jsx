import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import PrivateLayout from "components/layout/private/PrivateLayout";
import PublicLayout from "components/layout/public/PublicLayout";
import LabelLayout from "components/layout/label/LabelLayout";

const layouts = {
  Public: PublicLayout,
  Private: PrivateLayout,
  Label: LabelLayout,
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const Layout = layouts[Component.layout] || ((children) => <>{children}</>);
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
