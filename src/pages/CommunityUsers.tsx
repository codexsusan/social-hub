import CommunityCover from "@/components/community/CommunityCover";
import MemberSection from "@/components/communityusers/MemberSection";

function CommunityMembers() {
  return (
    // <PageWrapper
    //   LeftContent={<LeftContent />}
    //   RightContent={<RightContent />}
    // />
    <div className="mt-4">
      <div className="grid grid-cols-10">
        <div className="p-4 pt-0 col-start-3 sm:col-start-2 sm:col-span-8 md:col-start-3 md:col-span-6">
          <LeftContent />
        </div>
      </div>
    </div>
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

// function RightContent() {
//   return <>Right Content</>;
// }

export default CommunityMembers;
