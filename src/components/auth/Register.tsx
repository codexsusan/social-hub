import React, { useState } from "react";
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
import { hasProperty } from "@/utils/generalUtils";

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

function Register() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useDocumentTitle("Register | Social Hub");

  const [user, setUser] = React.useState<Partial<RegisterUser>>({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    phoneNo: "",
    gender: "",
    password: "",
    confirmPassword: "",
    bio: "",
  });

  const checkPasswordMatch = () => {
    if (user.password !== user.confirmPassword) {
      return false;
    } else {
      return true;
    }
  };

  const handleRegister = () => {
    const match = checkPasswordMatch();
    if (!match) {
      return toast({
        title: "Password didn't match",
        className: "bg-[#09090B] text-[#e2e2e2] border-[#e2e2e2]/20",
        duration: 1000,
      });
    }
    dispatch(registerUser(user)).then((res) => {
      if (hasProperty(res.payload, "status")) {
        if (res.payload.status === 201) {
          toast({
            title: "Account created.",
            description: res.payload.data.message,
            className: "bg-[#09090B] text-[#e2e2e2] border-[#e2e2e2]/20",
            duration: 1000,
          });
          navigate("/auth/login");
        } else {
          toast({
            title: "Unable to create an account.",
            description: res.payload.data.message,
            className: "bg-[#09090B] text-[#e2e2e2] border-[#e2e2e2]/20",
            duration: 1000,
          });
        }
      }
    });
  };

  return (
    <div className="w-full flex flex-col flex-1 items-center justify-center p-4 gap-y-2 overflow-auto bg-[#fbfffe]">
      <div className="xl:w-2/5 lg:w-3/5 md:w-4/5 w-full p-2 rounded-sm flex flex-col gap-2">
        <div className=" text-center">
          <div>
            <div className="font-semibold text-[2rem] mb-2">Sign up</div>
            <div className="font-thin text-[1.25rem]">
              Register yourself to access
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center mt-16">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRegister();
            }}
            className="w-full flex flex-col gap-4"
          >
            <FormStages user={user} setUser={setUser} />
          </form>
        </div>
      </div>
    </div>
  );
}

function FormStages({
  user,
  setUser,
}: {
  user: Partial<RegisterUser>;
  setUser: (value: Partial<RegisterUser>) => void;
}) {
  const [step, setStep] = useState<number>(0);

  const incrStep = () => {
    setStep(step + 1);
  };

  const decrStep = () => {
    setStep(step - 1);
  };
  switch (step) {
    case 0:
      return <NameForm user={user} setUser={setUser} incrStep={incrStep} />;
    case 1:
      return (
        <ChooseGender
          user={user}
          setUser={setUser}
          incrStep={incrStep}
          decrStep={decrStep}
        />
      );
    case 2:
      return (
        <CredentialForm user={user} setUser={setUser} decrStep={decrStep} />
      );
    default:
      return null;
  }
}

function NameForm({
  user,
  setUser,
  incrStep,
}: {
  user: Partial<RegisterUser>;
  setUser: (value: Partial<RegisterUser>) => void;
  incrStep: () => void;
}) {
  const navigate = useNavigate();
  return (
    <>
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
      <Button onClick={incrStep}>Next</Button>
      <div className="text-center text-slate-600 ">
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
    </>
  );
}

function ChooseGender({
  user,
  setUser,
  incrStep,
  decrStep,
}: {
  user: Partial<RegisterUser>;
  setUser: (value: Partial<RegisterUser>) => void;
  incrStep: () => void;
  decrStep: () => void;
}) {
  return (
    <div className="w-full flex flex-col gap-4">
      <Label className="text-black text-lg" htmlFor="gender">
        Gender
      </Label>
      <CustomSelect
        optionData={genderOption}
        onValueChange={(value: Gender) => {
          setUser({ ...user, gender: value });
        }}
        placeholder="Select your gender"
      />
      <div className="w-full flex justify-between">
        <Button variant={"outline"} onClick={decrStep}>
          Previous
        </Button>
        <Button onClick={incrStep}>Next</Button>
      </div>
    </div>
  );
}

function CredentialForm({
  user,
  setUser,
  decrStep,
}: {
  user: Partial<RegisterUser>;
  setUser: (value: Partial<RegisterUser>) => void;
  decrStep: () => void;
}) {
  const userData = useAppSelector((state) => state.user);
  return (
    <div className="w-full flex flex-col gap-4">
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
        value={user.phoneNo}
        onValueChange={(value: string) => {
          setUser({ ...user, phoneNo: value });
        }}
        id="phoneNo"
        label="Phone No"
        placeholder="Enter your phone number"
        type="text"
      />
      <InputWithLabel
        value={user.password}
        onValueChange={(value: string) => setUser({ ...user, password: value })}
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
      {userData.loading ? (
        <Button disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </Button>
      ) : (
        <Button variant={"default"} type="submit">
          Sign up
        </Button>
      )}
      <Button variant={"outline"} onClick={decrStep}>
        Previous
      </Button>
    </div>
  );
}

export default Register;
