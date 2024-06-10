import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchSearchPost } from "@/features/searchpage/searchPostSlice";
import { useEffect } from "react";
import PostCard from "../post/PostCard";
import CommunityPostCard from "../post/CommunityPostCard";

function PostSearch() {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.search.searchInfo);
  const searchResult = useAppSelector((state) => state.search.searchPost);
  useEffect(() => {
    const data = {
      query: searchQuery.searchQuery,
    };
    dispatch(fetchSearchPost(data));
  }, [dispatch, searchQuery.searchQuery]);
  return (
    <div className="flex flex-col gap-y-2 mt-0 flex-1">
      {searchResult.posts.length === 0 && (
        <div className="w-full flex justify-center text-xl my-4 font-semibold">No Post Found</div>
      )}
      {searchResult.posts.map((post) => {
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
    </div>
  );
}

export default PostSearch;
