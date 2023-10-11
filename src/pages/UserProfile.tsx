import { useAppSelector } from "@/app/hooks";
import PageWrapper from "@/components/common/PageWrapper";
import UserCoverSection from "@/components/userprofile/UserCoverSection";
import { UserProfileTab } from "@/components/userprofile/UserProfileTab";
import useDocumentTitle from "@/hooks/useDocumentTitle";

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
    <div className="w-full flex gap-2 items-center bg-[#030303] flex-col p-4">
      <UserCoverSection user={user} />
      <UserProfileTab />
    </div>
  );
}

function RightContent() {
  return <div>Right Content</div>;
}

export default UserProfile;
