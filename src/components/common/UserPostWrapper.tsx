import { PostPartial } from "@/types/postTypes";
import { CustomAvatar } from "./CustomAvatar";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import CustomDropdown from "./CustomDropdown";
import { Flag, Trash2 } from "lucide-react";
import { OptionType, contentType } from "@/types/generalTypes";
import { deletePost, reportPost } from "@/features/post/postSlice";
import { toast } from "../ui/use-toast";
import { hasProperty } from "@/utils/generalUtils";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthorRedirectData } from "@/types/userTypes";

interface Props {
  className?: string;
  type?: contentType;
  post?: PostPartial;
  children?: React.ReactNode;
  optionsVisibility: boolean;
}

function UserPostWrapper(props: Props) {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const origin = searchParams.get("origin");
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user);
  const { className, type, children, post, optionsVisibility } = props;
  const { firstName, lastName, userName } = user;

  const displayName =
    type === "comment"
      ? firstName + " " + lastName
      : post?.author?.firstName + " " + post?.author?.lastName;

  const username = type === "comment" ? userName : post?.author?.userName;

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
      displayStatus: post?.author?._id === user._id,
      label: "Delete",
      icon: <Trash2 />,
      action: deletePostCB,
    },
  ];

  const handleRedirectToAuthorProfile = (event: React.MouseEvent) => {
    event.stopPropagation();
    const userDetails: AuthorRedirectData = {
      id: post?.author?._id,
      username: post?.author?.userName,
    };
    navigate(`/user/${username}`, { state: userDetails });
  };

  return (
    <div className={cn("flex gap-x-3", className)}>
      <div className={""} onClick={handleRedirectToAuthorProfile}>
        <CustomAvatar
          src={post?.author?.profilePic}
          fallBack={post?.author?.firstName?.charAt(0)}
        />
      </div>
      <div className="w-full">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <p
              onClick={handleRedirectToAuthorProfile}
              className="text-white opacity-70 text-base font-semibold"
            >
              {displayName}
            </p>
            <p
              onClick={handleRedirectToAuthorProfile}
              className="text-white opacity-60 text-base"
            >
              @{username}
            </p>
          </div>
          {optionsVisibility && <CustomDropdown options={options} />}
        </div>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}

export default UserPostWrapper;
