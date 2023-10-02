import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { InputWithLabel } from "@/components/common/InputWithLabel";
import ProfileUploadButton from "@/components/common/ProfileUploadButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountTab from "@/components/usersetting/AccountTab";
import {
  changeUserProfileImage,
  uploadUserImage,
} from "@/features/user/userSlice";
import { useState } from "react";

export function UserSettings() {
  return (
    <div className="w-full flex flex-col flex-1 items-center p-4 gap-y-2 overflow-auto text-white">
      <div className="xl:w-3/5 md:w-4/5 w-full p-2 rounded-sm border-slate-600 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="text-xl font-bold">User Settings</div>
          <Separator className="bg-gray-700" orientation="horizontal" />
        </div>
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full md:w-2/3 bg-[#27272A] grid-cols-2">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <AccountTab />
          </TabsContent>
          <TabsContent className="md:w-2/3" value="profile">
            <ProfileTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function ProfileTab() {
  const dispatch = useAppDispatch();
  const { profilePic } = useAppSelector((state) => state.user);
  return (
    <div className="flex flex-col gap-4 mt-8">
      <div>
        <div>
          <div>Update Profile</div>
          <div className="w-full flex justify-center my-4">
            <ProfileUploadButton
              callBackFn={(value: string) => {
                dispatch(changeUserProfileImage(value));
              }}
              value={profilePic}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h3>Update Bio</h3>
          <p className="text-sm flex-1">Hello everyone this is my bio </p>
        </div>
        <BioDialog />
      </div>
      <Button
        className="w-full"
        onClick={() => {
          dispatch(uploadUserImage(profilePic));
        }}
        type="submit"
      >
        Save changes
      </Button>
    </div>
  );
}

function BioDialog() {
  const [bio, setBio] = useState("This is my bio");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]  bg-[#09090b] text-white">
        <DialogHeader className="text-lg font-semibold">
          Update Bio
        </DialogHeader>
        <div className="">
          <InputWithLabel
            value={bio}
            onValueChange={(value: string) => {
              setBio(value);
            }}
            inputClassName="bg-[#09090B] text-white"
            id="bio"
            label="Update Bio"
            placeholder="Enter your bio"
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
