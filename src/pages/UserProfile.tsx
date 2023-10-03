import { useAppSelector } from "@/app/hooks";
import UserCoverSection from "@/components/userprofile/UserCoverSection";
import { UserProfileTab } from "@/components/userprofile/UserProfileTab";
import useDocumentTitle from "@/hooks/useDocumentTitle";

function UserProfile() {
  useDocumentTitle("Profile | Social Hub");
  const user = useAppSelector((state) => state.user);

  return (
    <div className="text-white bg-[#030303]">
      <div className="grid grid-cols-1 sm:grid-cols-5 md:grid-cols-4">
        <div className="col-span-1 sm:col-start-2 sm:col-span-3 md:col-span-2 md:col-start-2 overflow-y-auto">
          <div className="w-full flex gap-2 items-center bg-[#030303] flex-col p-4">
            <UserCoverSection user={user} />
            <UserProfileTab />
          </div>
        </div>
        <div className="hidden lg:block "></div>
      </div>
    </div>
  );
}

export default UserProfile;
