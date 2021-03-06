import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import Anchor from "components/Anchor";
import Logo from "components/LogoBrand";
import MenuMobile from "components/MenuMobile";
import MenuAccount from "components/MenuAccount";
import { joinClassNames } from "utils/helpers";
import path from "utils/path";
import { faRobot, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const additionalLinks = [
  {
    name: "Help",
    description: "Struggling with something?",
    href: path.help.general,
  },
  {
    name: "API",
    description: "Take a look at our API and documentation!",
    href: path.help.api,
  },
];

const solutions = [
  {
    name: "Platform",
    description: "Our platform",
    icon: faRobot,
    children: [
      {
        name: "Image annotation",
        description: "Image annotations",
        href: path.platform.imageAnnotation,
      },
      {
        name: "Text annotation",
        description: "Coming soon",
        href: path.platform.textAnnotation,
      },
      {
        name: "Audio annotation",
        description: "Coming soon",
        href: path.platform.audioAnnotation,
      },
      {
        name: "Video annotation",
        description: "Coming soon",
        href: path.platform.videoAnnotation,
      },
    ],
  },
  {
    name: "Company",
    description: "Our solutions for machine learning",
    icon: faUsers,
    children: [
      {
        name: "About Us",
        description: "Our company",
        href: path.company.aboutUs,
      },
    ],
  },
];

const resources = [
  {
    name: "Test",
    description: "Test",
    icon: faUsers,
  },
];

export default function PublicHeader() {
  const { data: session, status } = useSession();
  return (
    <Popover className="relative bg-white shadow">
      <div className="px-4 md:px-8 lg:px-20 xl:px-40 2xl:px-80">
        <div className="flex justify-between items-center py-6 lg:justify-start md:space-x-10">
          <div className="flex justify-start">
            <Logo />
          </div>
          <MenuMobile solutions={solutions} additionalLinks={additionalLinks} />
          <Popover.Group as="nav" className="hidden lg:flex space-x-10">
            {solutions.map((item) =>
              item.children != undefined ? (
                <Popover key={item.name} className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={joinClassNames(
                          open ? "text-gray-900" : "text-gray-600",
                          "group rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
                                  <FontAwesomeIcon
                                    icon={item.icon}
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
                <Anchor
                  key={item.name}
                  to="/"
                  type="link"
                  className="font-semibold"
                >
                  {item.name}
                </Anchor>
              )
            )}
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={joinClassNames(
                      open ? "text-gray-900" : "text-gray-500",
                      "group rounded-md inline-flex items-center text-base font-semibold hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    )}
                  >
                    <span>More</span>
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
                    <Popover.Panel className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-md sm:px-0">
                      <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                          {resources.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50 cursor-pointer"
                            >
                              <FontAwesomeIcon
                                icon={item.icon}
                                className="h-6 w-6 text-indigo-600"
                                aria-hidden="true"
                              />
                              <div className="ml-4">
                                <p className="text-base font-medium text-gray-900">
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
            {status === "authenticated" ? (
              <MenuAccount />
            ) : (
              <>
                <Anchor
                  className="font-semibold"
                  to={path.auth.signIn}
                  type="link"
                >
                  Sign In
                </Anchor>
                <Anchor to={path.auth.signUp} type="button" variant="primary">
                  Sign Up
                </Anchor>
              </>
            )}
          </div>
        </div>
      </div>
    </Popover>
  );
}
