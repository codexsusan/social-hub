import { Camera } from "lucide-react";
import ProfileImage from "../common/ProfileImage";
import { useAppSelector } from "@/app/hooks";

function CommunityCover() {
  const home = useAppSelector((state) => state.community.home.info);
  return (
    <div className="xl:w-2/5 lg:w-3/5 md:w-4/5 w-full p-2 flex gap-2">
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
            <ProfileImage src={home.icon_image} />
          </div>
          <div className="mb-4">
            <div className="text-xl font-semibold">{home.displayName}</div>
            <div className="">{"c/" + home.name}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityCover;
