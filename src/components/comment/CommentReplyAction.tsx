import {
  useAppDispatch,
  // useAppSelector
} from "@/app/hooks";
import {
  replydownvotesuccess,
  downvoteCommentById,
  replyupvotesuccess,
  upvoteCommentById,
} from "@/features/comment/commentSlice";
import { NestedComment } from "@/types/commentTypes";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import React from "react";

function CommentReplyActions(props: { reply: NestedComment }) {
  const { reply } = props;
  const dispatch = useAppDispatch();
  //   const currentUser = useAppSelector((state) => state.user);

  const VoteCount =
    reply.upvotes_count! - reply.downvotes_count! == 0
      ? "Vote"
      : reply.upvotes_count! - reply.downvotes_count!;

  const handleReplyUpvote = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(upvoteCommentById(reply._id)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(
          replyupvotesuccess({
            parentId: reply.parent_id!,
            replyId: reply._id!,
          })
        );
      }
    });
  };

  const handleReplyDownvote = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(downvoteCommentById(reply._id)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(
          replydownvotesuccess({
            parentId: reply.parent_id!,
            replyId: reply._id!,
          })
        );
      }
    });
  };

  const { upvote_status, downvote_status } = reply;
  return (
    <div className="w-full flex gap-x-8 justify-normal my-2 items-center ">
      <div className="flex gap-x-2">
        <ArrowBigUp
          onClick={handleReplyUpvote}
          strokeWidth={1}
          fill={upvote_status ? "white" : ""}
        />
        <ArrowBigDown
          onClick={handleReplyDownvote}
          strokeWidth={1}
          fill={downvote_status ? "white" : ""}
        />
        {VoteCount}
      </div>
    </div>
  );
}

export default CommentReplyActions;
