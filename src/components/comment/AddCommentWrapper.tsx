import { useAppSelector } from "@/app/hooks";
import { cn } from "@/lib/utils";
import { contentType } from "@/types/generalTypes";
import { PostPartial } from "@/types/postTypes";
import React from "react";
interface Props {
  className?: string;
  type?: contentType;
  post?: PostPartial;
  children?: React.ReactNode;
}

function AddCommentWrapper(props: Props) {
  const { className, children } = props;
  const user = useAppSelector((state) => state.user);
  const { firstName, lastName, userName } = user;

  const displayName = firstName + " " + lastName;

  const username = userName;
  return (
    <div className={cn("flex gap-x-3", className)}>
      <AlignmentBox {...props} />
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
        <div className="w-full flex flex-col">{children}</div>
      </div>
    </div>
  );
}

function AlignmentBox(props: Props) {
  return <>{props.type === "post" ? <div className={"w-10"}></div> : null}</>;
}

export default AddCommentWrapper;
