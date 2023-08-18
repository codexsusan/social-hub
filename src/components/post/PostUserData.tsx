import React from "react";
import { CustomAvatar } from "../common/CustomAvatar";

function PostUserData() {
  return (
    <div className="flex gap-x-3 items-center">
      <CustomAvatar />
      <div>
        <p className="text-white opacity-70 text-base">c/communityx</p>
        <p className="text-white opacity-60 text-xs">u/codexsusan</p>
      </div>
    </div>
  );
}

export default PostUserData;
