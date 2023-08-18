import React from "react";
import { CustomAvatar } from "../common/CustomAvatar";
import IconButton from "../common/IconButton";

function CreatePost() {
  return (
    <div className="w-2/5 p-2 border rounded-sm border-slate-600 flex gap-2">
      {/* <div><Images source={logo} /></div> */}
      <CustomAvatar />
      <div className="bg-[#171717] flex flex-1 pl-2 text-gray-400 items-center py-2 rounded-sm">
        Create Post
      </div>
      <IconButton
        name="image-plus"
        onClick={() => {
          console.log("Hello");
        }}
      />
    </div>
  );
}

export default CreatePost;
