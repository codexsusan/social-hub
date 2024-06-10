import { MemberUser } from "@/types/userTypes";
import { CustomAvatar } from "../common/CustomAvatar";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useAppSelector } from "@/app/hooks";

function MemberCard({ user }: { user: MemberUser }) {
  const { _id, firstName, lastName, userName, profilePic, isFollowing } = user;
  const currentUserId = useAppSelector((state) => state.user._id);
  return (
    <Card className="w-full bg-[#F2F7F8] ">
      <CardContent className="p-4 flex justify-between">
        <div className="flex gap-x-3 items-center">
          <CustomAvatar src={profilePic} fallBack={"A"} />
          <div className="flex flex-col justify-start">
            <p className=" opacity-60 text-base font-semibold">
              {firstName + " " + lastName}
            </p>
            <p className=" opacity-60 text-base -my-1">
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
    <Button variant={"outline"}>Unfollow</Button>
  ) : (
    <Button variant={"default"}>Follow</Button>
  );
}

export default MemberCard;
