import { useAppDispatch } from "@/app/hooks";
import {
  downvotesuccess,
  upvotesuccess,
  switchcommentreplybox,
  downvoteCommentById,
  upvoteCommentById,
} from "@/features/comment/commentSlice";
import { CommentPartial } from "@/types/commentTypes";
import { ArrowBigDown, ArrowBigUp, MessageCircle } from "lucide-react";
import React from "react";

function CommentActions(props: { comment: CommentPartial }) {
  const { comment } = props;
  const dispatch = useAppDispatch();

  const VoteCount =
    comment.upvotes_count! - comment.downvotes_count! == 0
      ? "Vote"
      : comment.upvotes_count! - comment.downvotes_count!;

  const handleUpvote = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(upvoteCommentById(comment._id)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(upvotesuccess(comment._id));
      }
    });
  };

  const handleDownvote = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(downvoteCommentById(comment._id)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(downvotesuccess(comment._id!));
      }
    });
  };

  const switchCommentReplyBox = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(switchcommentreplybox(comment._id));
  };

  const { upvote_status, downvote_status } = comment;
  return (
    <div className="w-full flex gap-x-8 justify-normal my-2 items-center ">
      <div className="flex gap-x-2">
        <ArrowBigUp
          onClick={handleUpvote}
          strokeWidth={1}
          fill={upvote_status ? "white" : ""}
        />
        <ArrowBigDown
          onClick={handleDownvote}
          strokeWidth={1}
          fill={downvote_status ? "white" : ""}
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