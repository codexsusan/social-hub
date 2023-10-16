import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { switchBookmark } from "@/features/bookmarks/bookmarkSlice";
import { downvotePost, upvotePost } from "@/features/post/postSlice";
import {
    downvoteSinglePostSuccess,
    switchSinglePostBookmarkSuccess,
    upvoteSinglePostSuccess,
} from "@/features/usersinglepost/usersinglepostslice";
import {
    ArrowBigDown,
    ArrowBigUp,
    Bookmark,
    MessageCircle,
} from "lucide-react";
import { MouseEventHandler } from "react";

function ActionButtons() {
  const dispatch = useAppDispatch();
  const postData = useAppSelector((state) => state.usersinglepost.post);
  const {
    upVoteStatus,
    downVoteStatus,
    upvotes_count,
    downvotes_count,
    comment_count,
    isBookmarked,
  } = postData;

  const VoteCount =
    upvotes_count! - downvotes_count! == 0
      ? "Vote"
      : upvotes_count! - downvotes_count!;

  const CommentCount = comment_count == 0 ? "Comment" : comment_count;

  const handleUpVote: MouseEventHandler = (e) => {
    e.stopPropagation();
    dispatch(upvotePost(postData._id)).then((res) => {
      if (res.meta.requestStatus == "fulfilled") {
        dispatch(upvoteSinglePostSuccess());
      }
    });
  };

  const handleDownVote: MouseEventHandler = (e) => {
    e.stopPropagation();
    dispatch(downvotePost(postData._id)).then((res) => {
      if (res.meta.requestStatus == "fulfilled") {
        dispatch(downvoteSinglePostSuccess());
      }
    });
  };

  const switchBookmarkCB = () => {
    dispatch(switchBookmark(postData._id)).then((res) => {
      if (res.meta.requestStatus == "fulfilled") {
        dispatch(switchSinglePostBookmarkSuccess());
      }
    });
  };
  return (
    <div className="w-full flex gap-x-8 justify-normal items-center">
      <div className="flex gap-x-2">
        <ArrowBigUp
          onClick={handleUpVote}
          strokeWidth={1}
          fill={upVoteStatus ? "white" : ""}
        />
        <ArrowBigDown
          onClick={handleDownVote}
          strokeWidth={1}
          fill={downVoteStatus ? "white" : undefined}
        />
        {VoteCount}
      </div>
      <div className="flex gap-x-2">
        <MessageCircle strokeWidth={1} size={22} />
        {CommentCount}
      </div>
      <div>
        <Bookmark
          onClick={switchBookmarkCB}
          strokeWidth={1}
          size={22}
          fill={isBookmarked ? "white" : undefined}
        />
      </div>
    </div>
  );
}

export default ActionButtons;
