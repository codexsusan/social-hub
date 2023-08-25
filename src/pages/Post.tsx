import PostCard from "@/components/post/PostCard";
import React from "react";

function Post() {
  return (
    <div className="w-full flex flex-col flex-1 items-center p-4 gap-y-2 overflow-auto text-white">
      <PostCard />
    </div>
  );
}

export default Post;
