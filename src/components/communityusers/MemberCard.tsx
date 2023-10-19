import { MemberUser } from "@/types/userTypes";
import { CustomAvatar } from "../common/CustomAvatar";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useAppSelector } from "@/app/hooks";

function MemberCard({ user }: { user: MemberUser }) {
  const { _id, firstName, lastName, userName, profilePic, isFollowing } = user;
  const currentUserId = useAppSelector((state) => state.user._id);
  return (
    <Card className="w-full bg-[#27272a] text-white">
      <CardContent className="p-4 flex justify-between">
        <div className="flex gap-x-3 items-center">
          <CustomAvatar src={profilePic} fallBack={"A"} />
          <div className="flex flex-col justify-start">
            <p className="text-white opacity-70 text-base font-semibold">
              {firstName + " " + lastName}
            </p>
            <p className="text-white opacity-60 text-base -my-1">
              {"@" + userName}
            </p>
          </div>
        </div>
        {_id === currentUserId ? null : (
          <ActionButton isFollowing={isFollowing} />
        )}
      </CardContent>
    </Card>
  );
}

function ActionButton({ isFollowing }: { isFollowing: boolean }) {
  return isFollowing ? (
    <Button variant={"default"}>Unfollow</Button>
  ) : (
    <Button variant={"secondary"}>Follow</Button>
  );
}

export default MemberCard;