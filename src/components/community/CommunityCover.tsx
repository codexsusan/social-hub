import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  fetchCommunityById,
  joinCommunity,
  leaveCommunity,
} from "@/features/community/communityInfo";
import ProfileImage from "../common/ProfileImage";
import { Button } from "../ui/button";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function CommunityCover() {
  const { communityId } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCommunityById(communityId));
  }, [dispatch, communityId]);

  const home = useAppSelector((state) => state.community.home.info);
  const { icon_image, isMember, displayName, name, _id } = home;
  
  const handleLeaveCommunity = () => {
    dispatch(leaveCommunity(_id));
  };
  const handleJoinCommunity = () => {
    dispatch(joinCommunity(_id));
  };

  return (
    <div className="w-full flex gap-2 items-center bg-[#030303] flex-col">
      <div className="w-full bg-gradient-to-br from-cyan-500 to-blue-500 h-40 relative">
        <div className="absolute left-4 bottom-2 flex place-items-end gap-x-4 w-full">
          <div className="w-28 h-28 bg-black rounded-full overflow-hidden relative">
            {/* Keep this in community setting section */}
            {/* <CommunityProfilePictureUpdate /> */}
            <ProfileImage src={icon_image} />
          </div>
          <div className=" flex justify-between mb-3 flex-grow mr-10">
            <div>
              <div className="text-xl font-semibold">{displayName}</div>
              <div className="">{"c/" + name}</div>
            </div>
            <div className="flex gap-x-2">
              {isMember ? (
                <Button onClick={handleLeaveCommunity} className="self-end">
                  Leave
                </Button>
              ) : (
                <Button onClick={handleJoinCommunity} className="self-end">
                  Join
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityCover;
