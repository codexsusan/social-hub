import { useNavigate } from "react-router-dom";
import ProfileImage from "../common/ProfileImage";
import { Button } from "../ui/button";

function CommunityListCard() {
  const navigate = useNavigate();
  const communityId = "6514788c8b6fefea4064d854";
  const handleCommunityNavigation = () => {
    navigate(`/c/${communityId}`);
  };
  return (
    <div
      onClick={handleCommunityNavigation}
      className=" border border-slate-600 rounded-md cursor-pointer"
    >
      <div className="w-full bg-gradient-to-br from-cyan-500 to-blue-500 h-40 relative rounded-t-md">
        <div className="absolute ml-4 bottom-2 flex place-items-end gap-x-4 w-full">
          <div className="w-28 h-28 bg-black rounded-full overflow-hidden relative">
            <ProfileImage />
          </div>
          <div className=" flex justify-between mb-3 flex-grow mr-10">
            <div>
              <div className="text-xl font-semibold">name here</div>
              <div className="">{"c/"}communityname</div>
            </div>
            <div className="flex gap-x-2">
              <Button className="self-end">Join</Button>
              <Button className="self-end">Leave</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 text-lg text-slate-300">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate vel
        sit sunt accusamus ut exercitationem eum consequuntur repellendus.
        Consectetur aliquid modi veniam dolores, dolore ex facere iste nam
        maiores natus ab commodi eos!...
      </div>
    </div>
  );
}

export default CommunityListCard;
