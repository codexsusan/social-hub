import { useAppDispatch } from "@/app/hooks";
import {
  downvotelatestsuccess,
  upvotelatestsuccess,
} from "@/features/home/latestSlice";
import {
  downvotetrendingsuccess,
  upvotetrendingsuccess,
} from "@/features/home/trendingSlice";
import {
  downvotePost,
  downvotesuccess,
  togglecomment,
  upvotePost,
  upvotesuccess,
} from "@/features/post/postSlice";
import { PostPartial } from "@/types/postTypes";
import {
  ArrowBigDown,
  ArrowBigUp,
  Bookmark,
  MessageCircle,
} from "lucide-react";

interface Props {
  className?: string;
  type?: string;
  post?: PostPartial;
}

export default function PostActions(props: Props) {
  const { post, type } = props;
  const dispatch = useAppDispatch();
  const VoteCount =
    post!.upvotes_count! - post!.downvotes_count! == 0
      ? "Vote"
      : post!.upvotes_count! - post!.downvotes_count!;

  const CommentCount =
    post!.comment_count == 0 ? "Comment" : post!.comment_count;

  const handleUpVote = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(upvotePost(post!._id)).then((res) => {
      if (res.meta.requestStatus == "fulfilled") {
        if (type == "latest") {
          dispatch(upvotelatestsuccess(post!._id));
        } else if (type == "trending") {
          dispatch(upvotetrendingsuccess(post!._id));
        } else if (type == "single-post") {
          dispatch(upvotesuccess());
        }
      }
    });
  };
  const handleDownVote = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(downvotePost(post!._id)).then((res) => {
      if (res.meta.requestStatus == "fulfilled") {
        if (type == "latest") {
          dispatch(downvotelatestsuccess(post!._id));
        } else if (type == "trending") {
          dispatch(downvotetrendingsuccess(post!._id));
        } else if (type == "single-post") {
          dispatch(downvotesuccess());
        }
      }
    });
  };

  const handleCommentSection = (e: React.MouseEvent) => {
    if (type === "single-post") {
      e.stopPropagation();
      dispatch(togglecomment());
    }
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
  }

  const { upvote_status, downvote_status, isBookmarked } = post!;

  return (
    <div className="w-full flex gap-x-8 justify-normal my-2 items-center ">
      <div className="flex gap-x-2">
        <ArrowBigUp
          onClick={handleUpVote}
          strokeWidth={1}
          fill={upvote_status ? "white" : ""}
        />
        <ArrowBigDown
          onClick={handleDownVote}
          strokeWidth={1}
          fill={downvote_status ? "white" : undefined}
        />
        {VoteCount}
      </div>
      <div onClick={handleCommentSection} className="flex gap-x-2">
        <MessageCircle strokeWidth={1} size={22} />
        {CommentCount}
      </div>
      <div>
        <Bookmark

          strokeWidth={1}
          size={22}
          fill={isBookmarked ? "white" : undefined}
        />
      </div>
    </div>
  );
}
