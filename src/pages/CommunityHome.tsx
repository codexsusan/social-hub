import { useAppDispatch, useAppSelector } from "@/app/hooks";
import CommunityCover from "@/components/community/CommunityCover";
import CommunityHomeTab from "@/components/community/CommunityHomeTab";
import CreatePost from "@/components/home/CreatePost";
import CommunityHomeSkeleton from "@/components/skeleton/CommunityHomeSkeleton";
import { fetchCommunityById } from "@/features/community/communityInfo";
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
  return (
    <div className="w-full flex flex-col flex-1 items-center p-4 gap-y-2 overflow-auto text-white">
      <CommunityCover />
      <CreatePost />
      <CommunityHomeTab />
    </div>
  );
}

export default CommunityHome;
