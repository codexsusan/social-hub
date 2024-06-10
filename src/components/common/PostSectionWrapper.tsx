import React from "react";

function PostSectionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="xl:w-2/5 lg:w-3/5 md:w-4/5 w-full flex gap-2 text-white">
      <div className="bg-[#27272a] p-4 rounded-md w-full">{children}</div>
    </div>
  );
}

export default PostSectionWrapper;
