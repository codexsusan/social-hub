import { cn } from "@/lib/utils";
import { OptionType } from "@/types/generalTypes";
import { PostPartial } from "@/types/postTypes";
import { Flag, Trash2 } from "lucide-react";
import React from "react";
import { CustomAvatar } from "../common/CustomAvatar";
import CustomDropdown from "../common/CustomDropdown";

interface Props {
  className?: string;
  type?: string;
  post?: PostPartial;
  children?: React.ReactNode;
}

function CommunityPostWrapper(props: Props) {
  const { className, post, children } = props;
  const options: OptionType[] = [
    {
      displayStatus: true,
      label: "Report",
      icon: <Flag />,
      action: () => {},
    },
    {
      displayStatus: true,
      label: "Delete",
      icon: <Trash2 />,
      action: () => {},
    },
  ];
  return (
    <div className={cn("flex gap-x-3", className)}>
      <div className={""} onClick={() => {}}>
        <CustomAvatar
          src={post?.community?.icon_image}
          fallBack={post?.author?.firstName?.charAt(0)}
        />
      </div>
      <div className="w-full">
        <div className="flex justify-between">
          <div className="flex flex-col md:flex-row gap-x-2 items-start ">
            <div className="flex">
              <p
                onClick={() => {}}
                className="text-white opacity-70 text-base font-semibold hover:underline mr-1"
              >
                {post?.community?.name}
              </p>
              <p
                onClick={() => {}}
                className="text-white opacity-60 text-base "
              >
                @
                <span className="hover:underline">
                  {post?.community?.displayName}
                </span>
              </p>
            </div>
            <div className="border-l pl-2 border-gray-400/30 flex items-center gap-x-2">
              <p>via </p>
              <div className=" flex items-center ">
                <CustomAvatar
                  src={post?.author?.profilePic}
                  className="w-4 h-4 mr-1"
                />
                <span className="text-white opacity-60 text-base ">
                  @{post?.author?.userName}
                </span>
              </div>
            </div>
          </div>
          <CustomDropdown options={options} />
        </div>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}

export default CommunityPostWrapper;
