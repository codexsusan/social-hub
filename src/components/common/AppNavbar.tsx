import { Fragment, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { SearchBar } from "./SearchBar";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { CustomAvatar } from "./CustomAvatar";
import useTokenVerify from "@/hooks/useTokenVerify";
import { fetchUserData } from "@/features/user/userSlice";
import { toast } from "../ui/use-toast";

const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function AppNavbar() {
  const user = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useTokenVerify();
  useEffect(() => {
    dispatch(fetchUserData()).then((res) => {
      if (res.meta.requestStatus === "rejected") {
        toast({
          description: user.error,
          className: "bg-[#09090B] text-[#e2e2e2] border-none ",
          duration: 3000,
        });
        if (user.error === "Failed to load user data") {
          localStorage.removeItem("token");
          navigate("/auth/login");
        }
      }
    });
  }, [dispatch, navigate, user.error]);

  const profileDetail = [
    {
      label: "Your Profile",
      href: `/profile/${user.userName}`,
      onClick: () => {},
    },
    { label: "Explore", href: "/explore", onClick: () => {} },
    { label: "Create Community", href: "/c/create", onClick: () => {} },
    { label: "Your Community", href: "/c/lists", onClick: () => {} },
    {
      label: "Settings",
      href: `/profile/${user.userName}/settings`,
      onClick: () => {},
    },
    {
      label: "Sign out",
      href: "/auth/login",
      onClick: () => {
        localStorage.removeItem("token");
      },
    },
  ];

  return (
    <Disclosure as="nav" className="bg-[#fbfffe] fixed top-0 w-full z-10 ">
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-6 lg:px-8 py-2">
            <div className=" flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-[#1A282D] hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
                {/* Logo will be here below */}
                <div
                  onClick={() => {
                    navigate("/home");
                  }}
                  className="flex flex-shrink-0 items-center cursor-pointer"
                >
                  <h1 className="text-3xl text-blue-800 font-bold">
                    S<sup>h</sup>
                  </h1>
                </div>
              </div>
              <div className="w-1/2 text-white hidden sm:block">
                <SearchBar />
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <CustomAvatar
                        src={user.profilePic}
                        fallBack={user.firstName.charAt(0)}
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {profileDetail.map((item) => {
                        return (
                          <Menu.Item key={item.label}>
                            {({ active }) => (
                              <Link
                                to={item.href}
                                onClick={item.onClick}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                {item.label}
                              </Link>
                            )}
                          </Menu.Item>
                        );
                      })}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
