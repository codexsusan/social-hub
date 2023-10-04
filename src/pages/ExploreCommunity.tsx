import { useAppDispatch, useAppSelector } from "@/app/hooks";
import CommunityListCard from "@/components/explorecommunity/CommunityListCard";
import { fetchExploreCommunities } from "@/features/explore-community/exploreSlice";
import { PartialCommunity } from "@/types/communityTypes";
import { useEffect } from "react";

function ExploreCommunity() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchExploreCommunities());
  }, [dispatch]);
  const exploreData = useAppSelector((state) => state.community.explore);
  const communities = exploreData.communities;
  return (
    <div className="text-white bg-[#030303]">
      <div className="grid grid-cols-1 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-6">
        <div className="col-span-1 sm:col-start-2 sm:col-span-3 md:col-span-3 md:col-start-2 lg:col-span-2 lg:col-start-3 overflow-y-auto ">
          <div className="w-full flex gap-4 items-center bg-[#030303] flex-col p-4">
            {communities.map((community: PartialCommunity) => {
              return (
                <CommunityListCard key={community._id} community={community} />
              );
            })}
          </div>
        </div>
        <div className="hidden lg:block col-span-1"></div>
      </div>
    </div>
  );
}

export default ExploreCommunity;
