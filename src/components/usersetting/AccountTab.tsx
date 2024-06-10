import { useAppDispatch, useAppSelector } from "@/app/hooks";
import CustomSelect, { optionData } from "@/components/common/CustomSelect";
import { InputWithLabel } from "@/components/common/InputWithLabel";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  deleteUser,
  resetPassword,
  updateUserDetails,
  updateUserFirstName,
  updateUserGender,
  updateUserLastName,
} from "@/features/user/userSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "../ui/use-toast";
import { Loader2 } from "lucide-react";

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

function AccountTab() {
  return (
    <div className="flex flex-col gap-10 mt-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="text-black">First Name</h3>
        </div>
        <FirstnameDialog />
      </div>
      <div className="flex items-center justify-between">
        <div className="">
          <h3 className="text-black">Last Name</h3>
        </div>
        <LastnameDialog />
      </div>
      <div className="flex items-center justify-between">
        <div className="">
          <h3 className="text-black">Gender</h3>
        </div>
        <GenderDialog />
      </div>
      <div className="flex items-center justify-between">
        <div className=" gap-1">
          <h3 className="text-black">Password</h3>
        </div>
        <PasswordDialog />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="text-black">Delete Account</h3>
          <p className=" text-sm">This action can't be reverted.</p>
        </div>
        <DeleteDialog />
      </div>
    </div>
  );
}

function FirstnameDialog() {
  const userData = useAppSelector((state) => state.user);
  const [user, setUser] = useState(userData);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(!isOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] font-inter bg-[#fbfffe] ">
        
        <div className="">
          <InputWithLabel
            value={user.firstName}
            onValueChange={(value: string) => {
              setUser({ ...userData, firstName: value });
            }}
            id="firstname"
            label="First Name"
            placeholder="Enter your firstname"
            type="text"
          />
        </div>
        <DialogFooter>
          {loading ? (
            <Button className="mt-2" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              onClick={() => {
                setLoading(true);
                dispatch(updateUserDetails(user)).then((res) => {
                  if (res.meta.requestStatus === "fulfilled") {
                    dispatch(updateUserFirstName(user));
                    toast({
                      title: "Firstname updated successfully.",
                      className: "bg-[#09090B] text-[#e2e2e2] border-none ",
                      duration: 2000,
                    });
                  }
                });
                setLoading(false);
                setIsOpen(false);
              }}
              variant="default"
              type="submit"
            >
              Save changes
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function LastnameDialog() {
  const userData = useAppSelector((state) => state.user);
  const [user, setUser] = useState(userData);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(!isOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] font-inter bg-[#fbfffe]">
        {/* <DialogHeader className="text-lg font-semibold">
          Update Last Name
        </DialogHeader> */}
        <div className="">
          <InputWithLabel
            value={user.lastName}
            onValueChange={(value: string) => {
              setUser({ ...userData, lastName: value });
            }}
            // inputClassName="bg-[#09090B] text-white"
            id="lastname"
            label="Last Name"
            placeholder="Enter your lastname"
            type="text"
          />
        </div>
        <DialogFooter>
          {loading ? (
            <Button className="mt-2" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              onClick={() => {
                setLoading(true);
                dispatch(updateUserDetails(user)).then((res) => {
                  if (res.meta.requestStatus === "fulfilled") {
                    dispatch(updateUserLastName(user));
                    toast({
                      title: "Lastname updated successfully.",
                      className: "bg-[#09090B] text-[#e2e2e2] border-none ",
                      duration: 2000,
                    });
                  }
                });
                setLoading(false);
                setIsOpen(false);
              }}
              variant="default"
              type="submit"
            >
              Save changes
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function GenderDialog() {
  const userData = useAppSelector((state) => state.user);
  const [user, setUser] = useState(userData);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(!isOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] font-inter bg-[#fbfffe]">
        <DialogHeader className="text-lg font-semibold">
          Update Gender
        </DialogHeader>
        <div className="">
          <CustomSelect
            onValueChange={(value: string) => {
              setUser({ ...userData, gender: value });
            }}
            placeholder="Select gender"
            optionData={genderOption}
          />
        </div>
        <DialogFooter>
          {loading ? (
            <Button className="mt-2" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              onClick={() => {
                setLoading(true);
                dispatch(updateUserDetails(user)).then((res) => {
                  if (res.meta.requestStatus === "fulfilled") {
                    dispatch(updateUserGender(user));
                    toast({
                      title: "Gender updated successfully.",
                      className: "bg-[#09090B] text-[#e2e2e2] border-none ",
                      duration: 2000,
                    });
                  }
                });
                setLoading(false);
                setIsOpen(false);
              }}
              variant="secondary"
              type="submit"
            >
              Save changes
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function PasswordDialog() {
  const [userPassword, setUserPassword] = useState({
    confirmPassword: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(!isOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] font-inter bg-[#fbfffe]">
        <DialogHeader className="text-lg font-semibold">
          Update Password
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <InputWithLabel
            value={userPassword.password}
            onValueChange={(value: string) => {
              setUserPassword({ ...userPassword, password: value });
            }}
            // inputClassName="bg-[#09090B] text-white"
            id="password"
            label="Password"
            placeholder="•••••••••"
            type="password"
          />
          <InputWithLabel
            value={userPassword.confirmPassword}
            onValueChange={(value: string) => {
              setUserPassword({ ...userPassword, confirmPassword: value });
            }}
            // inputClassName="bg-[#09090B] text-white"
            id="confirm-password"
            label="ConfirmPassword"
            placeholder="•••••••••"
            type="password"
          />
        </div>
        <DialogFooter>
          {loading ? (
            <Button className="mt-2" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              
              onClick={() => {
                setLoading(true);
                const match =
                  userPassword.password === userPassword.confirmPassword;
                if (!match) {
                  toast({
                    title: "Password didn't match",
                    // className: "bg-[#09090B] text-[#e2e2e2] border-none ",
                    variant: "destructive",
                    duration: 1500,
                  });
                } else {
                  dispatch(resetPassword(userPassword)).then((res) => {
                    if (res.meta.requestStatus === "fulfilled") {
                      toast({
                        title: "Password updated successfully.",
                        className: "bg-[#09090B] text-[#e2e2e2] border-none ",
                        duration: 2000,
                      });
                    }
                  });
                }
                setLoading(false);
                setIsOpen(false);
              }}
              variant="default"
              type="submit"
            >
              Save changes
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function DeleteDialog() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(!isOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]  font-inter bg-[#fbfffe]">
        <DialogHeader className="text-lg font-semibold ">
          <p>Delete Account</p>
        </DialogHeader>
        <div className="text-base">
          Are you sure you want to delete your account ? Please confirm your
          decision.
        </div>
        <DialogFooter>
          {loading ? (
            <Button className="mt-2" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              onClick={() => {
                dispatch(deleteUser()).then((res) => {
                  if (res.meta.requestStatus === "fulfilled") {
                    setLoading(false);
                    setIsOpen(false);
                    navigate("/auth/login");
                    localStorage.removeItem("token");
                  }
                });
              }}
              className="w-full"
              variant="destructive"
              type="submit"
            >
              Confirm Delete
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AccountTab;
