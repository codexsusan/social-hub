import React from "react";
import { Button } from "../ui/button";
import { InputWithLabel } from "../common/InputWithLabel";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { UserPartial } from "@/types/userTypes";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { loginUser } from "@/features/user/userSlice";

function Login() {
  useDocumentTitle("Login | Social Hub");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.user);
  // const [email, setEmail] = React.useState<string>("");
  // const [password, setPassword] = React.useState<string>("");
  // const [loading, setLoading] = React.useState<boolean>(false);

  const [user, setUser] = React.useState<UserPartial>({
    email: "",
    password: "",
  });

  const handleLogin = () => {
    dispatch(loginUser(user)).then((res) => {
      if (res.type === "/user/login/fulfilled") {
        navigate("/");
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
              // Working  till here
            }}
            className="w-full flex flex-col gap-y-3"
          >
            <InputWithLabel
              value={user.email}
              inputClassName="bg-[#09090B] text-white"
              onValueChange={(value: string) => {
                // setEmail(value);
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
                // setPassword(value);
                setUser({ ...user, password: value });
              }}
              id="user-password"
              label="Password"
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
