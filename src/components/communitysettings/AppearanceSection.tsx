import { useAppDispatch, useAppSelector } from "@/app/hooks";
import ProfileUploadButton from "../common/ProfileUploadButton";
import { Button } from "../ui/button";
import {
  changeCommunityIcon,
  uploadCommunityIcon,
} from "@/features/community/communityInfo";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "../ui/use-toast";
import { hasProperty } from "@/utils/generalUtils";

function AppearanceSection() {
  const communityInfo = useAppSelector((state) => state.community.home.info);
  const { communityId } = useParams();
  const dispatch = useAppDispatch();

  const [serverImage, setServerImage] = useState<string>(
    communityInfo.icon_image!
  );
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
      <Button
        className="w-full"
        onClick={() => {
          dispatch(
            uploadCommunityIcon({
              imageLink: serverImage,
              communityId: communityId,
            })
          ).then((res) => {
            if (
              hasProperty(res.payload, "status") &&
              res.payload.status == 200
            ) {
              dispatch(changeCommunityIcon(serverImage));
              toast({
                title: "Updated successfully.",
                description: "Community icon updated successfully",
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

export default AppearanceSection;
