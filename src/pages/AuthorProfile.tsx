import { useAppDispatch, useAppSelector } from "@/app/hooks";
import AuthorCoverSection from "@/components/authorprofile/AuthorCoverSection";
import AuthorPostTab from "@/components/authorprofile/AuthorPostTab";
import { CustomAvatar } from "@/components/common/CustomAvatar";
import PageWrapper from "@/components/common/PageWrapper";
import { fetchAuthorData } from "@/features/authorprofile/infoSlice";
import { AuthorRedirectData } from "@/types/userTypes";
import { Loader2, User2 } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function AuthorProfile() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const data: AuthorRedirectData = location.state;
  useEffect(() => {
    dispatch(fetchAuthorData(data.id));
  }, [dispatch, data.id]);

  return (
    <PageWrapper
      className="mt-8"
      LeftContent={<LeftContent />}
      RightContent={<RightContent />}
    />
  );
}

function LeftContent() {
  const author = useAppSelector((state) => state.author.info);
  return (
    <div className="flex flex-col gap-4 w-full ">
      {author.loading ? (
        <Loader2 className="animate-spin text-blue-600 h-16 my-4 w-full text-center" />
      ) : (
        <>
          <AuthorCoverSection user={author} />
          <AuthorPostTab />
        </>
      )}
    </div>
  );
}

function RightContent() {
  const author = useAppSelector((state) => state.author.info);
  return (
    <div className="relative rounded-md top-20 w-full bg-[#F2F7F8] overflow-hidden">
      <div className="p-5 flex items-center gap-x-2 bg-[#eef2f3] border-b border-[#2B2B2B]">
        <User2 className="" />
        <p className="text-lg font-semibold">
          {author.firstName?.charAt(0).toUpperCase() + author.firstName!.slice(1)}{" "}
          Profile
        </p>
      </div>
      <div className=" grid grid-cols-1 p-2 divide-y divide-zinc-500">
        <div className="w-full flex justify-between p-4 items-center">
          <p className=" font-medium">Avatar</p>
          <CustomAvatar src={author.profilePic} />
        </div>
        <div className="w-full flex justify-between p-4">
          <p className=" font-medium">Fullname</p>
          <p>{author.firstName + " " + author.lastName}</p>
        </div>
        <div className="w-full flex justify-between p-4">
          <p className="font-medium">Username</p>
          <div>
            <p>{"@" + author.userName}</p>
          </div>
        </div>
        <div className="w-full flex justify-between p-4">
          <p className=" font-medium">Gender</p>
          <p>
            {author.gender!.charAt(0).toUpperCase() + author.gender!.slice(1)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthorProfile;
