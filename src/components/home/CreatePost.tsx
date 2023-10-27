import { useAppSelector } from "@/app/hooks";
import { ImagePlus } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CustomAvatar } from "../common/CustomAvatar";
import { Input } from "../ui/input";

function CreatePost() {
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const { communityId } = useParams();
  const communityData = {
    type: communityId ? "community" : "user",
    id: communityId ? communityId : user._id,
  };

  return (
    <div className="w-full p-3 rounded-2xl  border-slate-600/30 flex gap-2 items-center">
      <div
        className=" cursor-pointer"
        onClick={() => {
          navigate(`/profile/${user.userName}`);
        }}
      >
        <CustomAvatar
         className="border-2 rounded-full border-blue-500"
          src={user.profilePic}
          fallBack={user.firstName.charAt(0)}
        />
      </div>
      <Input
        onClick={() => {
          navigate(`/submit?origin=${location.pathname}`, { state: communityData });
        }}
        className="border"
        placeholder="Create Post"
      />
      <ImagePlus
        onClick={() => {
          navigate(`/submit?type=image`);
        }}
        className="text-black/50 cursor-pointer"
      />
    </div>
  );
}

export default CreatePost;
