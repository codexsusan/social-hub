import { cn } from "@/lib/utils";
import React from "react";

function PageWrapper({
  LeftContent,
  RightContent,
  className,
}: {
  LeftContent: React.ReactNode;
  RightContent: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("bg-[#fbfffe] mt-4", className)}>
      <div className="grid grid-cols-1 bg-[#fbfffe] md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-14 2xl:grid-cols-16">
        <div className="col-span-1 md:col-start-2 md:col-span-10 lg:col-start-2 lg:col-span-7 xl:col-start-2 xl:col-span-9 2xl:col-start-2 2xl:col-span-9  overflow-y-auto">
          {LeftContent}
        </div>
        <div className="hidden lg:block lg:col-span-4 xl:col-span-4 2xl:col-start-12 2xl:col-span-4 px-5">
          {RightContent}
        </div>
      </div>
    </div>
  );
}

export default PageWrapper;
