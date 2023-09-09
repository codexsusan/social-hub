import { cn } from "@/lib/utils";
import React from "react";
import { CustomAvatar } from "../common/CustomAvatar";
import { CommentPartial } from "@/types/commentTypes";

function CommentView(props: { comment?: CommentPartial }) {
  const { comment } = props;

  return (
    <div className={cn("flex gap-x-3")}>
      <div
        className={""}
        onClick={(event: React.MouseEvent) => {
          event.stopPropagation();
          console.log("Redirect to user profile");
        }}
      >
        <CustomAvatar />
      </div>
      <div className="w-full">
        <div className="flex items-center gap-2">
          <p
            onClick={(event: React.MouseEvent) => {
              event.stopPropagation();
              console.log("Redirect to user profile");
            }}
            className="text-white opacity-70 text-base font-semibold"
          >
            {comment?.author?.firstName + "" + comment?.author?.lastName}
          </p>
          <p
            onClick={(event: React.MouseEvent) => {
              event.stopPropagation();
              console.log("Redirect to user profile");
            }}
            className="text-white opacity-60 text-base"
          >
            @{comment?.author?.userName}
          </p>
        </div>
        {/* Children should be here as */}
        <div className="w-full">{comment?.content}</div>
        <div className="p-4 border"></div>
        
      </div>
    </div>
  );
}

export default CommentView;
