import { cn } from "@/lib/utils";
import { OptionType } from "@/types/generalTypes";
import { PostPartial } from "@/types/postTypes";
import { Flag, Trash2 } from "lucide-react";
import React, { MouseEventHandler } from "react";
import { CustomAvatar } from "../common/CustomAvatar";
import CustomDropdown from "../common/CustomDropdown";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { deletePost, reportPost } from "@/features/post/postSlice";
import { hasProperty } from "@/utils/generalUtils";
import { toast } from "../ui/use-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthorRedirectData } from "@/types/userTypes";

interface Props {
  className?: string;
  type?: string;
  post?: PostPartial;
  children?: React.ReactNode;
  optionsVisibility: boolean;
}

function CommunityPostWrapper(props: Props) {
  const { className, post, children, optionsVisibility } = props;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const origin = searchParams.get("origin");

  const currentUser = useAppSelector((state) => state.user);

  const handleRedirectToCommunityProfile: MouseEventHandler = (e) => {
    e.stopPropagation();
    navigate(`/c/${post?.community._id}`);
  };

  const handleRedirectToAuthorProfile: MouseEventHandler = (e) => {
    e.stopPropagation();
    const userDetails: AuthorRedirectData = {
      id: post?.author?._id,
      username: post?.author?.userName,
    };
    navigate(`/user/${post?.author?.userName}`, { state: userDetails });
  };

  const reportPostCB = () => {
    dispatch(reportPost(post!._id)).then((res) => {
      if (hasProperty(res.payload, "data")) {
        toast({
          description: res.payload.data.message,
          duration: 2000,
          className: "bg-[#09090B] text-[#e2e2e2] border-none ",
        });
      }
    });
  };

  const deletePostCB = () => {
    dispatch(deletePost(post!._id)).then((res) => {
      navigate(origin ? origin : "/", { replace: true });
      if (hasProperty(res.payload, "data")) {
        toast({
          description: res.payload.data.message,
          duration: 2000,
          className: "bg-[#09090B] text-[#e2e2e2] border-none ",
        });
      }
    });
  };

  const options: OptionType[] = [
    {
      displayStatus: true,
      label: "Report",
      icon: <Flag />,
      action: reportPostCB,
    },
    {
      displayStatus: post?.author?._id === currentUser._id,
      label: "Delete",
      icon: <Trash2 />,
      action: deletePostCB,
    },
  ];
  return (
    <div className={cn("flex gap-x-3", className)}>
      <div
        className={""}
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/c/${post?.community._id}`);
        }}
      >
        <CustomAvatar
          src={post?.community?.icon_image}
          fallBack={post?.community?.displayName?.charAt(0)}
        />
      </div>
      <div className="w-full">
        <div className="flex justify-between">
          <div className="flex flex-col md:flex-row gap-x-2 items-start ">
            <div className="flex">
              <p
                onClick={handleRedirectToCommunityProfile}
                className="text-black opacity-70 text-lg font-semibold hover:underline mr-1"
              >
                {post?.community?.name}
              </p>
              <p
                onClick={handleRedirectToCommunityProfile}
                className="text-black opacity-60 text-base font-normal"
              >
                @
                <span className="hover:underline">
                  {post?.community?.displayName}
                </span>
              </p>
            </div>
            <div className="border-l pl-2 border-gray-400/30 flex items-center gap-x-2">
              <p>via </p>
              <div
                onClick={handleRedirectToAuthorProfile}
                className=" flex items-center "
              >
                <CustomAvatar
                  src={post?.author?.profilePic}
                  className="w-4 h-4 mr-1"
                />
                <span className="text-black opacity-60 text-base hover:underline">
                  @{post?.author?.userName}
                </span>
              </div>
            </div>
          </div>
          {optionsVisibility && <CustomDropdown options={options} />}
        </div>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}

export default CommunityPostWrapper;
