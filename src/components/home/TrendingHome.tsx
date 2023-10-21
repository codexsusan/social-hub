import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useEffect, useState } from "react";
import PostCard from "../post/PostCard";

import {
  fetchTrendingPosts,
  fetchUpdatedTrendingPosts,
} from "@/features/home/trendingSlice";
import { Loader } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import CommunityPostCard from "../post/CommunityPostCard";
import { toast } from "../ui/use-toast";

function TrendingHome() {
  const dispatch = useAppDispatch();
  const trending = useAppSelector((state) => state.home.trending);
  const trendingPosts = useAppSelector((state) => state.home.trending.posts);
  const [state, setState] = useState({
    page: 1,
    limit: 10,
  });
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchMoreData = () => {
    dispatch(
      fetchUpdatedTrendingPosts({ page: state.page + 1, limit: state.limit })
    );
    if (state.page < trending.totalPages!) {
      setHasMore(true);
      setState({ ...state, page: state.page + 1 });
    } else {
      setHasMore(false);
    }
  };
  useEffect(() => {
    dispatch(fetchTrendingPosts({ page: 1, limit: 10 })).then((res) => {
      if (res.meta.requestStatus === "rejected") {
        toast({
          title: "Failed to load data.",
          duration: 2000,
          className: "bg-[#09090B] text-[#e2e2e2] border-none ",
        });
      }
    });
  }, [dispatch]);

  return trending.loading ? (
    <div className="flex justify-center">
      <Loader className=" animate-spin my-4 text-white" />
    </div>
  ) : (
    <InfiniteScroll
      className="mt-0 flex flex-col gap-2"
      dataLength={trendingPosts.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<Loader className="animate-spin text-white scroll" />}
    >
      {trendingPosts.map((post, index) => {
        if (post.community === null) {
          return (
            <PostCard
              optionsVisibility={false}
              type="trending"
              key={`${post._id}${index}`}
              post={post}
            />
          );
        } else {
          return (
            <CommunityPostCard
              optionsVisibility={false}
              type="trending"
              key={`${post._id}${index}`}
              post={post}
            />
          );
        }
      })}
    </InfiniteScroll>
  );
}

export default TrendingHome;
