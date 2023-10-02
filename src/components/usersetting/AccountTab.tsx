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
    <div className="flex flex-col gap-4 mt-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h3>Email address</h3>
          <p className="text-sm">susan@gmail.com</p>
        </div>
        <EmailDialog />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h3>First Name</h3>
          <p className="text-sm">Susan </p>
        </div>
        <FirstnameDialog />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h3>Last Name</h3>
          <p className="text-sm">Khadka </p>
        </div>
        <LastnameDialog />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h3>Username</h3>
          <p className="text-sm">susankhadka</p>
        </div>
        <UsernameDialog />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h3>Gender</h3>
        </div>
        <div className="w-[10rem]">
          <CustomSelect
            onValueChange={() => {}}
            options={["male", "female", "others"]}
            placeholder="Select gender"
            optionData={genderOption}
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h3>Password</h3>
          <p className="text-sm">•••••••••</p>
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

function EmailDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]  bg-[#09090b] text-white">
        <DialogHeader className="text-lg font-semibold">
          Update Email
        </DialogHeader>
        <div className="">
          <InputWithLabel
            value={"susan@gmail.com"}
            onValueChange={() => {}}
            inputClassName="bg-[#09090B] text-white"
            id="email"
            label="Email"
            placeholder="Enter your email"
            type="text"
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

function UsernameDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]  bg-[#09090b] text-white">
        <DialogHeader className="text-lg font-semibold">
          Update Username
        </DialogHeader>
        <div className="">
          <InputWithLabel
            value={"susankhadka"}
            onValueChange={() => {}}
            inputClassName="bg-[#09090B] text-white"
            id="username"
            label="Username"
            placeholder="Enter your username"
            type="text"
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

function FirstnameDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]  bg-[#09090b] text-white">
        <DialogHeader className="text-lg font-semibold">
          Update First Name
        </DialogHeader>
        <div className="">
          <InputWithLabel
            value={"Susan"}
            onValueChange={() => {}}
            inputClassName="bg-[#09090B] text-white"
            id="firstname"
            label="First Name"
            placeholder="Enter your firstname"
            type="text"
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

function LastnameDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]  bg-[#09090b] text-white">
        <DialogHeader className="text-lg font-semibold">
          Update Last Name
        </DialogHeader>
        <div className="">
          <InputWithLabel
            value={"Khadka"}
            onValueChange={() => {}}
            inputClassName="bg-[#09090B] text-white"
            id="lastname"
            label="Last Name"
            placeholder="Enter your lastname"
            type="text"
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
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]  bg-[#09090b] text-white">
        <DialogHeader className="text-lg font-semibold">
          Delete Account
        </DialogHeader>
        <div className="text-base text-center">
          Are you sure you want to delete your account? <br />
          Please confirm your decision.
        </div>
        <DialogFooter>
          <Button variant="destructive" type="submit">
            Confirm Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AccountTab;
