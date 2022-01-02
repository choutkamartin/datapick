import { signOut, useSession } from "next-auth/react";
import Avatar from "components/avatars/Avatar";

export default function Profile() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <div className="bg-primary-100 rounded-md p-20 shadow-md">
        <p>
          Signed in as{" "}
          {session.user.email ? session.user.email : session.user.name}
          {session.user.image && <Avatar image={session.user.image} />}
        </p>
        <button
          onClick={() =>
            signOut({ callbackUrl: "http://localhost:3000/auth/sign-in" })
          }
        >
          Sign out
        </button>
      </div>
    );
  }

  return <div></div>;
}
