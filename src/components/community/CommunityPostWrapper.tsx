import { cn } from "@/lib/utils";
import { CommunityPost } from "@/types/postTypes";
import React from "react";
import { CustomAvatar } from "../common/CustomAvatar";

interface Props {
  className?: string;
  type?: string;
  post?: CommunityPost;
  children?: React.ReactNode;
}


function CommunityPostWrapper(props: Props) {
  const { className, post, children } = props;
  return (
    <div className={cn("flex gap-x-3", className)}>
      <div className={""} onClick={() => {}}>
        <CustomAvatar
          src={post?.author?.profilePic}
          fallBack={post?.author?.firstName?.charAt(0)}
        />
      </div>
      <div className="w-full">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <p
              onClick={() => {}}
              className="text-white opacity-70 text-base font-semibold"
            >
              Name Here
            </p>
            <p onClick={() => {}} className="text-white opacity-60 text-base">
              @Susan Khadka
            </p>
          </div>
          {/* <CustomDropdown options={options} /> */}
        </div>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}

export default CommunityPostWrapper;
