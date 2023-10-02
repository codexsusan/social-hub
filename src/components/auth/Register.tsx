import React from "react";
import { InputWithLabel } from "../common/InputWithLabel";
import { Button } from "../ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { registerUser } from "@/features/user/userSlice";

import CustomSelect, { optionData } from "../common/CustomSelect";
import { Gender, RegisterUser } from "@/types/userTypes";
import { toast } from "../ui/use-toast";

function Register() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useDocumentTitle("Register | Social Hub");

  // TODO: Remove bio in backend and from here too
  // TODO: Use Validation for all the fields
  // TODO: Add a loading state

  const [user, setUser] = React.useState<Partial<RegisterUser>>({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    gender: "",
    confirmPassword: "",
  });

  const genderOption: optionData[] = [
    {
      id: "male",
      name: "Male",
    },
    {
      id: "female",
      name: "Female",
    },
  ];

  const userData = useAppSelector((state) => state.user);

  const handleRegister = () => {
    dispatch(registerUser(user)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          duration: 2000,
          className: "bg-[#09090B] text-[#e2e2e2] border-none ",
        });
        navigate("/");
      } else if (res.meta.requestStatus === "rejected") {
        toast({
          title: "Unable to create an account.",
          description: userData.error,
          duration: 2000,
        });
      }
    });
  };

  return (
    <div className="w-full flex flex-col flex-1 items-center justify-center p-4 gap-y-2 overflow-auto bg-[#030303]">
      <div className="xl:w-2/5 lg:w-3/5 md:w-4/5 w-full p-2 rounded-sm flex flex-col gap-2">
        <div className=" text-center">
          <div>
            <div className="text-2xl text-slate-200 font-semibold mb-2">
              Sign up
            </div>
            <div className="text-slate-200">Register yourself to access</div>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRegister();
            }}
            className="w-full flex flex-col gap-y-3"
          >
            <InputWithLabel
              value={user.firstName}
              onValueChange={(value: string) => {
                setUser({ ...user, firstName: value });
              }}
              inputClassName="bg-[#09090B] text-white"
              id="firstname"
              label="First Name"
              placeholder="Enter your first name"
              type="text"
            />
            <InputWithLabel
              value={user.lastName}
              inputClassName="bg-[#09090B] text-white"
              onValueChange={(value: string) => {
                setUser({ ...user, lastName: value });
              }}
              id="lastname"
              label="Last Name"
              placeholder="Enter your last name"
              type="text"
            />
            <InputWithLabel
              value={user.userName}
              inputClassName="bg-[#09090B] text-white"
              onValueChange={(value: string) => {
                setUser({ ...user, userName: value });
              }}
              id="username"
              label="Username"
              placeholder="Enter your username"
              type="text"
            />
            <div>
              <Label className="text-slate-200" htmlFor="gender">
                Gender
              </Label>
              <CustomSelect
                optionData={genderOption}
                onValueChange={(value: Gender) => {
                  setUser({ ...user, gender: value });
                }}
                options={["male", "female", "others"]}
                placeholder="Select your gender"
              />
            </div>
            <InputWithLabel
              value={user.email}
              inputClassName="bg-[#09090B] text-white"
              onValueChange={(value: string) => {
                setUser({ ...user, email: value });
              }}
              id="email"
              label="Email"
              placeholder="Enter your email"
              type="email"
            />
            <InputWithLabel
              value={user.password}
              inputClassName="bg-[#09090B] text-white"
              onValueChange={(value: string) =>
                setUser({ ...user, password: value })
              }
              id="password"
              label="Password"
              placeholder="•••••••••"
              type="password"
            />
            <InputWithLabel
              value={user.confirmPassword}
              inputClassName="bg-[#09090B] text-white"
              onValueChange={(value: string) => {
                setUser({ ...user, confirmPassword: value });
              }}
              id="confirm-password"
              label="Confirm Password"
              placeholder="•••••••••"
              type="password"
            />
            {userData.loading ? (
              <Button className="mt-2" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="mt-2">
                Sign up
              </Button>
            )}

            <div className="text-center text-slate-400">
              Already a member?{" "}
              <span
                onClick={() => {
                  navigate("/auth/login");
                }}
                className="text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                Log in
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
