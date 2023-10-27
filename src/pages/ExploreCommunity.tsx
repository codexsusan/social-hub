import { useAppDispatch, useAppSelector } from "@/app/hooks";
import CommunityListCard from "@/components/explorecommunity/CommunityListCard";
import {
  fetchExploreCommunities,
  fetchUpdatedExploreCommunities,
} from "@/features/explore-community/exploreSlice";
import { PartialCommunity } from "@/types/communityTypes";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function ExploreCommunity() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      fetchExploreCommunities({
        page: 1,
        limit: 10,
      })
    );
  }, [dispatch]);
  return (
    // <PageWrapper
    //   className="mt-8"
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
  const dispatch = useAppDispatch();
  const exploreData = useAppSelector((state) => state.explore);
  const communitiesData = exploreData.communities;
  const [state, setState] = useState({
    page: 1,
    limit: 10,
  });
  const [hasMore, setHasMore] = useState<boolean>(true);
  const fetchMoreData = () => {
    dispatch(
      fetchUpdatedExploreCommunities({
        page: state.page + 1,
        limit: 10,
      })
    );
    if (state.page < exploreData.totalPages!) {
      setHasMore(true);
      setState({ ...state, page: state.page + 1 });
    } else {
      setHasMore(false);
    }
  };
  return (
    <div className="w-full p-2 rounded-md flex flex-col gap-5">
      <InfiniteScroll
        className="mt-0 flex flex-col gap-4"
        dataLength={communitiesData.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<Loader className="animate-spin text-white scroll" />}
      >
        {communitiesData.map((community: PartialCommunity, index) => {
          return (
            <CommunityListCard
              key={`${community._id}${index}`}
              community={community}
            />
          );
        })}
      </InfiniteScroll>
    </div>
  );
}

// function RightContent() {
//   return <div>Right Content</div>;
// }

export default ExploreCommunity;
