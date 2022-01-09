import VerticalLine from "components/VerticalLine";
import Anchor from "components/links/Anchor";
import Title from "components/Title";
import SocialIcons from "components/links/SocialIcons";
import Logo from "components/logos/Logo";
import path from "utils/path";

const footer = [
  {
    title: "Platform",
    children: [
      {
        title: "Image Annotation",
        href: path.platform.imageAnnotation,
        type: "link",
      },
      {
        title: "Text Annotation",
        href: path.platform.textAnnotation,
        type: "link",
      },
      {
        title: "Audio Annotation",
        href: path.platform.audioAnnotation,
        type: "link",
      },
      {
        title: "Video Annotation",
        href: path.platform.videoAnnotation,
        type: "link",
      },
    ],
  },
  {
    title: "Company",
    children: [
      {
        title: "About Us",
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
      {
        title: "Company",
        href: path.company.company,
        type: "link",
      },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t py-12 px-4 md:px-8 lg:px-20 xl:px-40 2xl:px-14">
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-x-64 gap-y-8">
        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-y-8">
          <Logo />
          <section className="hidden lg:block">
            <Title headingLevel="h3" className="mb-2">
              Latest Blog Post
            </Title>
            <article>
              <Title headingLevel="h4" className="">
                Ready to get started?
              </Title>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repudiandae accusamus porro ducimus totam nemo fugiat incidunt
                iste sit ipsam ullam aspernatur necessitatibus.
              </p>
            </article>
          </section>
        </div>
        <VerticalLine className="hidden lg:block" />
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-8">
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
            <div className="flex gap-x-4">
              <Anchor to={path.privacyPolicy} type="link">
                Privacy policy
              </Anchor>
              <Anchor to={path.termsOfService} type="link">
                Terms of Service
              </Anchor>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
