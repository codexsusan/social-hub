import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  commentdownvotesuccess,
  commentupvotesuccess,
  switchcommentreplybox,
  downvoteCommentById,
  upvoteCommentById,
  getCommentReplies,
  initcommentreplies,
} from "@/features/comment/commentSlice";
import { NestedComment } from "@/types/commentTypes";
import { hasProperty } from "@/utils/generalUtils";
import { ArrowBigDown, ArrowBigUp, MessageCircle } from "lucide-react";
import React from "react";

function CommentActions(props: { comment: NestedComment }) {
  const { comment } = props;
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.user);

  const VoteCount =
    comment.upvotes_count! - comment.downvotes_count! == 0
      ? "Vote"
      : comment.upvotes_count! - comment.downvotes_count!;

  const handleUpvote = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(upvoteCommentById(comment._id)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(commentupvotesuccess(comment._id));
      }
    });
  };

  const handleDownvote = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(downvoteCommentById(comment._id)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(commentdownvotesuccess(comment._id!));
      }
    });
  };

  const switchCommentReplyBox = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(switchcommentreplybox(comment._id));
    dispatch(
      getCommentReplies({ commentId: comment._id, userId: currentUser._id })
    ).then((res) => {
      if (hasProperty(res.payload, "data")) {
        dispatch(
          initcommentreplies({
            replies: res.payload.data.data,
            commentId: comment._id,
          })
        );
      }
    });
  };

  const { upVoteStatus, downVoteStatus } = comment;
  return (
    <div className="w-full flex gap-x-8 justify-normal my-2 items-center ">
      <div className="flex gap-x-2">
        <ArrowBigUp
          onClick={handleUpvote}
          strokeWidth={1}
          fill={upVoteStatus ? "white" : ""}
        />
        <ArrowBigDown
          onClick={handleDownvote}
          strokeWidth={1}
          fill={downVoteStatus ? "white" : ""}
        />
        {VoteCount}
      </div>
      <div
        onClick={switchCommentReplyBox}
        className="flex gap-x-2 items-center"
      >
        <MessageCircle strokeWidth={1} size={22} />
        <div className="text-slate-300">Reply</div>
      </div>
    </div>
  );
}

export default CommentActions;
