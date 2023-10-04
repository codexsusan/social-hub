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
import {
  changeUserProfileImage,
  uploadUserImage,
} from "@/features/user/userSlice";
import { useState } from "react";

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

export default ProfileTab;
