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

  const VoteCount = upvotes_count! - downvotes_count!;

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

  const switchBookmarkCB: MouseEventHandler = (e) => {
    e.stopPropagation();
    dispatch(switchBookmark(postData._id)).then((res) => {
      if (res.meta.requestStatus == "fulfilled") {
        dispatch(switchSinglePostBookmarkSuccess());
      }
    });
  };
  return (
    <div className="w-full flex gap-x-8 justify-normal items-center">
      <div className="flex gap-x-2">
        {upVoteStatus ? (
          <ArrowBigUp onClick={handleUpVote} strokeWidth={1} fill={"white"} />
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
      <div className="flex gap-x-2">
        <MessageCircle strokeWidth={1} size={22} />
        {CommentCount}
      </div>
      <div>
        {isBookmarked ? (
          <Bookmark
            onClick={switchBookmarkCB}
            strokeWidth={1}
            size={22}
            fill={"blue"}
          />
        ) : (
          <Bookmark onClick={switchBookmarkCB} strokeWidth={1} size={22} />
        )}
      </div>
    </div>
  );
}

export default ActionButtons;
