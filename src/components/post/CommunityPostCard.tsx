import { cn } from "@/lib/utils";
import { PostPartial } from "@/types/postTypes";
import React from "react";
import { useNavigate } from "react-router-dom";
import UserPostWrapper from "../common/UserPostWrapper";
import PostActions from "./PostActions";

import parser from "html-react-parser";

interface Props {
  className?: string;
  type?: string;
  post?: PostPartial;
}

function CommunityPostCard(props: Props) {
  const { className, post } = props;
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
      <UserPostWrapper post={post}>
        <div className="text-base mt-2 space-y-4 flex-1">
          <div className="text-xl font-semibold">{post!.title}</div>
          <div>{content}</div>
          <PostActions {...props} />
        </div>
      </UserPostWrapper>
    </div>
  );
}

export default CommunityPostCard;
