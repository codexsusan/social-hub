import PageWrapper from "@/components/common/PageWrapper";
import CommunityCover from "@/components/community/CommunityCover";
import Tab from "@/components/communityusers/Tab";

function CommunityMembers() {
  return (
    <PageWrapper
      LeftContent={<LeftContent />}
      RightContent={<RightContent />}
    />
  );
}

function LeftContent() {
  return (
    <div className=" p-4">
      <CommunityCover />
      <Tab />
    </div>
  );
}

function RightContent() {
  return <>Right Content</>;
}

export default CommunityMembers;
