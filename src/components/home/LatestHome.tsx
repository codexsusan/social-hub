import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useEffect, useState } from "react";
import PostCard from "../post/PostCard";

import {
  fetchLatestPosts,
  fetchUpdatedLatestPosts,
} from "@/features/home/latestSlice";
import { Loader } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import CommunityPostCard from "../post/CommunityPostCard";
import { toast } from "../ui/use-toast";

function LatestHome() {
  const dispatch = useAppDispatch();
  const latest = useAppSelector((state) => state.home.latest);
  const latestPosts = useAppSelector((state) => state.home.latest.posts);
  const [state, setState] = useState({
    page: 1,
    limit: 10,
  });

  const fetchMoreData = () => {
    dispatch(fetchUpdatedLatestPosts({ page: state.page, limit: state.limit }));
    // TODO: Handle hasMore check
    setState({ ...state, page: state.page + 1 });
  };
  useEffect(() => {
    dispatch(fetchLatestPosts({ page: 1, limit: 10 })).then((res) => {
      if (res.meta.requestStatus === "rejected") {
        toast({
          title: "Unable to load data",
          duration: 2000,
          className: "bg-[#09090B] text-[#e2e2e2] border-none ",
        });
      }
    });
  }, [dispatch]);

  return latest.loading ? (
    <div className="flex justify-center">
      <Loader className=" animate-spin my-4 text-white" />
    </div>
  ) : (
    <InfiniteScroll
      className="mt-0 no-scrollbar flex flex-col gap-2"
      dataLength={latestPosts.length}
      next={fetchMoreData}
      hasMore={true}
      loader={<Loader className="animate-spin text-white scroll self-center" />}
    >
      {latestPosts.map((post, index) => {
        if (post.community === null) {
          return (
            <PostCard type="latest" key={`${post._id}${index}`} post={post} />
          );
        } else {
          return (
            <CommunityPostCard
              type="latest"
              key={`${post._id}${index}`}
              post={post}
            />
          );
        }
      })}
    </InfiniteScroll>
  );
}

export default LatestHome;
