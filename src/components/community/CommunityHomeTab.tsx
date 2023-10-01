import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchAllPostsByCommunity } from "@/features/community/communityPost";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PostCard from "../post/PostCard";
import PostSectionWrapper from "../common/PostSectionWrapper";

function CommunityHomeTab() {
  const dispatch = useAppDispatch();
  const { communityId } = useParams();
  useEffect(() => {
    dispatch(fetchAllPostsByCommunity(communityId!));
  }, [dispatch, communityId]);
  const posts = useAppSelector((state) => state.community.home.posts.posts);
  return (
    <PostSectionWrapper>
      {posts.length === 0 && (
        <div className="text-xl text-center font-semibold ">No Posts Found</div>
      )}
      {posts.map((post) => {
        return <PostCard key={post._id} post={post} type="community-home" />;
      })}
    </PostSectionWrapper>
  );
}

export default CommunityHomeTab;
