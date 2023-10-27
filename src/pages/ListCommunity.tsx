import { useAppDispatch, useAppSelector } from "@/app/hooks";
import PageWrapper from "@/components/common/PageWrapper";
import CommunityListCard from "@/components/explorecommunity/CommunityListCard";
import {
  fetchAllCommunityByUser,
  fetchUpdatedAllCommunityByUser,
} from "@/features/community/communityLists";
import { PartialCommunity } from "@/types/communityTypes";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function ListCommunity() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      fetchAllCommunityByUser({
        page: 1,
        limit: 10,
      })
    );
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
  const dispatch = useAppDispatch();
  const communityLists = useAppSelector((state) => state.community.lists);
  const communityData = useAppSelector(
    (state) => state.community.lists.communities
  );
  console.log(communityData);
  const [state, setState] = useState({
    page: 1,
    limit: 10,
  });

  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchMoreData = () => {
    dispatch(
      fetchUpdatedAllCommunityByUser({
        page: state.page + 1,
        limit: 10,
      })
    );

    if (state.page < communityLists.totalPages!) {
      setHasMore(true);
      setState({ ...state, page: state.page + 1 });
    } else {
      setHasMore(false);
    }
  };

  return (
    <div className="w-full p-2 rounded-md flex flex-col items-center gap-5">
      <InfiniteScroll
        className="mt-0 flex flex-col gap-4"
        dataLength={communityData.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<Loader className="animate-spin w-full text-white scroll" />}
      >
        {communityData.map((community: PartialCommunity) => {
          return (
            <CommunityListCard key={community._id} community={community} />
          );
        })}
      </InfiniteScroll>
    </div>
  );
}

function RightContent() {
  // TODO: Right Content
  return <div>Right COntent</div>;
}

export default ListCommunity;
