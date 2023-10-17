import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  getBookmarks,
  getUpdatedBookmarks,
} from "@/features/profile/bookmarkSlice";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CommunityPostCard from "../post/CommunityPostCard";
import PostCard from "../post/PostCard";

function BookmarkTab() {
  const dispatch = useAppDispatch();
  const postData = useAppSelector((state) => state.profile.bookmarks);
  const bookmarkPosts = useAppSelector(
    (state) => state.profile.bookmarks.posts
  );

  const [state, setState] = useState({
    page: 1,
    limit: 10,
  });

  const fetchMoreData = () => {
    dispatch(getUpdatedBookmarks({ page: state.page, limit: state.limit }));
    // TODO: Handle hasMore check
    setState({ ...state, page: state.page + 1 });
  };
  useEffect(() => {
    dispatch(getBookmarks({ page: 1, limit: 10 }));
  }, [dispatch]);
  return postData.loading ? (
    <div className="flex justify-center">
      <Loader className=" animate-spin my-4" />
    </div>
  ) : (
    <InfiniteScroll
      className="mt-0 flex flex-col gap-2"
      dataLength={bookmarkPosts.length}
      next={fetchMoreData}
      hasMore={true}
      loader={<Loader className="animate-spin text-white scroll" />}
    >
      {bookmarkPosts.map((post, index) => {
        if (post.author!._id === post.community_id) {
          return (
            <PostCard
              type="profile-bookmark"
              key={`${post._id}${index}`}
              post={post}
            />
          );
        } else {
          return (
            <CommunityPostCard
              type="profile-bookmark"
              key={`${post._id}${index}`}
              post={post}
            />
          );
        }
      })}
    </InfiniteScroll>
  );
}

export default BookmarkTab;
