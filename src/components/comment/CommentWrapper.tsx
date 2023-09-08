import React from "react";
import { CustomAvatar } from "../common/CustomAvatar";
import { cn } from "@/lib/utils";
import { CommentPartial } from "@/types/commentTypes";

type Props = {
  comment?: CommentPartial;
  children: React.ReactNode;
};

function CommentWrapper(props: Props) {
  const { comment, children } = props;
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
        {children}
        
      </div>
    </div>
  );
}

export default CommentWrapper;
