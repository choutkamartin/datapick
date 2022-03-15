import VerticalLine from "components/LineVertical";
import Anchor from "components/Anchor";
import Title from "components/Heading";
import SocialIcons from "components/icons/IconsSocial";
import Logo from "components/LogoBrand";
import Paragraph from "components/Paragraph";
import path from "utils/path";

const footer = [
  {
    title: "Platform",
    children: [
      {
        title: "Image annotation",
        href: path.platform.imageAnnotation,
        type: "link",
      },
      {
        title: "Text annotation",
        href: path.platform.textAnnotation,
        type: "link",
      },
      {
        title: "Audio annotation",
        href: path.platform.audioAnnotation,
        type: "link",
      },
      {
        title: "Video annotation",
        href: path.platform.videoAnnotation,
        type: "link",
      },
    ],
  },
  {
    title: "Useful links",
    children: [
      {
        title: "About",
        href: path.company.aboutUs,
        type: "link",
      },
      {
        title: "Resources",
        href: path.company.resources,
        type: "link",
      },
      {
        title: "Help",
        href: path.company.help,
        type: "link",
      },
    ],
  },
];

export default function PublicFooter() {
  return (
    <footer className="bg-white py-12 px-4 md:px-8 lg:px-20 xl:px-40 2xl:px-80">
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-x-64 gap-y-8">
        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-y-8">
          <Logo />
          <section>
            <Title headingLevel="h4" className="">
              Datapick
            </Title>
            <Paragraph>
              Datapick is a data labelling platform created as a bachelors
              project at{" "}
              <Anchor type="link" to="https://www.czu.cz/">
                CZU Prague
              </Anchor>
              . The data labelling platform supports data upload, taxonomy,
              project creation, image labelling and more.
            </Paragraph>
          </section>
        </div>
        <VerticalLine className="hidden lg:block" />
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-2">
            {footer.map((item) => {
              return (
                <div key={item.title}>
                  <Title headingLevel="h4">{item.title}</Title>
                  <ul>
                    {item.children.map((item) => {
                      return (
                        <li key={item.title}>
                          <Anchor to={item.href} type={item.type}>
                            {item.title}
                          </Anchor>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
          <div className="flex gap-x-4">
            <SocialIcons />
          </div>
          <div className="flex flex-wrap gap-x-12">
            <p>© {new Date().getFullYear()}</p>
            <Anchor to={path.privacyPolicy} type="link">
              Privacy policy
            </Anchor>
            <Anchor to={path.termsOfService} type="link">
              Terms of Service
            </Anchor>
          </div>
        </div>
      </div>
    </footer>
  );
}
