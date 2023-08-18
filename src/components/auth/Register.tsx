import React from "react";
import { InputWithLabel } from "../common/InputWithLabel";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { userSignup } from "@/utils/userUtils";

function Register() {
  const navigate = useNavigate();
  const { toast } = useToast();

  // TODO: Remove bio in backend and from here too
  // TODO: Use Validation for all the fields
  // TODO: Add a loading state

  const [user, setUser] = React.useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    gender: "",
    confirmPassword: "",
    bio: "Hello Dev",
    loading: false,
  });

  const handleRegister = () => {
    setUser({ ...user, loading: true });
    userSignup(user)
      .then((res) => {
        setUser({ ...user, loading: false });
        if (res.status === 200 || res.status === 201) {
          // Check: Do we need to show a toast here?
          // toast({
          //   description: res.data.message,
          //   duration: 3000,
          // });
          localStorage.setItem("token", res.data.token);
          // TODO: Add navigation properly
          // navigate("/app");
        } else {
          toast({
            description: res.data.message,
            duration: 3000,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setUser({ ...user, loading: false });
      });
  };

  return (
    <div className=" flex-1 flex items-center justify-center bg-[#030303]">
      <div className="w-full flex flex-col items-center justify-center gap-y-10 mb-10">
        {/* <Images source={logo} /> */}
        <div className="w-1/3 text-center">
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
              // Working  till here
            }}
            className="w-1/4 flex flex-col gap-y-3"
          >
            <InputWithLabel
              value={user.firstName}
              onValueChange={(value: string) => {
                setUser({ ...user, firstName: value });
              }}
              id="firstname"
              label="First Name"
              placeholder="Enter your first name"
              type="text"
            />
            <InputWithLabel
              value={user.lastName}
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
              onValueChange={(value: string) => {
                setUser({ ...user, userName: value });
              }}
              id="username"
              label="Username"
              placeholder="Enter your username"
              type="text"
            />
            <InputWithLabel
              value={user.gender}
              onValueChange={(value: string) => {
                setUser({ ...user, gender: value });
              }}
              id="gender"
              label="Gender"
              placeholder="Enter your gender"
              type="text"
            />
            <InputWithLabel
              value={user.email}
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
              onValueChange={(value: string) => {
                setUser({ ...user, confirmPassword: value });
              }}
              id="confirm-password"
              label="Confirm Password"
              placeholder="•••••••••"
              type="password"
            />
            {user.loading ? (
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
