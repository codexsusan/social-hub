import { useAppSelector } from "@/app/hooks";
import { CustomAvatar } from "@/components/common/CustomAvatar";
import PageWrapper from "@/components/common/PageWrapper";
import UserCoverSection from "@/components/userprofile/UserCoverSection";
import { UserProfileTab } from "@/components/userprofile/UserProfileTab";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { Loader2, User2 } from "lucide-react";

function UserProfile() {
  useDocumentTitle("Profile | Social Hub");

  return (
    <PageWrapper
      LeftContent={<LeftContent />}
      RightContent={<RightContent />}
    />
  );
}

function LeftContent() {
  const user = useAppSelector((state) => state.user);
  return (
    <div className="w-full flex gap-2 items-center bg-[#fbfffe] flex-col p-4 justify-center">
      {user.loading ? (
        <Loader2 className="animate-spin w-16 h-16 my-4 text-blue-700" />
      ) : (
        <>
          <UserCoverSection user={user} />
          <UserProfileTab />
        </>
      )}
    </div>
  );
}

function RightContent() {
  const user = useAppSelector((state) => state.user);
  return (
    <div className="relative rounded-md top-20 w-full bg-[#F2F7F8] overflow-hidden">
      <div className="p-5 flex items-center gap-x-2 bg-[#eef2f3] border-b border-[#2B2B2B]">
        <User2 className="" />
        <p className="text-lg font-semibold">User Profile</p>
      </div>
      <div className=" grid grid-cols-1 p-2 divide-y divide-zinc-500">
        <div className="w-full flex justify-between p-4 items-center">
          <p className=" font-medium">Avatar</p>
          <CustomAvatar src={user.profilePic} />
        </div>
        <div className="w-full flex justify-between p-4">
          <p className=" font-medium">Email</p>
          <p>{user.email}</p>
        </div>
        <div className="w-full flex justify-between p-4">
          <p className=" font-medium">Fullname</p>
          <p>{user.firstName + " " + user.lastName}</p>
        </div>
        <div className="w-full flex justify-between p-4">
          <p className="font-medium">Username</p>
          <div>
            <p>{"@" + user.userName}</p>
          </div>
        </div>
        <div className="w-full flex justify-between p-4">
          <p className=" font-medium">Gender</p>
          <p>{user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}</p>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
