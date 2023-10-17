import { useAppDispatch, useAppSelector } from "@/app/hooks";
import PageWrapper from "@/components/common/PageWrapper";
import CommunityListCard from "@/components/explorecommunity/CommunityListCard";
import { fetchExploreCommunities } from "@/features/explore-community/exploreSlice";
import { PartialCommunity } from "@/types/communityTypes";
import { useEffect } from "react";

function ExploreCommunity() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchExploreCommunities());
  }, [dispatch]);
  return (
    <PageWrapper
      className="mt-8"
      LeftContent={<LeftContent />}
      RightContent={<RightContent />}
    />
  );
}

function LeftContent() {
  const exploreData = useAppSelector((state) => state.community.explore);
  const communities = exploreData.communities;
  return (
    <div className="w-full p-2 rounded-md flex flex-col gap-5">
      {communities.map((community: PartialCommunity) => {
        return <CommunityListCard key={community._id} community={community} />;
      })}
    </div>
  );
}

function RightContent() {
  return <div>Right Content</div>;
}

export default ExploreCommunity;
