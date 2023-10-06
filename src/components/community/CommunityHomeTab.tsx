import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  fetchAllPostsByCommunity,
  fetchUpdatedAllPostsByCommunity,
} from "@/features/community/communityPost";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import CommunityPostCard from "../post/CommunityPostCard";

function CommunityHomeTab() {
  const dispatch = useAppDispatch();
  const { communityId } = useParams();
  const posts = useAppSelector((state) => state.community.home.posts.posts);
  const [state, setState] = useState({
    page: 1,
    limit: 10,
  });

  const fetchMoreData = () => {
    dispatch(
      fetchUpdatedAllPostsByCommunity({
        communityId: communityId!,
        data: { page: state.page, limit: state.limit },
      })
    );
    // TODO: Handle hasMore check
    setState({ ...state, page: state.page + 1 });
  };

  useEffect(() => {
    dispatch(
      fetchAllPostsByCommunity({
        communityId: communityId!,
        data: { page: 1, limit: 10 },
      })
    );
  }, [dispatch, communityId]);

  return (
    <div className="w-full flex gap-2 bg-[#030303] flex-col">
      {posts.length === 0 && (
        <div className="text-xl text-center font-semibold ">No Posts Found</div>
      )}
      <InfiniteScroll
        className="mt-0 no-scrollbar flex flex-col gap-2 w-full"
        dataLength={posts.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<Loader className="animate-spin text-white scroll" />}
      >
        {posts.map((post, index) => {
          return (
            <CommunityPostCard
              className="w-full"
              key={`${post._id}${index}`}
              post={post}
              type="community-home"
            />
          );
        })}
      </InfiniteScroll>
    </div>
  );
}

export default CommunityHomeTab;
