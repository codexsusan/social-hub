import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  getPostsByUser,
  getUpdatedPostsByUser,
} from "@/features/profile/postSlice";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CommunityPostCard from "../post/CommunityPostCard";
import PostCard from "../post/PostCard";

function UserPostTab() {
  const dispatch = useAppDispatch();
  const postData = useAppSelector((state) => state.profile.posts);
  const userPosts = useAppSelector((state) => state.profile.posts.posts);

  const [state, setState] = useState({
    page: 1,
    limit: 10,
  });
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchMoreData = () => {
    dispatch(
      getUpdatedPostsByUser({ page: state.page + 1, limit: state.limit })
    );
    if (state.page < postData.totalPages!) {
      setHasMore(true);
      setState({ ...state, page: state.page + 1 });
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    dispatch(getPostsByUser({ page: 1, limit: 10 }));
  }, [dispatch]);

  return postData.loading ? (
    <div className="flex justify-center">
      <Loader className=" animate-spin my-4" />
    </div>
  ) : (
    <InfiniteScroll
      className="mt-0 flex flex-col gap-2"
      dataLength={userPosts.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<Loader className="animate-spin text-white scroll" />}
    >
      {userPosts.map((post, index) => {
        if (post.community === null) {
          return (
            <PostCard
              optionsVisibility={false}
              type="profile-post"
              key={`${post._id}${index}`}
              post={post}
            />
          );
        } else {
          return (
            <CommunityPostCard
              optionsVisibility={false}
              type="profile-post"
              key={`${post._id}${index}`}
              post={post}
            />
          );
        }
      })}
    </InfiniteScroll>
  );
}

export default UserPostTab;
