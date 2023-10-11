import React from "react";
import UserPostWrapper from "../common/UserPostWrapper";
import PostActions from "./PostActions";

import { cn } from "@/lib/utils";
import { PostPartial } from "@/types/postTypes";
import { useNavigate } from "react-router-dom";
import Output from "editorjs-react-renderer";
// import parser from "html-react-parser";

interface Props {
  className?: string;
  type?: string;
  post?: PostPartial;
}

const style = {
  paragraph: {
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  },
};

function PostCard(props: Props) {
  const { post, className } = props;
  const navigate = useNavigate();
  const routeToSinglePost = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/c/${post!.author?._id}/post/${post!._id}`);
  };
  // const content = parser(post!.content || "");
  const content = post!.content!.length > 0 ? JSON.parse(post!.content!) : "";
  // TODO: Add content parser

  return (
    <div
      onClick={routeToSinglePost}
      className={cn(
        "w-full rounded-sm bg-[#27272a]  flex gap-2 flex-col text-white p-4 cursor-pointer hover:bg-[#1e1e1e]",
        className
      )}
    >
      <UserPostWrapper post={post}>
        <div className="text-base mt-2 space-y-4 flex-1">
          <div className="text-xl font-semibold">{post!.title}</div>
          <Output className="text-white border" style={style} data={content} />
          <PostActions {...props} />
        </div>
      </UserPostWrapper>
    </div>
  );
}

export default PostCard;
