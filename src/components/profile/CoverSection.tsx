import { Camera } from "lucide-react";
import PageLoading from "../common/PageLoading";
import { useAppSelector } from "@/app/hooks";
import DefaultProfile from "../common/DefaultProfile";

function CoverSection() {
  const user = useAppSelector((state) => state.user);
  return user.loading ? (
    <PageLoading className="my-12" />
  ) : (
    <>
      <UserCover />
    </>
  );
}

function UserCover() {
  const user = useAppSelector((state) => state.user);
  return (
    <div className="w-full bg-gradient-to-br from-cyan-500 to-blue-500 h-40 relative">
      <div className="absolute left-4 bottom-2 flex place-items-end gap-x-4">
        <div className="w-28 h-28 bg-black rounded-full overflow-hidden relative">
          <div
            onClick={() => {
              console.log("Change image");
            }}
            className="absolute right-4 bottom-4 bg-slate-600 rounded-full p-1 cursor-pointer"
          >
            <Camera />
          </div>
          <DefaultProfile />
        </div>
        <div className="mb-4">
          <div className="text-xl font-semibold">
            {user.firstName + " " + user.lastName}
          </div>
          <div className="">{"u/" + user.userName}</div>
        </div>
      </div>
    </div>
  );
}

export default CoverSection;
