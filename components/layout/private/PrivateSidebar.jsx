import Title from "components/Heading";
import Anchor from "components/Anchor";

export default function PrivateSidebar({ title, data }) {
  return (
    <div className="bg-white px-4 py-8 lg:p-12 w-full lg:w-2/12 border-r border-b-2 lg:border-b-0">
      <Title headingLevel="h3" className="mb-8">
        {title}
      </Title>
      <nav className="flex flex-col gap-y-6">
        {data.map((item) => {
          return (
            <Anchor
              to={item.href}
              type="link"
              className="flex items-center gap-x-4"
              key={item.name}
            >
              {item.name}
            </Anchor>
          );
        })}
      </nav>
    </div>
  );
}
