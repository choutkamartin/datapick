import Title from "components/Heading";
import Anchor from "components/Anchor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PrivateSidebar({ title, data }) {
  return (
    <div className="bg-white px-4 py-8 lg:p-12 lg:w-1/6 pr-16 border-r border-b-2 lg:border-b-0 grow-0 shrink-0">
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
              <span className="w-10 h-10 bg-indigo-600 flex items-center justify-center rounded-sm">
                <FontAwesomeIcon icon={item.icon} className="text-white" />
              </span>
              {item.name}
            </Anchor>
          );
        })}
      </nav>
    </div>
  );
}
