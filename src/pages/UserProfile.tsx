import { useAppSelector } from "@/app/hooks";
import UserCoverSection from "@/components/userprofile/UserCoverSection";
import { UserProfileTab } from "@/components/userprofile/UserProfileTab";
import useDocumentTitle from "@/hooks/useDocumentTitle";

function UserProfile() {
  useDocumentTitle("Profile | Social Hub");
  const user = useAppSelector((state) => state.user);

  return (
    <div className="w-full flex flex-col flex-1 items-center p-4 gap-y-2 overflow-auto text-white">
      <div className="xl:w-2/5 lg:w-3/5 md:w-4/5 w-full p-2 flex gap-2">
        <UserCoverSection user={user} />
      </div>
      <UserProfileTab />
    </div>
  );
}

export default UserProfile;
