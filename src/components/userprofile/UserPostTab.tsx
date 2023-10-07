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

  const fetchMoreData = () => {
    dispatch(getUpdatedPostsByUser({ page: state.page, limit: state.limit }));
    // TODO: Handle hasMore check
    setState({ ...state, page: state.page + 1 });
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
      className="mt-0 no-scrollbar flex flex-col gap-2"
      dataLength={userPosts.length}
      next={fetchMoreData}
      hasMore={true}
      loader={<Loader className="animate-spin text-white scroll" />}
    >
      {userPosts.map((post, index) => {
        if (post.community === null) {
          return (
            <PostCard
              type="profile-post"
              key={`${post._id}${index}`}
              post={post}
            />
          );
        } else {
          return (
            <CommunityPostCard
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
