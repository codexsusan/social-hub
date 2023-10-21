import { useAppDispatch } from "@/app/hooks";
import {
  downvoteCommentById,
  getCommentRepliesById,
  upvoteCommentById,
} from "@/features/comment/commentSlice";
import {
  downvoteSinglePostCommentSuccess,
  switchReplies,
  upvoteSinglePostCommentSuccess,
} from "@/features/usersinglepost/usersinglepostslice";
import { cn } from "@/lib/utils";
import { CommentPartial } from "@/types/commentTypes";
import { ArrowBigDown, ArrowBigUp, MessageCircle } from "lucide-react";
import { MouseEventHandler } from "react";
import CommentReply from "../common/CommentReply";
import { CustomAvatar } from "../common/CustomAvatar";
import CommentDialog from "./CommentDialog";
import {
  downvoteCommunitySinglePostCommentSuccess,
  switchRepliesCommunity,
  upvoteCommunitySinglePostCommentSuccess,
} from "@/features/communitysinglepost/communitysinglepostslice";
import { AuthorRedirectData } from "@/types/userTypes";
import { useNavigate } from "react-router-dom";

function CommentCard({
  comment,
  source,
}: {
  comment: CommentPartial;
  source: string;
}) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    _id,
    upvotes_count,
    downvotes_count,
    upVoteStatus,
    downVoteStatus,
    replies_count,
    comment_reply,
    comment_reply_status,
  } = comment!;

  const VoteCount =
    upvotes_count! - downvotes_count! == 0
      ? "Vote"
      : upvotes_count! - downvotes_count!;

  const handleRedirectToAuthorProfile: MouseEventHandler = (e) => {
    e.stopPropagation();
    const userDetails: AuthorRedirectData = {
      id: comment.author?._id,
      username: comment.author?.userName,
    };
    navigate(`/user/${comment.author?.userName}`, { state: userDetails });
  };
  const handleUpVote: MouseEventHandler = (e) => {
    e.stopPropagation();
    dispatch(upvoteCommentById(comment._id!)).then((res) => {
      if (res.meta.requestStatus == "fulfilled") {
        if (source === "community-post") {
          dispatch(upvoteCommunitySinglePostCommentSuccess(comment._id!));
        } else if (source === "user-post") {
          dispatch(upvoteSinglePostCommentSuccess(comment._id!));
        }
      }
    });
  };

  const handleDownVote: MouseEventHandler = (e) => {
    e.stopPropagation();
    dispatch(downvoteCommentById(comment._id!)).then((res) => {
      if (res.meta.requestStatus == "fulfilled") {
        if (source === "community-post") {
          dispatch(downvoteCommunitySinglePostCommentSuccess(comment._id!));
        } else if (source === "user-post") {
          dispatch(downvoteSinglePostCommentSuccess(comment._id!));
        }
      }
    });
  };

  const handleSwitchReplies: MouseEventHandler = (e) => {
    e.stopPropagation();
    if (source === "community-post") {
      dispatch(switchRepliesCommunity(_id!));
    } else if (source === "user-post") {
      dispatch(switchReplies(_id!));
    }
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
                  fill="white"
                />
              ) : (
                <ArrowBigDown onClick={handleDownVote} strokeWidth={1} />
              )}
              {VoteCount}
            </div>
            <CommentDialog source={source} comment={comment}>
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
                  return (
                    <CommentReply
                      source={source}
                      key={reply._id}
                      comment={reply}
                    />
                  );
                })}
              </div>
              <div onClick={handleSwitchReplies} className="text-blue-500">
                Hide Replies
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CommentCard;
