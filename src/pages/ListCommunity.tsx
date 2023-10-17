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
  const communityList = useAppSelector(
    (state) => state.community.lists.communities
  );
  const [state, setState] = useState({
    page: 1,
    limit: 10,
  });

  const fetchMoreData = () => {
    dispatch(
      fetchUpdatedAllCommunityByUser({
        page: state.page + 1,
        limit: 10,
      })
    );
    // TODO: Handle hasMore check
    setState((prev) => {
      return { ...prev, page: prev.page + 1 };
    });
  };

  return (
    <div className="w-full p-2 rounded-md flex flex-col items-center gap-5">
      <InfiniteScroll
        className="mt-0 flex flex-col gap-4"
        dataLength={communityList.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<Loader className="animate-spin w-full text-white scroll" />}
      >
        {communityList.map((community: PartialCommunity) => {
          return (
            <CommunityListCard key={community._id} community={community} />
          );
        })}
      </InfiniteScroll>
    </div>
  );
}

function RightContent() {
  return <div>Right COntent</div>;
}

export default ListCommunity;
