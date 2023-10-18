import { useAppDispatch, useAppSelector } from "@/app/hooks";
import AuthorCoverSection from "@/components/authorprofile/AuthorCoverSection";
import AuthorPostTab from "@/components/authorprofile/AuthorPostTab";
import PageWrapper from "@/components/common/PageWrapper";
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
    <div className="flex flex-col gap-4">
      <AuthorCoverSection user={author} />
      <AuthorPostTab />
    </div>
  );
}

function RightContent() {
  return <>Right Content</>;
}

export default AuthorProfile;
