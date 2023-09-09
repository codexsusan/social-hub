import React from "react";
import PostWrapper from "../common/PostWrapper";
import PostActions from "./PostActions";

import { cn } from "@/lib/utils";
import { PostPartial } from "@/types/postTypes";
import { useNavigate } from "react-router-dom";
import parser from "html-react-parser";

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
  const content = parser(post!.content || "");

  return (
    <div
      onClick={routeToSinglePost}
      className={cn(
        "w-full border rounded-sm bg-[#27272a] border-slate-600 flex gap-2 flex-col text-white p-4 cursor-pointer hover:bg-[#1e1e1e]",
        className
      )}
    >
      <PostWrapper post={post}>
        <div className="text-base mt-2 space-y-4 flex-1">
          <div className="text-xl font-semibold">{post!.title}</div>
          <div>{content}</div>
          <PostActions {...props} />
        </div>
      </PostWrapper>
    </div>
  );
}

export default PostCard;
