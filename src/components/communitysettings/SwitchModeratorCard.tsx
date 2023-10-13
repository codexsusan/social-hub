import { SuperUser } from "@/types/userTypes";
import { CustomAvatar } from "../common/CustomAvatar";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { MouseEventHandler } from "react";
import { useAppDispatch } from "@/app/hooks";
import {
  promoteToModerator,
  promoteToModeratorSuccess,
} from "@/features/communitysettings/manageSlice";
import { useParams } from "react-router-dom";
import { hasProperty } from "@/utils/generalUtils";

function SwitchModeratorCard({ user }: { user: SuperUser }) {
  const {
    firstName,
    lastName,
    userName,
    profilePic,
    isAdmin,
  } = user;
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
        {isAdmin ? null : <ActionButton user={user} />}
      </CardContent>
    </Card>
  );
}

function ActionButton({ user }: { user: SuperUser }) {
  const { _id, isModerator } = user;
  const dispatch = useAppDispatch();
  const { communityId } = useParams<{ communityId: string }>();

  const promoteToModeratorCB: MouseEventHandler = (e) => {
    e.preventDefault();
    dispatch(promoteToModerator({ communityId, userId: _id })).then((res) => {
      if (hasProperty(res.payload, "data")) {
        dispatch(promoteToModeratorSuccess(_id));
      }
    });
  };
  // TODO: API call also not done
  const demoteToUserCB: MouseEventHandler = (e) => {
    e.preventDefault();
  };

  return isModerator ? (
    <Button onClick={demoteToUserCB} variant={"default"}>
      Remove
    </Button>
  ) : (
    <Button onClick={promoteToModeratorCB} variant={"secondary"}>
      Promote
    </Button>
  );
}

export default SwitchModeratorCard;
