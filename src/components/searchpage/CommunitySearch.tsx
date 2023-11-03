import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchSearchCommunity } from "@/features/searchpage/searchCommunitySlice";
import { useEffect } from "react";
import CommunityListCard from "../explorecommunity/CommunityListCard";

function CommunitySearch() {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.search.searchInfo);
  const searchResult = useAppSelector((state) => state.search.searchCommunity);
  useEffect(() => {
    const data = {
      query: searchQuery.searchQuery,
    };
    dispatch(fetchSearchCommunity(data));
  }, [dispatch, searchQuery.searchQuery]);

  return (
    <div className="flex flex-col gap-y-2 mt-0 flex-1">
      {searchResult.communities.length === 0 && (
        <div className="w-full flex justify-center text-xl my-4 font-semibold">
          No Community Found
        </div>
      )}
      {searchResult.communities.map((community) => {
        return (
          <CommunityListCard key={`${community._id}`} community={community} />
        );
      })}
    </div>
  );
}

export default CommunitySearch;
