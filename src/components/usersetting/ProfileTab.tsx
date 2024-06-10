import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { InputWithLabel } from "@/components/common/InputWithLabel";
import ProfileUploadButton from "@/components/common/ProfileUploadButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  changeUserProfileImage,
  uploadUserImage,
} from "@/features/user/userSlice";
import { hasProperty } from "@/utils/generalUtils";
import { useState } from "react";
import { toast } from "../ui/use-toast";

function ProfileTab() {
  const dispatch = useAppDispatch();
  const { profilePic } = useAppSelector((state) => state.user);
  const [serverImage, setServerImage] = useState<string>(profilePic);
  return (
    <div className="flex flex-col gap-4 mt-8">
      <div>
        <div>
          <div>Update Profile</div>
          <div className="w-full flex justify-center my-4">
            <ProfileUploadButton
              callBackFn={(value: string) => {
                setServerImage(value);
              }}
              value={serverImage}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="text-black">Update Bio</h3>
          <p className="text-sm flex-1">Hello everyone this is my bio </p>
        </div>
        <BioDialog />
      </div>
      <Button
        className="w-full"
        onClick={() => {
          dispatch(uploadUserImage(serverImage)).then((res) => {
            if (
              hasProperty(res.payload, "status") &&
              res.payload.status == 200
            ) {
              dispatch(changeUserProfileImage(serverImage));
              toast({
                title: "Updated successfully.",
                description: "User image updated successfully",
                className: "bg-[#09090B] text-[#e2e2e2] border-none ",
                duration: 2000,
              });
            }
          });
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
      <DialogContent className="sm:max-w-[425px] font-inter bg-[#fbfffe]">
        {/* <DialogHeader className="text-lg font-semibold">
          Update Bio
        </DialogHeader> */}
        <div className="">
          <InputWithLabel
            value={bio}
            onValueChange={(value: string) => {
              setBio(value);
            }}
            // inputClassName="bg-[#09090B] text-white"
            id="bio"
            label="Update Bio"
            placeholder="Enter your bio"
            type="text"
          />
        </div>
        <DialogFooter>
          <Button variant="default" type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ProfileTab;
