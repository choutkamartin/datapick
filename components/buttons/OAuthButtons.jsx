import { signIn } from "next-auth/react";
import {
  faFacebook,
  faGithub,
  faGoogle,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import OAuthButton from "components/buttons/OAuthButton";

const oAuthProviders = [
  {
    title: "Facebook",
    icon: faFacebook,
    provider: "facebook",
    classes: "text-white bg-blue-600 hover:bg-blue-700",
  },
  {
    title: "Google",
    icon: faGoogle,
    provider: "google",
    classes: "text-gray-900 bg-gray-300 hover:bg-gray-200",
  },
  {
    title: "Twitter",
    icon: faTwitter,
    provider: "twitter",
    classes: "text-white bg-blue-500 hover:bg-blue-600",
  },
  {
    title: "GitHub",
    icon: faGithub,
    provider: "github",
    classes: "text-white bg-gray-900 hover:bg-gray-800",
  },
];

export default function OAuthButtons() {
  return oAuthProviders.map((item) => {
    return (
      <OAuthButton
        key={item.provider}
        className={item.classes}
        title={item.title}
        icon={item.icon}
        onClick={() =>
          signIn(item.provider, {
            callbackUrl: "http://localhost:3000/user/profile",
          })
        }
      />
    );
  });
}
