import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Loader } from "lucide-react";
import PostCard from "../post/PostCard";
import InfiniteScroll from "react-infinite-scroll-component";
import CommunityPostCard from "../post/CommunityPostCard";
import { useEffect, useState } from "react";
import {
  fetchPostsByUserId,
  fetchUpdatedPostsByUserId,
} from "@/features/authorprofile/postSlice";
import { AuthorRedirectData } from "@/types/userTypes";
import { useLocation } from "react-router-dom";

function UserPostTab() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const postData = useAppSelector((state) => state.author.post);
  const userPosts = useAppSelector((state) => state.author.post.posts);
  const data: AuthorRedirectData = location.state;
  const [hasMore, setHasMore] = useState<boolean>(true);

  const [state, setState] = useState({
    page: 1,
    limit: 10,
  });

  const fetchMoreData = () => {
    dispatch(
      fetchUpdatedPostsByUserId({
        id: data.id,
        data: { page: state.page + 1, limit: state.limit },
      })
    );
    if (state.page < postData.totalPages!) {
      setHasMore(true);
      setState({ ...state, page: state.page + 1 });
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    dispatch(
      fetchPostsByUserId({
        id: data.id,
        data: {
          page: 1,
          limit: 10,
        },
      })
    );
  }, [dispatch, data.id]);
  return postData.loading ? (
    <div className="flex justify-center">
      <Loader className=" animate-spin my-4 text-white" />
    </div>
  ) : (
    <InfiniteScroll
      className="mt-0 flex flex-col gap-2"
      dataLength={userPosts.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<Loader className="animate-spin text-white scroll" />}
    >
      {userPosts.map((post) => {
        if (post.community === null) {
          return (
            <PostCard
              optionsVisibility={false}
              type="latest"
              key={`${post._id}`}
              post={post}
            />
          );
        } else {
          return (
            <CommunityPostCard
              optionsVisibility={false}
              type="latest"
              key={`${post._id}`}
              post={post}
            />
          );
        }
      })}
    </InfiniteScroll>
  );
}

export default UserPostTab;
