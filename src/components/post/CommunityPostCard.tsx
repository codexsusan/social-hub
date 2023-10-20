import { cn } from "@/lib/utils";
import { PostPartial } from "@/types/postTypes";
import React from "react";
import { useNavigate } from "react-router-dom";
import CustomOutput from "../common/CustomOutput";
import CommunityPostWrapper from "../community/CommunityPostWrapper";
import PostActions from "./PostActions";

interface Props {
  className?: string;
  type?: string;
  post?: PostPartial;
  optionsVisibility: boolean;
}

function CommunityPostCard(props: Props) {
  const { className, post, optionsVisibility } = props;
  const navigate = useNavigate();
  const routeToSinglePost = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/c/${post!.community._id}/post/${post!._id}?origin=${location.pathname}`);
  };

  const content = post!.content!.length > 0 ? JSON.parse(post!.content!) : "";
  return (
    <div
      onClick={routeToSinglePost}
      className={cn(
        "w-full rounded-sm bg-[#27272a] flex gap-2 flex-col text-white p-4 cursor-pointer hover:bg-[#1e1e1e]",
        className
      )}
    >
      <CommunityPostWrapper optionsVisibility={optionsVisibility} post={post}>
        <div className="text-base mt-2 space-y-4 flex-1">
          <div className="text-xl font-semibold">{post!.title}</div>
          <CustomOutput content={content} />
          <PostActions {...props} />
        </div>
      </CommunityPostWrapper>
    </div>
  );
}

export default CommunityPostCard;
