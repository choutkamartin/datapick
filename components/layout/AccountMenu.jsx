import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Avatar from "components/avatars/Avatar";
import path from "utils/path";

export default function AccountMenu() {
  const { data: session, status } = useSession();

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center">
        <Avatar image={session.user.image} />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-56 mt-4 origin-top-right bg-white divide-y divide-gray-100 rounded shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 divide-y">
            <Menu.Item>
              <div className="text-gray-900 group rounded-md items-center w-full px-2 py-2 text-sm">
                Signed in as
                <br /> <div className="font-medium">{session.user.email}</div>
              </div>
            </Menu.Item>
            <div>
              <Menu.Item>
                {({ active }) => (
                  <Link href={path.user.profile}>
                    <a
                      className={`${
                        active ? "bg-indigo-500 text-white" : "text-gray-900"
                      } group flex rounded items-center w-full px-2 py-2 text-sm`}
                    >
                      Profile
                    </a>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-indigo-500 text-white" : "text-gray-900"
                    } group flex rounded items-center w-full px-2 py-2 text-sm`}
                    onClick={() =>
                      signOut({
                        callbackUrl: "http://localhost:3000/auth/sign-in",
                      })
                    }
                  >
                    Sign Out
                  </button>
                )}
              </Menu.Item>
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
