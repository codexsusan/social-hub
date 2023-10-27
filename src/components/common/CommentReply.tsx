import { useAppDispatch } from "@/app/hooks";
import { cn } from "@/lib/utils";
import { CommentPartial } from "@/types/commentTypes";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { CustomAvatar } from "../common/CustomAvatar";
import { MouseEventHandler } from "react";
import {
  downvoteCommentById,
  upvoteCommentById,
} from "@/features/comment/commentSlice";
import {
  downvoteReplies,
  upvoteReplies,
} from "@/features/usersinglepost/usersinglepostslice";
import {
  downvoteRepliesCommunity,
  upvoteRepliesCommunity,
} from "@/features/communitysinglepost/communitysinglepostslice";
import { useNavigate } from "react-router-dom";
import { AuthorRedirectData } from "@/types/userTypes";

function CommentReply({
  comment,
  source,
}: {
  comment: CommentPartial;
  source: string;
}) {
  const {
    _id,
    upvotes_count,
    downvotes_count,
    upVoteStatus,
    downVoteStatus,
    parent_id,
  } = comment;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const VoteCount = upvotes_count! - downvotes_count!;

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
    dispatch(upvoteCommentById(_id)).then((res) => {
      if (res.meta.requestStatus == "fulfilled") {
        if (source === "community-post") {
          dispatch(upvoteRepliesCommunity({ parent_id, _id }));
        } else if (source === "user-post") {
          dispatch(upvoteReplies({ parent_id, _id }));
        }
      }
    });
  };

  const handleDownVote: MouseEventHandler = (e) => {
    e.stopPropagation();
    dispatch(downvoteCommentById(_id)).then((res) => {
      if (res.meta.requestStatus == "fulfilled") {
        if (source === "community-post") {
          dispatch(downvoteRepliesCommunity({ parent_id, _id }));
        } else if (source === "user-post") {
          dispatch(downvoteReplies({ parent_id, _id }));
        }
      }
    });
  };

  // TODO: Need to add delete option for comment
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
              className="opacity-70 text-base font-semibold"
            >
              {comment.author?.firstName + " " + comment.author?.lastName}
            </p>
            <p
              onClick={handleRedirectToAuthorProfile}
              className="opacity-60 text-base"
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
                  strokeWidth={0}
                  fill={"blue"}
                />
              ) : (
                <ArrowBigUp onClick={handleUpVote} strokeWidth={1} />
              )}
              {downVoteStatus ? (
                <ArrowBigDown
                  onClick={handleDownVote}
                  strokeWidth={0}
                  fill={"blue"}
                />
              ) : (
                <ArrowBigDown onClick={handleDownVote} strokeWidth={1} />
              )}
              {VoteCount}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentReply;
