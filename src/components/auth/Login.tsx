import useDocumentTitle from "@/hooks/useDocumentTitle";
import { UserPartial } from "@/types/userTypes";
import { Loader2 } from "lucide-react";
import React, { FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputWithLabel } from "../common/InputWithLabel";
import { Button } from "../ui/button";

import { useAppDispatch } from "@/app/hooks";
import { loginUser } from "@/features/user/userSlice";
import { hasProperty } from "@/utils/generalUtils";
import { toast } from "../ui/use-toast";

function Login() {
  useDocumentTitle("Login | Social Hub");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const [user, setUser] = React.useState<UserPartial>({
    email: "",
    password: "",
  });

  const handleLogin: FormEventHandler<HTMLFormElement> = (e) => {
    setLoading(true);
    e.preventDefault();
    dispatch(loginUser(user)).then((res) => {
      console.log(res.payload);
      if (hasProperty(res.payload, "data")) {
        setLoading(false);
        if (res.payload.status === 200) {
          // toast({
          //   title: "Welcome back.",
          //   description: "We've logged you in.",
          //   className: "bg-[#09090B] text-[#e2e2e2] border-[#e2e2e2]/20",
          //   duration: 1000,
          // });
          navigate("/auth/otp/verify");
          // navigate("/home");
        } else {
          toast({
            title: "Login failed.",
            description: res.payload.data.message,
            className: "bg-[#09090B] text-[#e2e2e2] border-[#e2e2e2]/20",
            duration: 1000,
          });
        }
      }
    });
  };

  return (
    <div className="w-full flex flex-col flex-1 items-center justify-center p-4 gap-y-2 overflow-auto bg-[#030303]">
      <div className="xl:w-2/5 lg:w-3/5 md:w-4/5 w-full p-2 rounded-sm flex flex-col gap-2">
        <div className="w-full text-center">
          <div>
            <div className="text-2xl text-slate-200 font-semibold mb-2">
              Log In
            </div>
            <div className="text-slate-200">
              Enter your credentials to access your account
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
            <InputWithLabel
              value={user.email}
              inputClassName="bg-[#09090B] text-white"
              onValueChange={(value: string) => {
                setUser({ ...user, email: value });
              }}
              id="user-email"
              label="Email"
              placeholder="Enter your email"
              type="text"
            />
            <InputWithLabel
              value={user.password}
              inputClassName="bg-[#09090B] text-white"
              onValueChange={(value: string) => {
                setUser({ ...user, password: value });
              }}
              id="user-password"
              label="Password"
              placeholder="•••••••••"
              type="password"
            />
            {loading ? (
              <Button className="mt-2" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="mt-2">
                Login
              </Button>
            )}
            <div className="text-center text-slate-400">
              Don't have an account ?{" "}
              <span
                onClick={() => {
                  navigate("/auth/register");
                }}
                className="text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                Register
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
