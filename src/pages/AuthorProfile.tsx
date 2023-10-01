import { useAppDispatch, useAppSelector } from "@/app/hooks";
import AuthorCoverSection from "@/components/authorprofile/AuthorCoverSection";
import { AuthorProfileTab } from "@/components/authorprofile/AuthorProfileTab";
import { fetchAuthorData } from "@/features/authorprofile/infoSlice";
import { fetchPostsByUserId } from "@/features/authorprofile/postSlice";
import { AuthorRedirectData } from "@/types/userTypes";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function AuthorProfile() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const data: AuthorRedirectData = location.state;
  useEffect(() => {
    dispatch(fetchAuthorData(data.id));
    dispatch(fetchPostsByUserId(data.id))
  }, [dispatch, data.id]);
  const author = useAppSelector((state) => state.author.info);
  return (
    <div className="w-full flex flex-col flex-1 items-center p-4 gap-y-2 overflow-auto text-white">
      <div className="xl:w-2/5 lg:w-3/5 md:w-4/5 w-full p-2 flex gap-2">
        <AuthorCoverSection user={author} />
      </div>
      <AuthorProfileTab />
    </div>
  );
}

export default AuthorProfile;
