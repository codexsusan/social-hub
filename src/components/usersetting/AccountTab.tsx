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
  updateUserDetails,
  updateUserFirstName,
  updateUserGender,
  updateUserLastName,
} from "@/features/user/userSlice";
import { Gender } from "@/types/userTypes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
          <h3>First Name</h3>
        </div>
        <FirstnameDialog />
      </div>
      <div className="flex items-center justify-between">
        <div className="">
          <h3>Last Name</h3>
        </div>
        <LastnameDialog />
      </div>
      <div className="flex items-center justify-between">
        <div className="">
          <h3>Gender</h3>
        </div>
        <GenderDialog />
      </div>
      <div className="flex items-center justify-between">
        <div className=" gap-1">
          <h3>Password</h3>
        </div>
        <PasswordDialog />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h3>Delete Account</h3>
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
      <DialogContent className="sm:max-w-[425px]  bg-[#09090b] text-white">
        <DialogHeader className="text-lg font-semibold">
          Update First Name
        </DialogHeader>
        <div className="">
          <InputWithLabel
            value={user.firstName}
            onValueChange={(value: string) => {
              setUser({ ...userData, firstName: value });
            }}
            inputClassName="bg-[#09090B] text-white"
            id="firstname"
            label="First Name"
            placeholder="Enter your firstname"
            type="text"
          />
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              dispatch(updateUserDetails(user)).then((res) => {
                if (res.meta.requestStatus === "fulfilled") {
                  dispatch(updateUserFirstName(user));
                }
              });
              setIsOpen(false);
            }}
            variant="secondary"
            type="submit"
          >
            Save changes
          </Button>
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
      <DialogContent className="sm:max-w-[425px]  bg-[#09090b] text-white">
        <DialogHeader className="text-lg font-semibold">
          Update Last Name
        </DialogHeader>
        <div className="">
          <InputWithLabel
            value={user.lastName}
            onValueChange={(value: string) => {
              setUser({ ...userData, lastName: value });
            }}
            inputClassName="bg-[#09090B] text-white"
            id="lastname"
            label="Last Name"
            placeholder="Enter your lastname"
            type="text"
          />
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              dispatch(updateUserDetails(user)).then((res) => {
                if (res.meta.requestStatus === "fulfilled") {
                  dispatch(updateUserLastName(user));
                }
              });
              setIsOpen(false);
            }}
            variant="secondary"
            type="submit"
          >
            Save changes
          </Button>
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
      <DialogContent className="sm:max-w-[425px]  bg-[#09090b] text-white">
        <DialogHeader className="text-lg font-semibold">
          Update Gender
        </DialogHeader>
        <div className="">
          <CustomSelect
            onValueChange={(value: Gender) => {
              setUser({ ...userData, gender: value });
            }}
            options={["male", "female", "others"]}
            placeholder="Select gender"
            optionData={genderOption}
          />
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              dispatch(updateUserDetails(user)).then((res) => {
                if (res.meta.requestStatus === "fulfilled") {
                  dispatch(updateUserGender(user));
                }
              });
              setIsOpen(false);
            }}
            variant="secondary"
            type="submit"
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function PasswordDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]  bg-[#09090b] text-white">
        <DialogHeader className="text-lg font-semibold">
          Update Password
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <InputWithLabel
            value={"passwordhere"}
            onValueChange={() => {}}
            inputClassName="bg-[#09090B] text-white"
            id="password"
            label="Password"
            placeholder="•••••••••"
            type="password"
          />
          <InputWithLabel
            value={"passwordhere"}
            onValueChange={() => {}}
            inputClassName="bg-[#09090B] text-white"
            id="confirm-password"
            label="ConfirmPassword"
            placeholder="•••••••••"
            type="password"
          />
        </div>
        <DialogFooter>
          <Button variant="secondary" type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function DeleteDialog() {
  const userData = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
          variant="destructive"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]  bg-[#09090b] text-white">
        <DialogHeader className="text-lg font-semibold ">
          <p>Delete Account</p>
        </DialogHeader>
        <div className="text-base">
          Are you sure you want to delete your account ? Please confirm your
          decision.
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              dispatch(deleteUser()).then((res) => {
                if (res.meta.requestStatus === "fulfilled") {
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AccountTab;
