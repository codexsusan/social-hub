import { MemberUser } from "@/types/userTypes";
import { CustomAvatar } from "../common/CustomAvatar";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

function MemberCard({ user }: { user: MemberUser }) {
  return (
    <Card className="w-full bg-[#27272a] text-white">
      <CardContent className="p-4 flex justify-between">
        <div className="flex gap-x-3 items-center">
          <CustomAvatar
            src={user.profilePic}
            fallBack={user.firstName.charAt(0)}
          />
          <div className="flex flex-col justify-start">
            <p className="text-white opacity-70 text-base font-semibold">
              {user.firstName + " " + user.lastName}
            </p>
            <p className="text-white opacity-60 text-base -my-1">
              {"@" + user.userName}
            </p>
          </div>
        </div>
          <Button variant={"secondary"}>Follow</Button>
        {/* <div>
        </div> */}
      </CardContent>
    </Card>
  );
}

export default MemberCard;
