import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProfileUploadButton from "../common/ProfileUploadButton";
import { Button } from "../ui/button";
import { Camera } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { changeUserProfileImage, uploadImage } from "@/features/user/userSlice";

function ProfilePictureUpdate() {
  const dispatch = useAppDispatch();
  const { profilePic } = useAppSelector((state) => state.user);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="absolute right-4 bottom-4 bg-black rounded-full p-1 cursor-pointer">
          <Camera />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]  bg-[#09090b] text-white">
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
          <DialogFooter>
            <Button
              onClick={() => {
                dispatch(uploadImage(profilePic));
              }}
              type="submit"
            >
              Save changes
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProfilePictureUpdate;
