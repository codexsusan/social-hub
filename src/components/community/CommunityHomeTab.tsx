
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchAllPostsByCommunity } from "@/features/community/communityPost";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PostCard from "../post/PostCard";

function CommunityHomeTab() {
  const dispatch = useAppDispatch();
  const { communityId } = useParams();
  useEffect(() => {
    dispatch(fetchAllPostsByCommunity(communityId!));
  }, [dispatch, communityId]);
  const posts = useAppSelector((state) => state.community.home.posts.posts);
  return (
    <div className="xl:w-2/5 lg:w-3/5 md:w-4/5 w-full flex gap-2 text-white">
      <div className="bg-[#27272a] p-4 rounded-md w-full">
        {posts.map((post) => {
          return <PostCard post={post} type="community-home" />;
        })}
      </div>
    </div>
  );
}

export default CommunityHomeTab;
