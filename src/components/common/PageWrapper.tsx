import React from "react";

function PageWrapper({
  LeftContent,
  RightContent,
}: {
  LeftContent: React.ReactNode;
  RightContent: React.ReactNode;
}) {
  return (
    <div className="text-white bg-[#030303]">
      <div className="grid grid-cols-1 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-8 xl:grid-cols-9">
        <div className="col-span-1 sm:col-start-2 sm:col-span-3 md:col-span-5 md:col-start-2 lg:col-start-2 lg:col-span-5 xl:col-span-5 xl:col-start-2 overflow-y-auto">
          {LeftContent}
        </div>
        <div className="hidden lg:block lg:col-span-2 px-5">{RightContent}</div>
      </div>
    </div>
  );
}

export default PageWrapper;
