import {
  ArrowBigDown,
  ArrowBigUp,
  Bookmark,
  MessageCircle,
} from "lucide-react";
import UserData from "../common/UserData";

import { cn } from "@/lib/utils";

import React from "react";
import { PostPartial } from "@/types/postTypes";
import { useNavigate } from "react-router-dom";
import {
  upvotelatestsuccess,
  downvotelatestsuccess,
} from "@/features/home/latestSlice";
import { useAppDispatch } from "@/app/hooks";
import {
  upvotetrendingsuccess,
  downvotetrendingsuccess,
} from "@/features/home/trendingSlice";
import {
  downvotePost,
  downvotesuccess,
  togglecomment,
  upvotePost,
  upvotesuccess,
} from "@/features/post/postSlice";

interface Props {
  className?: string;
  type?: string;
  post?: PostPartial;
}

function PostCard(props: Props) {
  const { post, className } = props;
  const navigate = useNavigate();
  const routeToSinglePost = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/c/${post!.community_id}/post/${post!._id}`);
  };

  return (
    <div
      onClick={routeToSinglePost}
      className={cn(
        "w-full border rounded-sm bg-[#27272a] border-slate-600 flex gap-2 flex-col text-white p-4 cursor-pointer hover:bg-[#1e1e1e]",
        className
      )}
    >
      <UserData post={post}>
        <div className="text-base mt-2 space-y-4 flex-1">
          <div className="text-xl font-semibold">{post!.title}</div>
          <div>{post!.content}</div>
          <PostActions {...props} />
        </div>
      </UserData>
    </div>
  );
}

export function PostActions(props: Props) {
  const { post, type } = props;
  const dispatch = useAppDispatch();
  const VoteCount =
    post!.upvotes_count! - post!.downvotes_count! == 0
      ? ""
      : post!.upvotes_count! - post!.downvotes_count!;

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

  return (
    <div className="w-full flex gap-x-8 justify-normal my-2 items-center ">
      <div className="flex gap-x-2">
        {post!.upvote_status ? (
          <ArrowBigUp onClick={handleUpVote} strokeWidth={1} fill="white" />
        ) : (
          <ArrowBigUp onClick={handleUpVote} strokeWidth={1} />
        )}
        {post!.downvote_status ? (
          <ArrowBigDown onClick={handleDownVote} strokeWidth={1} fill="white" />
        ) : (
          <ArrowBigDown onClick={handleDownVote} strokeWidth={1} />
        )}
        {VoteCount}
      </div>
      <div onClick={handleCommentSection} className="flex gap-x-2">
        <MessageCircle strokeWidth={1} size={22} />
        {post!.comment_count}
      </div>
      <div>
        <Bookmark strokeWidth={1} size={22} />
      </div>
    </div>
  );
}

export default PostCard;
