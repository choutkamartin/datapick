import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import PrivateLayout from "components/layout/PrivateLayout";
import PublicLayout from "components/layout/PublicLayout";

const layouts = {
  Public: PublicLayout,
  Private: PrivateLayout,
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
