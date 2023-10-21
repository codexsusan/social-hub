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
  const bookmark = useAppSelector((state) => state.profile.bookmarks);
  const bookmarkPosts = useAppSelector(
    (state) => state.profile.bookmarks.posts
  );
  const [hasMore, setHasMore] = useState<boolean>(true);

  const [state, setState] = useState({
    page: 1,
    limit: 10,
  });

  const fetchMoreData = () => {
    dispatch(getUpdatedBookmarks({ page: state.page + 1, limit: state.limit }));

    // TODO: Issue with the api
    if (state.page < bookmark.totalPages!) {
      setHasMore(true);
      setState({ ...state, page: state.page + 1 });
    } else {
      setHasMore(false);
    }
  };
  useEffect(() => {
    dispatch(getBookmarks({ page: 1, limit: 10 }));
    if(bookmarkPosts.length === 0) {
      setHasMore(false);
    }
  }, [dispatch, bookmarkPosts]);
  return bookmark.loading ? (
    <div className="flex justify-center">
      <Loader className=" animate-spin my-4" />
    </div>
  ) : (
    <InfiniteScroll
      className="mt-0 flex flex-col gap-2"
      dataLength={bookmarkPosts.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<Loader className="animate-spin text-white scroll" />}
    >
      {bookmarkPosts.map((post, index) => {
        if (post.author!._id === post.community_id) {
          return (
            <PostCard
              optionsVisibility={false}
              type="profile-bookmark"
              key={`${post._id}${index}`}
              post={post}
            />
          );
        } else {
          return (
            <CommunityPostCard
              optionsVisibility={false}
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
