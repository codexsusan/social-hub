import React from "react";
import { Button } from "../ui/button";
import { InputWithLabel } from "../common/InputWithLabel";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = () => {};
  return (
    <div className=" flex-1 flex items-center justify-center bg-[#030303]">
      <div className="w-full flex flex-col items-center justify-center gap-y-10 mb-10">
        {/* Logo should be here */}
        {/* <Images source={logo} /> */}
        <div className="w-1/3 text-center">
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
            className="w-1/4 flex flex-col gap-y-3"
          >
            <InputWithLabel
              value={email}
              onValueChange={(value: string) => {
                setEmail(value);
              }}
              id="user-email"
              label="Email"
              placeholder="Enter your email"
              type="text"
            />
            <InputWithLabel
              value={password}
              onValueChange={(value: string) => {
                setPassword(value);
              }}
              id="user-password"
              label="Password"
              placeholder="•••••••••"
              type="password"
            />
            <Button type="submit">Login</Button>
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
