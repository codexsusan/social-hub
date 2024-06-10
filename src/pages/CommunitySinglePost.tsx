import { useAppDispatch, useAppSelector } from "@/app/hooks";
import CommunityPostWrapper from "@/components/community/CommunityPostWrapper";
import { ActionButtons } from "@/components/communitysinglepost/ActionButtons";
import CommentSection from "@/components/usersinglepost/CommentSection";
import CommentTextArea from "@/components/usersinglepost/CommentTextArea";
import {
  createCommentOnPost,
  getCommentsOnPostById,
} from "@/features/comment/commentSlice";
import { addcommentCommunitySinglePostSuccess } from "@/features/communitysinglepost/communitysinglepostslice";
import { fetchSinglePost } from "@/features/usersinglepost/usersinglepostslice";
import { hasProperty } from "@/utils/generalUtils";
import parse from 'html-react-parser';
import { Loader2 } from "lucide-react";
import { MouseEventHandler, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CommunitySinglePost() {
  return (
    // <PageWrapper
    //   LeftContent={<LeftContent />}
    //   RightContent={<RightContent />}
    // />
    <div className="mt-4">
      <div className="grid grid-cols-10">
        <div className="p-4 pt-0 col-start-3 sm:col-start-2 sm:col-span-8 md:col-start-3 md:col-span-6">
          <LeftContent />
        </div>
      </div>
    </div>
  );
}

function LeftContent() {
  const { postId } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSinglePost(postId)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(getCommentsOnPostById(postId));
      }
    });
  }, [dispatch, postId]);

  const postData = useAppSelector((state) => state.communitysinglepost.post);

  const commentsData = useAppSelector(
    (state) => state.communitysinglepost.comment
  );

  // const content = JSON.parse(postData!.content!);
  const content = parse(postData!.content!)

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
    <div className="flex justify-center">
      <div className="rounded-sm bg-[#F2F7F8] flex flex-col divide-y divide-slate-400/90 cursor-pointer ">
        {!postData.loading ? (
          <CommunityPostWrapper
            optionsVisibility={true}
            className="p-4"
            post={postData}
            type="post"
          >
            <div className="text-base mt-2 space-y-4 w-full">
              <div className="text-xl font-semibold mb-2">{postData.title}</div>
              {/* <CustomOutput content={content} /> */}
              <p>{content}</p>
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
        <CommentSection source="community-post" commentsData={commentsData} />
      </div>
    </div>
  );
}


export default CommunitySinglePost;
