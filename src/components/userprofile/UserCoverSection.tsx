import { Camera } from "lucide-react";
import PageLoading from "../common/PageLoading";
import ProfileImage from "../common/ProfileImage";
import { MultiUserType } from "@/types/userTypes";
import ModalWindow from "../common/ModalWindow";

type Props = {
  user: MultiUserType;
};

function UserCoverSection(props: Props) {
  const { user } = props;
  return user.loading ? (
    <PageLoading className="my-12" />
  ) : (
    <>
      <UserCover {...props} />
    </>
  );
}

function UserCover(props: Props) {
  const { user } = props;
  return (
    <div className="w-full bg-gradient-to-br from-cyan-500 to-blue-500 h-40 relative">
      <div className="absolute left-4 bottom-2 flex place-items-end gap-x-4">
        <div className="w-28 h-28 bg-black rounded-full overflow-hidden relative">
          <ModalWindow>
            <div className="absolute right-4 bottom-4 bg-black rounded-full p-1 cursor-pointer">
              <Camera />
            </div>
          </ModalWindow>
          <ProfileImage src={user.profilePic} />
        </div>
        <div className="mb-4">
          <div className="text-xl font-semibold">
            {user.firstName + " " + user.lastName}
          </div>
          <div className="">{"@" + user.userName}</div>
        </div>
      </div>
    </div>
  );
}

export default UserCoverSection;
