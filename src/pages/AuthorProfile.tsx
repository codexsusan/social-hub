import { useAppDispatch, useAppSelector } from "@/app/hooks";
import AuthorCoverSection from "@/components/authorprofile/AuthorCoverSection";
import AuthorPostTab from "@/components/authorprofile/AuthorPostTab";
import { fetchAuthorData } from "@/features/authorprofile/infoSlice";
import { AuthorRedirectData } from "@/types/userTypes";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function AuthorProfile() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const data: AuthorRedirectData = location.state;
  useEffect(() => {
    dispatch(fetchAuthorData(data.id));
  }, [dispatch, data.id]);

  const author = useAppSelector((state) => state.author.info);
  return (
    <div className="w-full flex flex-col flex-1 items-center p-4 gap-y-2 overflow-auto text-white bg-[#030303]">
      <div className="xl:w-2/5 lg:w-3/5 md:w-4/5 w-full p-2 flex gap-2">
        <AuthorCoverSection user={author} />
      </div>
      <div className="xl:w-2/5 lg:w-3/5 md:w-4/5 w-full p-2  flex flex-col gap-2 flex-1">
        <AuthorPostTab />
      </div>
    </div>
  );
}

export default AuthorProfile;
