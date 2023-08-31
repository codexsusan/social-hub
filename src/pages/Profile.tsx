import { useAppSelector } from "@/app/hooks";
import DefaultProfile from "@/components/common/DefaultProfile";
import PageLoading from "@/components/common/PageLoading";
import { ProfileTab } from "@/components/profile/ProfileTab";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { User } from "@/types/userTypes";
import { Camera } from "lucide-react";

function Profile() {
  useDocumentTitle("Profile | Social Hub");
  const user = useAppSelector((state) => state.user);

  // CoverView is a component that will be rendered based on the user loading state
  const CoverView = user.loading ? (
    <PageLoading className="my-12" />
  ) : (
    <>
      <UserCover user={user} />
    </>
  );

  return (
    <div className="w-full flex flex-col flex-1 items-center p-4 gap-y-2 overflow-auto text-white">
      <div className="xl:w-2/5 lg:w-3/5 md:w-4/5 w-full p-2  flex gap-2">
        {CoverView}
      </div>
      <ProfileTab />
    </div>
  );
}

function UserCover(props: { user: User }) {
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
            {props.user.firstName + " " + props.user.lastName}
          </div>
          <div className="">{"u/" + props.user.userName}</div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
