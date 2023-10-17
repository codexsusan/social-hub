import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { cn } from "@/lib/utils";
import { CommentPartial } from "@/types/commentTypes";
import { ArrowBigDown, ArrowBigUp, Loader2, MessageCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import { CustomAvatar } from "../common/CustomAvatar";
import {
  downvoteCommentById,
  getCommentRepliesById,
  getCommentsOnPostById,
  upvoteCommentById,
} from "@/features/comment/commentSlice";
import { MouseEventHandler, useEffect } from "react";
import {
  downvoteSinglePostCommentSuccess,
  switchReplies,
  upvoteSinglePostCommentSuccess,
} from "@/features/usersinglepost/usersinglepostslice";
import CommentDialog from "./CommentDialog";

function CommentSection() {
  const { postId } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCommentsOnPostById(postId));
  }, [dispatch, postId]);

  const commentsData = useAppSelector((state) => state.usersinglepost.comment);

  return commentsData.loading ? (
    <div className="flex justify-center py-10">
      <Loader2 className="animate-spin h-4 w-4" />
    </div>
  ) : (
    <div className="flex flex-col divide-y divide-slate-400/90">
      {commentsData.comments &&
        commentsData.comments.map((comment) => {
          return <CommentCard key={comment._id} comment={comment} />;
        })}
    </div>
  );
}

function CommentCard({ comment }: { comment: CommentPartial }) {
  const dispatch = useAppDispatch();

  const {
    _id,
    upvotes_count,
    downvotes_count,
    upVoteStatus,
    downVoteStatus,
    replies_count,
    comment_reply,
    comment_reply_status,
  } = comment;

  const VoteCount =
    upvotes_count! - downvotes_count! == 0
      ? "Vote"
      : upvotes_count! - downvotes_count!;

  const handleRedirectToAuthorProfile = () => {};
  const handleUpVote: MouseEventHandler = (e) => {
    e.stopPropagation();
    dispatch(upvoteCommentById(comment._id!)).then((res) => {
      if (res.meta.requestStatus == "fulfilled") {
        dispatch(upvoteSinglePostCommentSuccess(comment._id!));
      }
    });
  };
  const handleDownVote: MouseEventHandler = (e) => {
    e.stopPropagation();
    dispatch(downvoteCommentById(comment._id!)).then((res) => {
      if (res.meta.requestStatus == "fulfilled") {
        dispatch(downvoteSinglePostCommentSuccess(comment._id!));
      }
    });
  };

  return (
    <div className={cn("flex gap-x-3 p-4")}>
      <div onClick={handleRedirectToAuthorProfile}>
        <CustomAvatar />
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <p
              onClick={handleRedirectToAuthorProfile}
              className="text-white opacity-70 text-base font-semibold"
            >
              {comment.author?.firstName + " " + comment.author?.lastName}
            </p>
            <p
              onClick={handleRedirectToAuthorProfile}
              className="text-white opacity-60 text-base"
            >
              @{comment.author!.userName}
            </p>
          </div>
        </div>
        <div>{comment.content}</div>
        <div className="w-full">
          <div className="w-full flex gap-x-8 justify-normal items-center">
            <div className="flex gap-x-2">
              {upVoteStatus ? (
                <ArrowBigUp
                  onClick={handleUpVote}
                  strokeWidth={1}
                  fill={"white"}
                />
              ) : (
                <ArrowBigUp onClick={handleUpVote} strokeWidth={1} />
              )}
              {downVoteStatus ? (
                <ArrowBigDown
                  onClick={handleDownVote}
                  strokeWidth={1}
                  fill={"white"}
                />
              ) : (
                <ArrowBigDown onClick={handleDownVote} strokeWidth={1} />
              )}
              {VoteCount}
            </div>
            <CommentDialog comment={comment}>
              <div className="flex gap-x-2 items-center">
                <MessageCircle strokeWidth={1} size={22} />
                <div className="text-cl">{replies_count}</div>
              </div>
            </CommentDialog>
          </div>
        </div>
        <div>
          {replies_count! > 0 && !comment_reply_status && (
            <div
              onClick={() => {
                dispatch(getCommentRepliesById(_id!));
              }}
              className="text-blue-500"
            >
              Show Replies
            </div>
          )}
          {comment_reply_status && (
            <div>
              <div className="-m-4">
                {comment_reply?.map((reply) => {
                  return <CommentCard key={reply._id} comment={reply} />;
                })}
              </div>
              <div
                onClick={() => {
                  dispatch(switchReplies(_id!));
                }}
                className="text-blue-500"
              >
                Hide Replies
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CommentSection;
