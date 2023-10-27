import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  fetchMostViewedPosts,
  fetchUpdatedMostViewedPosts,
} from "@/features/home/mostviewedSlice";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CommunityPostCard from "../post/CommunityPostCard";
import PostCard from "../post/PostCard";
import { toast } from "../ui/use-toast";

function MostViewedHome() {
  const dispatch = useAppDispatch();
  const mostviewed = useAppSelector((state) => state.home.mostviewed);
  const mostviewedPosts = useAppSelector(
    (state) => state.home.mostviewed.posts
  );

  const [hasMore, setHasMore] = useState<boolean>(true);

  const [state, setState] = useState({
    page: 1,
    limit: 10,
  });

  const fetchMoreData = () => {
    dispatch(
      fetchUpdatedMostViewedPosts({ page: state.page + 1, limit: state.limit })
    );
    if (state.page < mostviewed.totalPages!) {
      setHasMore(true);
      setState({ ...state, page: state.page + 1 });
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    dispatch(fetchMostViewedPosts({ page: 1, limit: 10 })).then((res) => {
      if (res.meta.requestStatus === "rejected") {
        toast({
          title: "Failed to load data.",
          duration: 2000,
          className: "bg-[#09090B] text-[#e2e2e2] border-none ",
        });
      }
    });
  }, [dispatch]);
  return mostviewed.loading ? (
    <div className="flex justify-center">
      <Loader className=" animate-spin my-4 text-black" />
    </div>
  ) : (
    <InfiniteScroll
      className="mt-0 flex flex-col gap-2"
      dataLength={mostviewedPosts.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<Loader className="animate-spin text-white scroll" />}
    >
      {mostviewedPosts.map((post, index) => {
        if (post.community === null) {
          return (
            <PostCard
              optionsVisibility={false}
              type="most-viewed"
              key={`${post._id}${index}`}
              post={post}
            />
          );
        } else {
          return (
            <CommunityPostCard
              optionsVisibility={false}
              type="most-viewed"
              key={`${post._id}${index}`}
              post={post}
            />
          );
        }
      })}
    </InfiniteScroll>
  );
}

export default MostViewedHome;
