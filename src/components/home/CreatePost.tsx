import { useNavigate } from "react-router-dom";
import { CustomAvatar } from "../common/CustomAvatar";
import { useAppSelector } from "@/app/hooks";
import { Input } from "../ui/input";
import { ImagePlus } from "lucide-react";

function CreatePost() {
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className="xl:w-2/5 lg:w-3/5 md:w-4/5 w-full p-3 border rounded-2xl border-slate-600 flex gap-2 items-center">
      <div
        className=" cursor-pointer"
        onClick={() => {
          navigate(`/profile/${user.userName}`);
        }}
      >
        <CustomAvatar
          src={user.profilePic}
          fallBack={user.firstName.charAt(0)}
        />
      </div>
      <Input
        onClick={() => {
          navigate(`/submit`);
        }}
        className="bg-[#171717] border-none border-0 text-gray-400"
        placeholder="Create Post"
      />
      <ImagePlus
        onClick={() => {
          navigate(`/submit?type=image`);
        }}
        className="text-white"
      />
    </div>
  );
}

export default CreatePost;
