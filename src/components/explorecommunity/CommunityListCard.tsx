import { useNavigate } from "react-router-dom";
import ProfileImage from "../common/ProfileImage";
import { Button } from "../ui/button";
import { PartialCommunity } from "@/types/communityTypes";

function CommunityListCard(props: { community: PartialCommunity }) {
  const { community } = props;
  const navigate = useNavigate();
  const handleCommunityNavigation = () => {
    navigate(`/c/${community._id}`);
  };
  const handleLeaveCommunity = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Check for the error
  };
  return (
    <div
      onClick={handleCommunityNavigation}
      className="w-full border border-slate-600 rounded-md cursor-pointer overflow-hidden"
    >
      <div className="w-full bg-gradient-to-br from-cyan-500 to-blue-500 h-40 relative rounded-t-md">
        <div className="absolute ml-4 bottom-2 flex place-items-end gap-x-4 w-full">
          <div className="w-28 h-28 bg-black rounded-full overflow-hidden relative shrink-0">
            <ProfileImage src={community.icon_image} />
          </div>
          <div className="flex items-end justify-between mb-3 w-full  mr-10">
            <div>
              <div className="text-xl font-semibold">
                {community.displayName}
              </div>
              <div className="">{"c/" + community.name}</div>
            </div>
            <div className="gap-x-2 shrink-0">
              <Button onClick={handleLeaveCommunity} className="self-end">
                Leave
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 text-lg text-slate-300">{community.description}</div>
    </div>
  );
}

export default CommunityListCard;
