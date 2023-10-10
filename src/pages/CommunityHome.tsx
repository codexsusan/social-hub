import { useAppDispatch, useAppSelector } from "@/app/hooks";
import PageWrapper from "@/components/common/PageWrapper";
import CommunityCover from "@/components/community/CommunityCover";
import CommunityHomeTab from "@/components/community/CommunityHomeTab";
import CreatePost from "@/components/home/CreatePost";
import { Button } from "@/components/ui/button";
import { fetchCommunityById } from "@/features/community/communityInfo";
import { BoxesIcon, Lock, Unlock } from "lucide-react";
import { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

function CommunityHome() {
  const { communityId } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCommunityById(communityId));
  }, [dispatch, communityId]);
  return (
    <PageWrapper
      LeftContent={<LeftContent />}
      RightContent={<RightContent />}
    />
  );
}

function LeftContent() {
  return (
    <div className="flex flex-col gap-4">
      <CommunityCover />
      <CreatePost />
      <CommunityHomeTab />
    </div>
  );
}

function RightContent() {
  const communityInfo = useAppSelector((state) => state.community.home.info);
  const navigate = useNavigate();
  return (
    <div className="relative rounded-md top-20 w-full bg-[#111111] overflow-hidden">
      <div className="p-5 flex items-center justify-between gap-x-2 bg-[#202020] border-b border-[#2B2B2B]">
        <div className="flex items-center gap-x-4">
          <BoxesIcon />
          <p className="text-lg font-semibold">{communityInfo.displayName}</p>
        </div>
        <div className="">
          {communityInfo.community_type === "public" && (
            <div className="flex items-center gap-x-2">
              <Unlock className="h-4 w-4" />
              <p className="text-lg font-medium">Public</p>
            </div>
          )}
          {communityInfo.community_type === "private" && (
            <div className="flex items-center gap-x-2">
              <Lock className="h-4 w-4" />
              <p className="text-lg font-semibold">Private</p>
            </div>
          )}
        </div>
      </div>
      <div className="p-5 flex flex-col gap-2 w-full">
        <p className="text-lg ">{communityInfo.description}</p>
        <div className="flex flex-col mt-2 gap-4">
          <div className="text-white flex justify-between">
            <p>Memebers</p>
            <p>{communityInfo.member_count}</p>
          </div>
        </div>
        <div className="w-full">
          <Button
            variant="secondary"
            onClick={() => navigate("/c/create")}
            className="mt-5 w-full"
          >
            View Members
          </Button>
          <Button
            onClick={() => navigate(`/c/${communityInfo._id}/settings`)}
            variant="secondary"
            className="mt-5 w-full"
          >
            Manage Community
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CommunityHome;
