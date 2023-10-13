import { MemberUser } from "@/types/userTypes";
import { CustomAvatar } from "../common/CustomAvatar";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

function SwitchModeratorCard({ user }: { user: MemberUser }) {
  const {  firstName, lastName, userName, profilePic, isFollowing } = user;
  return (
    <Card className="w-full bg-[#27272a] text-white">
      <CardContent className="p-4 flex justify-between">
        <div className="flex gap-x-3 items-center">
          <CustomAvatar src={profilePic} fallBack={firstName.charAt(0)} />
          <div className="flex flex-col justify-start">
            <p className="text-white opacity-70 text-base font-semibold">
              {firstName + " " + lastName}
            </p>
            <p className="text-white opacity-60 text-base -my-1">
              {"@" + userName}
            </p>
          </div>
        </div>
        <ActionButton isFollowing={isFollowing} />
      </CardContent>
    </Card>
  );
}

function ActionButton({ isFollowing }: { isFollowing: boolean }) {
  return isFollowing ? (
    <Button variant={"default"}>Remove</Button>
  ) : (
    <Button variant={"secondary"}>Promote</Button>
  );
}

export default SwitchModeratorCard;
