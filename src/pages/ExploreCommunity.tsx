import { useAppDispatch, useAppSelector } from "@/app/hooks";
import CommunityListCard from "@/components/community/CommunityListCard";
import { fetchAllCommunityByUser } from "@/features/community/communityLists";
import { PartialCommunity } from "@/types/communityTypes";
import { useEffect } from "react";

function ExploreCommunity() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllCommunityByUser());
  }, [dispatch]);
  const communityList = useAppSelector(
    (state) => state.community.lists.communities
  );
  return (
    <div className="w-full flex flex-col flex-1 items-center p-4 gap-y-2 overflow-auto text-white">
      <div className="xl:w-2/5 lg:w-3/5 md:w-4/5 w-full p-2 rounded-sm border-slate-600 flex flex-col gap-6">
        <div className="bg-[#27272a] p-2 rounded-md flex flex-col gap-4">
          {communityList.map((community: PartialCommunity) => {
            return (
              <CommunityListCard key={community._id} community={community} />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ExploreCommunity;