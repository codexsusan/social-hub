import PageWrapper from "@/components/common/PageWrapper";
import CommunityCover from "@/components/community/CommunityCover";
import MemberSection from "@/components/communityusers/MemberSection";

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
    <div className="">
      <CommunityCover />
      <MemberSection />
    </div>
  );
}

function RightContent() {
  return <>Right Content</>;
}

export default CommunityMembers;
