import { useAppDispatch } from "@/app/hooks";
import { uploadImage } from "@/features/user/userSlice";
import { Camera } from "lucide-react";
import ProfileUploadButton from "../common/ProfileUploadButton";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "../ui/dialog";

function CommunityProfilePictureUpdate() {
  const dispatch = useAppDispatch();
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
              callBackFn={() => {
                // Get value and profile image from above
                // dispatch(changeUserProfileImage(value));
              }}
              value={"profilePic"}
            />
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                // TODO: Get profile picture
                dispatch(uploadImage("profilePic"));
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

export default CommunityProfilePictureUpdate;
