import { useAppDispatch } from "@/app/hooks";
import {
  joinCommunity,
  leaveCommunity,
} from "@/features/community/communityInfo";
import {
  joinCommunitySuccess,
  leaveCommunitySuccess,
} from "@/features/explore-community/exploreSlice";
import { CommunityJoinStatus, PartialCommunity } from "@/types/communityTypes";
import { hasProperty } from "@/utils/generalUtils";
import { useNavigate } from "react-router-dom";
import ProfileImage from "../common/ProfileImage";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";

function CommunityListCard({ community }: { community: PartialCommunity }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    _id,
    icon_image,
    displayName,
    name: communityName,
    description,
    // isMember,
    joinStatus,
  } = community;

  const handleCommunityNavigation = () => {
    navigate(`/c/${_id}`);
  };

  const handleJoinCommunity = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(joinCommunity(_id)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(joinCommunitySuccess(_id));
        if (hasProperty(res.payload, "data")) {
          if (community.isMember) {
            toast({
              title: res.payload.data.message,
              variant: "default",
              duration: 1000,
            });
          }
        }
      }
    });
  };
  const handleLeaveCommunity = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(leaveCommunity(_id)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(leaveCommunitySuccess(_id));
        if (hasProperty(res.payload, "data")) {
          toast({
            title: res.payload.data.message,
            variant: "destructive",
            duration: 1000,
          });
        }
      }
    });
  };
  return (
    <div
      onClick={handleCommunityNavigation}
      className="w-full border border-slate-600 rounded-md cursor-pointer overflow-hidden"
    >
      <div className="w-full bg-gradient-to-br from-cyan-500 to-blue-500 h-40 relative rounded-t-md">
        <div className="absolute ml-4 bottom-2 flex place-items-end gap-x-4 w-full">
          <div className="w-28 h-28 bg-black rounded-full overflow-hidden relative shrink-0">
            <ProfileImage src={icon_image} />
          </div>
          <div className="flex items-end justify-between mb-3 w-full  mr-10">
            <div>
              <div className="text-xl font-semibold">{displayName}</div>
              <div className="">{"c/" + communityName}</div>
            </div>
            <div className="gap-x-2 shrink-0">
              {/* {joinStatus === CommunityJoinStatus.JOINED ? (
                <Button onClick={handleLeaveCommunity} className="self-end">
                  Leave
                </Button>
              ) : joinStatus === CommunityJoinStatus.NOTJOINED ? (
                <Button onClick={handleJoinCommunity} className="self-end">
                  Join
                </Button>
              ) : (
                <Button onClick={handleJoinCommunity} className="self-end">
                  Requested
                </Button>
              )} */}
              {joinStatus === CommunityJoinStatus.JOINED && (
                <Button onClick={handleLeaveCommunity} className="self-end">
                  Leave
                </Button>
              )}
              {joinStatus === CommunityJoinStatus.NOTJOINED && (
                <Button onClick={handleJoinCommunity} className="self-end">
                  Join
                </Button>
              )}
              {joinStatus === CommunityJoinStatus.REQUESTED && (
                <Button onClick={handleJoinCommunity} className="self-end">
                  Requested
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 text-lg text-slate-300">{description}</div>
    </div>
  );
}

export default CommunityListCard;
