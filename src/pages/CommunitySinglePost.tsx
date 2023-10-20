import { useAppDispatch, useAppSelector } from "@/app/hooks";
import CustomOutput from "@/components/common/CustomOutput";
import PageWrapper from "@/components/common/PageWrapper";
import CommunityPostWrapper from "@/components/community/CommunityPostWrapper";
import { ActionButtons } from "@/components/communitysinglepost/ActionButtons";
import CommentSection from "@/components/usersinglepost/CommentSection";
import CommentTextArea from "@/components/usersinglepost/CommentTextArea";
import { createCommentOnPost } from "@/features/comment/commentSlice";
import { addcommentCommunitySinglePostSuccess } from "@/features/communitysinglepost/communitysinglepostslice";
import { fetchSinglePost } from "@/features/usersinglepost/usersinglepostslice";
import { hasProperty } from "@/utils/generalUtils";
import { Loader2 } from "lucide-react";
import { MouseEventHandler, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CommunitySinglePost() {
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

  const postData = useAppSelector((state) => state.communitysinglepost.post);

  const commentsData = useAppSelector((state) => state.usersinglepost.comment);

  const content = JSON.parse(postData!.content!);

  const [comment, setComment] = useState("");

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmitComment: MouseEventHandler = (e) => {
    e.preventDefault();
    dispatch(createCommentOnPost({ postId, content: comment })).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        if (hasProperty(res.payload, "data")) {
          const commentData = res.payload.data.data;
          dispatch(addcommentCommunitySinglePostSuccess(commentData));
        }
        setComment("");
      }
    });
  };

  return (
    <div className="mt-4 flex justify-center">
      <div className="w-3/4 rounded-sm bg-[#27272a] flex flex-col divide-y divide-slate-400/90 text-white cursor-pointer hover:bg-[#1e1e1e]">
        {!postData.loading ? (
          <CommunityPostWrapper
            optionsVisibility={true}
            className="p-4"
            post={postData}
            type="post"
          >
            <div className="text-base mt-2 space-y-4 w-full">
              <div className="text-xl font-semibold mb-2">{postData.title}</div>
              <CustomOutput content={content} />
              <ActionButtons />
            </div>
          </CommunityPostWrapper>
        ) : (
          <div className="flex w-full justify-center font-semibold py-5">
            <Loader2 className="animate-spin w-4 h-4" />
          </div>
        )}
        <CommentTextArea
          comment={comment}
          className="p-4"
          handleCommentChange={handleCommentChange}
          handleSubmit={handleSubmitComment}
        />
        <CommentSection commentsData={commentsData} />
      </div>
    </div>
  );
}

function RightContent() {
  return <div></div>;
}

export default CommunitySinglePost;
