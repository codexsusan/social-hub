import { CommentPartial } from "@/types/commentTypes";
import { ArrowBigDown, ArrowBigUp, MessageCircle } from "lucide-react";

function CommentActions(props: { comment: CommentPartial }) {
  const { comment } = props;

  const VoteCount =
    comment.upvotes_count! - comment.downvotes_count! == 0
      ? "Vote"
      : comment.upvotes_count! - comment.downvotes_count!;

  // const CommentCount = comment.

  return (
    <div className="w-full flex gap-x-8 justify-normal my-2 items-center ">
      <div className="flex gap-x-2">
        {comment.upvote_status ? (
          <ArrowBigUp onClick={() => {}} strokeWidth={1} fill="white" />
        ) : (
          <ArrowBigUp onClick={() => {}} strokeWidth={1} />
        )}
        {comment.downvote_status ? (
          <ArrowBigDown onClick={() => {}} strokeWidth={1} fill="white" />
        ) : (
          <ArrowBigDown onClick={() => {}} strokeWidth={1} />
        )}
        {VoteCount}
      </div>
      <div onClick={() => {}} className="flex gap-x-2 items-center">
        <MessageCircle strokeWidth={1} size={22} />
        <div className="text-slate-300">Reply</div>
      </div>
    </div>
  );
}

export default CommentActions;
