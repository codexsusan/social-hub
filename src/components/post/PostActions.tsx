import { useAppDispatch } from "@/app/hooks";
import { switchBookmark } from "@/features/bookmarks/bookmarkSlice";
import {
  downvotecommunityhomepostsuccess,
  switchbookmarkcommunityhomepostsuccess,
  upvotecommunityhomepostsuccess,
} from "@/features/community/communityPost";
import {
  downvotelatestsuccess,
  switchbookmarklatestsuccess,
  upvotelatestsuccess,
} from "@/features/home/latestSlice";
import {
  downvotemostviewedsuccess,
  switchbookmarkmostviewedsuccess,
  upvotemostviewedsuccess,
} from "@/features/home/mostviewedSlice";
import {
  downvotetrendingsuccess,
  switchbookmarktrendingsuccess,
  upvotetrendingsuccess,
} from "@/features/home/trendingSlice";
import {
  downvotePost,
  downvotesuccess,
  switchbookmarksuccess,
  togglecomment,
  upvotePost,
  upvotesuccess,
} from "@/features/post/postSlice";
import {
  downvoteprofilebookmarkpostsuccess,
  switchbookmarkprofilebookmarkpostsuccess,
  upvoteprofilebookmarkpostsuccess,
} from "@/features/profile/bookmarkSlice";
import {
  downvoteprofilepostsuccess,
  switchbookmarkprofilepostsuccess,
  upvoteprofilepostsuccess,
} from "@/features/profile/postSlice";
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
        } else if (type === "most-viewed") {
          dispatch(upvotemostviewedsuccess(post?._id));
        } else if (type == "profile-post") {
          dispatch(upvoteprofilepostsuccess(post?._id));
        } else if (type == "profile-bookmark") {
          dispatch(upvoteprofilebookmarkpostsuccess(post?._id));
        } else if (type === "community-home") {
          dispatch(upvotecommunityhomepostsuccess(post?._id));
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
        } else if (type === "most-viewed") {
          dispatch(downvotemostviewedsuccess(post?._id));
        } else if (type == "profile-post") {
          dispatch(downvoteprofilepostsuccess(post?._id));
        } else if (type == "profile-bookmark") {
          dispatch(downvoteprofilebookmarkpostsuccess(post?._id));
        } else if (type == "community-home") {
          dispatch(downvotecommunityhomepostsuccess(post?._id));
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

  const switchBookmarkCB = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(switchBookmark(post!._id)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        if (type === "latest") {
          dispatch(switchbookmarklatestsuccess(post!._id));
        } else if (type === "single-post") {
          dispatch(switchbookmarksuccess());
        } else if (type === "trending") {
          dispatch(switchbookmarktrendingsuccess(post!._id));
        } else if (type === "most-viewed") {
          dispatch(switchbookmarkmostviewedsuccess(post!._id));
        } else if (type === "profile-post") {
          dispatch(switchbookmarkprofilepostsuccess(post!._id));
        } else if (type === "profile-bookmark") {
          dispatch(switchbookmarkprofilebookmarkpostsuccess(post!._id));
        } else if (type === "community-home") {
          dispatch(switchbookmarkcommunityhomepostsuccess(post!._id));
        }
      }
    });
  };

  const { upVoteStatus, downVoteStatus, isBookmarked } = post!;

  return (
    <div className="w-full flex gap-x-8 justify-normal my-2 items-center ">
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
      <div onClick={handleCommentSection} className="flex gap-x-2">
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
