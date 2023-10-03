import { useAppDispatch, useAppSelector } from "@/app/hooks";
import PostSectionWrapper from "@/components/common/PostSectionWrapper";
import CommunityCover from "@/components/community/CommunityCover";
import CommunityHomeTab from "@/components/community/CommunityHomeTab";
import CreatePost from "@/components/home/CreatePost";
import CommunityHomeSkeleton from "@/components/skeleton/CommunityHomeSkeleton";
import { fetchCommunityById } from "@/features/community/communityInfo";
import { Lock } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function CommunityHome() {
  const { communityId } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCommunityById(communityId));
  }, [dispatch, communityId]);
  const loadingStatus = useAppSelector(
    (state) => state.community.home.info.loading
  );
  const userLoadingStatus = useAppSelector((state) => state.user.loading);
  return loadingStatus && userLoadingStatus ? (
    <CommunityHomeSkeleton />
  ) : (
    <ViewScreen />
  );
}

function ViewScreen() {
  const communityInfo = useAppSelector((state) => state.community.home.info);
  const isPublic = communityInfo.community_type === "public" ? true : false;
  // TODO: Check for admin and make the necessary changes
  const { isMember } = communityInfo;
  return (
    <div className="w-full flex flex-col flex-1 items-center p-4 gap-y-2 overflow-auto bg-[#030303]">
      <CommunityCover />
      {isPublic ? (
        <>
          <CreatePost />
          <CommunityHomeTab />
        </>
      ) : isMember ? (
        <>
          <CreatePost />
          <CommunityHomeTab />
        </>
      ) : (
        <PostSectionWrapper>
          <div className="text-center text-lg font-medium flex justify-center items-center gap-x-2">
            <Lock width={20} /> Community is private
          </div>
        </PostSectionWrapper>
      )}
    </div>
  );
}

export default CommunityHome;
