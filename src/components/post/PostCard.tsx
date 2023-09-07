import {
  ArrowBigDown,
  ArrowBigUp,
  Bookmark,
  MessageCircle,
} from "lucide-react";
import PostUserData from "./PostUserData";
import parser from "html-react-parser";

import { cn } from "@/lib/utils";

import React from "react";
import { PostPartial } from "@/types/postTypes";
import { useNavigate } from "react-router-dom";
import {
  downvoteLatestPost,
  downvotepost,
  upvoteLatestPost,
  upvotepost,
} from "@/features/home/latestSlice";
import { useAppDispatch } from "@/app/hooks";

interface Props {
  className?: string;
  type?: string;
  post: PostPartial;
}

function PostCard(props: Props) {
  const { post, className } = props;
  const navigate = useNavigate();
  const routeToSinglePost = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/c/${post.community_id}/post/${post._id}`);
  };

  return (
    <div
      onClick={routeToSinglePost}
      className={cn(
        "w-full border rounded-sm bg-[#27272a] border-slate-600 flex gap-2 flex-col text-white p-4 cursor-pointer hover:bg-[#1e1e1e]",
        className
      )}
    >
      <PostUserData {...props}>
        <div className="text-base mt-2 space-y-4 w-full">
          <div className="text-xl font-semibold">{post.title}</div>
          <div>{post.content}</div>
          <PostActions {...props} type="post" />
        </div>
      </PostUserData>
    </div>
  );
}

export function PostBody(props: Props) {
  const content = parser(props.post.content || "");
  return (
    <>
      <PostUserData {...props}>
        <div className="text-base mt-2 space-y-4">
          <div className="text-xl font-semibold">{props.post.title}</div>
          <div>{content}</div>
        </div>
      </PostUserData>
    </>
  );
}

export function PostActions(props: Props) {
  const { post } = props;
  const dispatch = useAppDispatch();
  const VoteCount =
    post.upvotes_count! - post.downvotes_count! == 0
      ? ""
      : post.upvotes_count! - post.downvotes_count!;

  const handleUpVote = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(upvoteLatestPost(post._id)).then((res) => {
      if (res.meta.requestStatus == "fulfilled") {
        dispatch(upvotepost(post._id));
      }
    });
  };
  const handleDownVote = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(downvoteLatestPost(post._id)).then((res) => {
      if (res.meta.requestStatus == "fulfilled") {
        dispatch(downvotepost(post._id));
      }
    });
  };
  return (
    <div className="w-full flex gap-x-3 justify-between my-2 items-center">
      <div className="flex gap-x-2">
        {post.upvote_status ? (
          <ArrowBigUp onClick={handleUpVote} strokeWidth={1} fill="white" />
        ) : (
          <ArrowBigUp onClick={handleUpVote} strokeWidth={1} />
        )}
        {post.downvote_status ? (
          <ArrowBigDown onClick={handleDownVote} strokeWidth={1} fill="white" />
        ) : (
          <ArrowBigDown onClick={handleDownVote} strokeWidth={1} />
        )}
        {VoteCount}
      </div>
      <div className="flex gap-x-2">
        <MessageCircle strokeWidth={1} size={22} />
        {post.comment_count}
      </div>
      <div>
        <Bookmark strokeWidth={1} size={22} />
      </div>
    </div>
  );
}

export default PostCard;
