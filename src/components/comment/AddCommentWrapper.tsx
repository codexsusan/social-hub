import { useAppSelector } from "@/app/hooks";
import { cn } from "@/lib/utils";
import { PostPartial } from "@/types/postTypes";
import React from "react";

type sourceType = "post" | "comment";
interface Props {
  className?: string;
  type?: sourceType;
  post?: PostPartial;
  children?: React.ReactNode;
}

function AddCommentWrapper(props: Props) {
  const { className, type, children, post } = props;
  const user = useAppSelector((state) => state.user);
  const { firstName, lastName, userName } = user;

  const displayName = firstName + " " + lastName;

  const username = type === "comment" ? userName : post?.author?.userName;
  return (
    <div className={cn("flex gap-x-3", className)}>
      <div
        className={"w-10"}
        onClick={(event: React.MouseEvent) => {
          event.stopPropagation();
        }}
      ></div>
      <div className="w-full">
        <div className="flex items-center gap-2">
          <div className="flex gap-x-2">
            <div className="text-base font-normal">Commenting as </div>

            <p
              onClick={(event: React.MouseEvent) => {
                event.stopPropagation();
                console.log("Redirect to user profile");
              }}
              className="text-white opacity-70 text-base font-semibold"
            >
              {displayName}
            </p>
          </div>
          <p
            onClick={(event: React.MouseEvent) => {
              event.stopPropagation();
              console.log("Redirect to user profile");
            }}
            className="text-white opacity-60 text-base"
          >
            @{username}
          </p>
        </div>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}

export default AddCommentWrapper;
