import { Disclosure } from "@headlessui/react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { authMethod } from "@/types/generalTypes";

export default function AuthNavbar(props: { authMethod: authMethod }) {
  const navigate = useNavigate();
  return (
    <Disclosure as="nav" className="bg-[#fbfffe]">
      <>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              {/* Logo will be here below */}
              <div className="flex flex-shrink-0 items-center">
              <h1 className="text-3xl text-blue-800 font-bold">S<sup>h</sup></h1>
              </div>
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* Profile dropdown */}
              {props.authMethod === "login" ? (
                <Button
                  onClick={() => {
                    navigate("/auth/register");
                  }}
                >
                  Sign Up
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    navigate("/auth/login");
                  }}
                >
                  Sign in
                </Button>
              )}
            </div>
          </div>
        </div>
      </>
    </Disclosure>
  );
}
