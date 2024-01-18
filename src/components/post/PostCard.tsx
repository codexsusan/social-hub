import React from "react";
import UserPostWrapper from "../common/UserPostWrapper";
import PostActions from "./PostActions";

import { cn } from "@/lib/utils";
import { PostPartial } from "@/types/postTypes";
import parse from 'html-react-parser';
import { useLocation, useNavigate } from "react-router-dom";
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
    navigate(
      `/u/${post!.author?._id}/post/${post!._id}?origin=${location.pathname}`
    );
  };
  const content = parse(post!.content!);
  return (
    <div
      onClick={routeToSinglePost}
      className={cn(
        "w-full rounded-sm bg-gray-300/30 flex gap-2 flex-col p-4 cursor-pointer text-black",
        className
      )}
    >
      <UserPostWrapper post={post} optionsVisibility={optionsVisibility}>
        <div className="text-base mt-2 space-y-4 flex-1">
          <div className="text-xl font-semibold">{post!.title}</div>
          {/* <CustomOutput content={content} /> */}
          <p>{content}</p>
          <PostActions {...props} />
        </div>
      </UserPostWrapper>
    </div>
  );
}

export default PostCard;
