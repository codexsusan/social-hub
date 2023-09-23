import CoverSection from "@/components/profile/CoverSection";
import { ProfileTab } from "@/components/profile/ProfileTab";
import useDocumentTitle from "@/hooks/useDocumentTitle";

function Profile() {
  useDocumentTitle("Profile | Social Hub");

  return (
    <div className="w-full flex flex-col flex-1 items-center p-4 gap-y-2 overflow-auto text-white">
      <div className="xl:w-2/5 lg:w-3/5 md:w-4/5 w-full p-2 flex gap-2">
        <CoverSection />
      </div>
      <ProfileTab />
    </div>
  );
}

export default Profile;
