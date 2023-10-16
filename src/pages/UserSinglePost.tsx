import { useAppDispatch, useAppSelector } from "@/app/hooks";
import CustomOutput from "@/components/common/CustomOutput";
import PageWrapper from "@/components/common/PageWrapper";
import UserPostWrapper from "@/components/common/UserPostWrapper";
import { Separator } from "@/components/ui/separator";
import ActionButtons from "@/components/usersinglepost/ActionButtons";
import CommentSection from "@/components/usersinglepost/CommentSection";
import CommentTextArea from "@/components/usersinglepost/CommentTextArea";
import { fetchSinglePost } from "@/features/usersinglepost/usersinglepostslice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function UpdatedSinglePost() {
  return (
    <PageWrapper
      LeftContent={<LeftContent />}
      RightContent={<RightContent />}
    />
  );
}

function LeftContent() {
  const { postId } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchSinglePost(postId));
  }, [dispatch, postId]);

  const postData = useAppSelector((state) => state.usersinglepost.post);

  const content = JSON.parse(postData!.content!);

  return (
    <div className="mt-4 flex justify-center">
      <div className="w-3/4 rounded-sm bg-[#27272a]  flex gap-5 flex-col text-white p-4 cursor-pointer hover:bg-[#1e1e1e]">
        <UserPostWrapper post={postData} type="post">
          <div className="text-base mt-2 space-y-4 w-full">
            <div className="text-xl font-semibold mb-2">{postData.title}</div>
            
            <CustomOutput content={content} />
            <ActionButtons />
          </div>
        </UserPostWrapper>
        <Separator className="bg-slate-900/50 h-1" orientation="horizontal" />
        <CommentTextArea />
        <Separator className="bg-slate-900/50 h-1" orientation="horizontal" />
        <CommentSection />
      </div>
    </div>
  );
}

function RightContent() {
  return <div className="mt-4">Right Content</div>;
}

export default UpdatedSinglePost;
