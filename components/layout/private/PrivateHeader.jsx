import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  PresentationChartBarIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";
import Anchor from "components/Anchor";
import Logo from "components/LogoBrand";
import MobileMenu from "components/MenuMobile";
import AccountMenu from "components/MenuAccount";
import { joinClassNames } from "utils/helpers";
import path from "utils/path";

const additionalLinks = [
  {
    name: "Help",
    description: "Struggling with something?",
    href: path.help,
  },
  {
    name: "API",
    description: "Take a look at our API and documentation!",
    href: path.api,
  },
];

const solutions = [
  {
    name: "Projects",
    href: path.projects.dashboard,
    icon: PresentationChartBarIcon,
  },
  {
    name: "User",
    href: path.user.profile,
    icon: UserCircleIcon,
  },
];

export default function PrivateHeader() {
  return (
    <Popover className="relative bg-white border-b">
      <div className="px-4 md:px-8 lg:px-14">
        <div className="flex justify-between items-center py-6 lg:justify-start md:space-x-10">
          <div className="flex justify-start">
            <Logo />
          </div>
          <MobileMenu solutions={solutions} additionalLinks={additionalLinks} />
          <Popover.Group as="nav" className="hidden lg:flex space-x-10">
            {solutions.map((item) =>
              item.children != undefined ? (
                <Popover key={item.name} className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={joinClassNames(
                          open ? "text-gray-900" : "text-gray-600",
                          "group rounded-md inline-flex items-center text-base font-semibold hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        )}
                      >
                        <span>{item.name}</span>
                        <ChevronDownIcon
                          className={joinClassNames(
                            open ? "text-gray-600" : "text-gray-400",
                            "ml-2 h-5 w-5 group-hover:text-gray-500"
                          )}
                          aria-hidden="true"
                        />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                            <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                              {item.children.map((item) => (
                                <a
                                  key={item.name}
                                  href={item.href}
                                  className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                                >
                                  <item.icon
                                    className="flex-shrink-0 h-6 w-6 text-indigo-600"
                                    aria-hidden="true"
                                  />
                                  <div className="ml-4">
                                    <p className="text-base font-bold text-gray-900">
                                      {item.name}
                                    </p>
                                    <p className="mt-1 text-sm text-gray-500">
                                      {item.description}
                                    </p>
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              ) : (
                <Anchor key={item.name} to={item.href} type="link">
                  {item.name}
                </Anchor>
              )
            )}
          </Popover.Group>
          <div className="hidden lg:flex items-center justify-end md:flex-1 lg:w-0 gap-8">
            {additionalLinks.map((item) => {
              return (
                <Anchor
                  key={item.name}
                  className="font-semibold"
                  to={item.href}
                  type="link"
                >
                  {item.name}
                </Anchor>
              );
            })}
            <AccountMenu />
          </div>
        </div>
      </div>
    </Popover>
  );
}
