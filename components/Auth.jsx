import { useSession } from "next-auth/react";
import SpinnerLoad from "components/SpinnerLoad";
import NotAuthorized from "components/NotAuthorized";
import PublicLayout from "./layout/public/PublicLayout";

export default function Auth({ children }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <PublicLayout>
        <SpinnerLoad />
      </PublicLayout>
    );
  }

  if (status === "unauthenticated") {
    return (
      <PublicLayout>
        <NotAuthorized />
      </PublicLayout>
    );
  }

  return children;
}
