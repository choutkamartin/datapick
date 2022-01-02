import {
  faFacebookF,
  faGithubAlt,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Social from "components/links/Social";
import path from "utils/path";

const socialIcons = [
  {
    name: "Facebook",
    href: path.social.facebook,
    icon: faFacebookF,
  },
  {
    name: "Twitter",
    href: path.social.twitter,
    icon: faTwitter,
  },
  {
    name: "GitHub",
    href: path.social.github,
    icon: faGithubAlt,
  },
];

export default function SocialIcons() {
  return socialIcons.map((item) => {
    return <Social key={item.name} to={item.href} icon={item.icon} />;
  });
}
