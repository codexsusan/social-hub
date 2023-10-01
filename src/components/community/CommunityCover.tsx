import { useAppDispatch, useAppSelector } from "@/app/hooks";
import ProfileImage from "../common/ProfileImage";
import { Button } from "../ui/button";
import CommunityProfilePictureUpdate from "./CommunityProfilePictureUpdate";
import {
  joinCommunity,
  leaveCommunity,
} from "@/features/community/communityInfo";

function CommunityCover() {
  const home = useAppSelector((state) => state.community.home.info);
  const { icon_image, isMember, displayName, name, _id } = home;
  const dispatch = useAppDispatch();
  const handleLeaveCommunity = () => {
    dispatch(leaveCommunity(_id));
  };
  const handleJoinCommunity = () => {
    dispatch(joinCommunity(_id));
  };

  return (
    <div className="xl:w-2/5 lg:w-3/5 md:w-4/5 w-full p-2 flex gap-2">
      <div className="w-full bg-gradient-to-br from-cyan-500 to-blue-500 h-40 relative">
        <div className="absolute left-4 bottom-2 flex place-items-end gap-x-4 w-full">
          <div className="w-28 h-28 bg-black rounded-full overflow-hidden relative">
            <CommunityProfilePictureUpdate />
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
