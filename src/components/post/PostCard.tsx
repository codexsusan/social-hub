import React from "react";
import UserPostWrapper from "../common/UserPostWrapper";
import PostActions from "./PostActions";

import { cn } from "@/lib/utils";
import { PostPartial } from "@/types/postTypes";
import { useLocation, useNavigate } from "react-router-dom";
import CustomOutput from "../common/CustomOutput";

interface Props {
  className?: string;
  type?: string;
  post?: PostPartial;
  optionsVisibility: boolean;
}

function PostCard(props: Props) {
  const { post, className, optionsVisibility } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const routeToSinglePost = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/u/${post!.author?._id}/post/${post!._id}?origin=${location.pathname}`);
  };
  const content = post!.content!.length > 0 ? JSON.parse(post!.content!) : "";
  return (
    <div
      onClick={routeToSinglePost}
      className={cn(
        "w-full rounded-sm bg-[#27272a]  flex gap-2 flex-col text-white p-4 cursor-pointer hover:bg-[#1e1e1e]",
        className
      )}
    >
      <UserPostWrapper post={post} optionsVisibility={optionsVisibility}>
        <div className="text-base mt-2 space-y-4 flex-1">
          <div className="text-xl font-semibold">{post!.title}</div>
          <CustomOutput content={content} />
          <PostActions {...props} />
        </div>
      </UserPostWrapper>
    </div>
  );
}

export default PostCard;
