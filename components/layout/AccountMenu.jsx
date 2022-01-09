import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Avatar from "components/avatars/Avatar";
import path from "utils/path";

export default function AccountMenu() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading</div>;
  } else {
    return (
      <Menu as="div" className="relative">
        <Menu.Button className="flex items-center">
          <Avatar src={session.user.image} className="h-8 w-8 ring-gray-300" />
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
                  <br />
                  <div className="font-medium">{session.user.email}</div>
                </div>
              </Menu.Item>
              <div>
                <Menu.Item>
                  <Link href={path.user.profile}>
                    <a className="hover:bg-indigo-500 hover:text-white text-gray-900 group flex rounded items-center w-full px-2 py-2 text-sm">
                      Profile
                    </a>
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <button
                    className="hover:bg-indigo-500 hover:text-white text-gray-900 group flex rounded items-center w-full px-2 py-2 text-sm"
                    onClick={() =>
                      signOut({
                        callbackUrl: "http://localhost:3000/auth/sign-in",
                      })
                    }
                  >
                    Sign Out
                  </button>
                </Menu.Item>
              </div>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    );
  }
}
