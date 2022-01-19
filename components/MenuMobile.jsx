import { Fragment } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import { XIcon, MenuIcon } from "@heroicons/react/outline";
import Link from "next/link";
import Anchor from "components/Anchor";
import path from "utils/path";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MenuMobile({ solutions, additionalLinks }) {
  return (
    <>
      <Popover className="lg:hidden">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-90"}
                text-white group bg-indigo-600 p-2 rounded-md inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
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
              <Popover.Panel className="absolute z-10 top-0 p-2 inset-x-0 transition transform origin-top-right">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="flex justify-between items-center bg-white pt-4 px-4">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">
                        Menu
                      </span>
                    </div>
                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                  <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
                    {solutions.map((item) =>
                      item.children != undefined ? (
                        <Menu key={item.name}>
                          <Menu.Button className="flex items-center text-left p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-50">
                            <div className="flex bg-indigo-600 rounded p-2 items-center justify-center flex-shrink-0 w-10 h-10 text-white sm:h-12 sm:w-12">
                              <FontAwesomeIcon icon={item.icon} />
                            </div>
                            <div className="ml-4">
                              <p className="text-sm font-medium text-gray-900">
                                {item.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {item.description}
                              </p>
                            </div>
                          </Menu.Button>
                          <Transition
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                          >
                            <Menu.Items className="flex flex-col pl-14 gap-y-1">
                              {item.children.map((child) => (
                                <Menu.Item key={child.name}>
                                  <Link href={child.href}>
                                    <a className="text-sm">{child.name}</a>
                                  </Link>
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      ) : (
                        <Link key={item.name} href={item.href}>
                          <a className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-50">
                            <div className="flex bg-indigo-600 rounded p-2 items-center justify-center flex-shrink-0 w-10 h-10 text-white sm:h-12 sm:w-12">
                              <item.icon aria-hidden="true" />
                            </div>
                            <div className="ml-4">
                              <p className="text-sm font-medium text-gray-900">
                                {item.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {item.description}
                              </p>
                            </div>
                          </a>
                        </Link>
                      )
                    )}
                  </div>
                  <div className="p-4 bg-gray-50">
                    {additionalLinks.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <a className="flow-root px-2 py-2 transition duration-150 ease-in-out rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-50">
                          <span className="flex items-center">
                            <span className="text-sm font-medium text-gray-900">
                              {item.name}
                            </span>
                          </span>
                          <span className="block text-sm text-gray-500">
                            {item.description}
                          </span>
                        </a>
                      </Link>
                    ))}
                  </div>
                  <div className="flex justify-start gap-2 bg-gray-50 p-4 pt-0">
                    <Anchor
                      to={path.auth.signIn}
                      type="button"
                      variant="primary"
                    >
                      Sign In
                    </Anchor>
                    <Anchor
                      to={path.auth.signUp}
                      type="button"
                      variant="secondary"
                    >
                      Sign Up
                    </Anchor>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </>
  );
}
