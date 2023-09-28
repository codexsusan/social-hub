import React from "react";
import { Skeleton } from "../ui/skeleton";

function CoverSkeleton(props: { children?: React.ReactNode }) {
  return (
    <div className="w-full flex flex-col flex-1 items-center p-4 gap-y-2 overflow-auto text-white">
      <div className="xl:w-2/5 lg:w-3/5 md:w-4/5 w-full p-2 flex gap-2">
        <div className="w-full h-40 rounded-md bg-[#27272a]">
          <div className="flex items-end h-full p-4 text-black gap-x-4">
            <div>
              <Skeleton className="w-28 h-28 rounded-full bg-black" />
            </div>
            <div className="flex justify-between mb-3 flex-grow mr-10 items-end">
              <div className="flex flex-col gap-y-2">
                <Skeleton className="w-36 h-6 rounded-sm bg-black" />
                <Skeleton className="w-36 h-6 rounded-sm bg-black" />
              </div>
              <div className="flex gap-x-2">
                <Skeleton className="w-20 h-10 rounded-sm bg-black" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {props.children}
    </div>
  );
}

export default CoverSkeleton;
