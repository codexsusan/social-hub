import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { MoreVertical } from "lucide-react";
import { OptionType } from "@/types/generalTypes";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function CustomDropdown(props: { options: OptionType[] }) {
  const options = props.options;
  return (
    <Menu as="div" className="relative inline-block text-left ">
      <div>
        <Menu.Button className="inline-flex justify-center rounded-md bg-transparent text-sm ">
          <MoreVertical strokeWidth={1} fill="white" />
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-32 text-whi rounded-md shadow-lg focus:ring-1 ring-white ring-opacity-25 bg-gray-500">
          <div className="py-1">
            {options.map((option) => {
              if (option.displayStatus) {
                return (
                  <Menu.Item key={option.label}>
                    {({ active }) => (
                      <a
                        onClick={option.action}
                        className={classNames(
                          active ? "bg-gray-700" : "bg-gray-500",
                          "flex px-4 py-2 text-sm text-white items-center gap-x-4"
                        )}
                      >
                        {option.icon}
                        {option.label}
                      </a>
                    )}
                  </Menu.Item>
                );
              } else {
                return null;
              }
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
