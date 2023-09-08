import { cn } from "@/lib/utils";
import React from "react";
import { CustomAvatar } from "../common/CustomAvatar";
import { CommentPartial } from "@/types/commentTypes";

function CommentView(props: { comment?: CommentPartial }) {
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
            {props.comment?.author_id}
          </p>
          <p
            onClick={(event: React.MouseEvent) => {
              event.stopPropagation();
              console.log("Redirect to user profile");
            }}
            className="text-white opacity-60 text-base"
          >
            @helloxsusan
          </p>
        </div>
        <div className="w-full"></div>
      </div>
    </div>
  );
}

export default CommentView;
