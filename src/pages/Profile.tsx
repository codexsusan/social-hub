import DefaultProfile from "@/components/common/DefaultProfile";
import { Camera } from "lucide-react";

function Profile() {
  return (
    <div className="w-full flex flex-col flex-1 items-center p-4 gap-y-2 overflow-auto text-white">
      <div className="lg:w-3/5 md:w-4/5 w-full p-2 border rounded-sm border-slate-600 flex gap-2">
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
              <div className="text-xl font-semibold">Susan Khadka</div>
              <div className="">u/codexsusan</div>
            </div>
          </div>I
        </div>
      </div>
    </div>
  );
}

export default Profile;
