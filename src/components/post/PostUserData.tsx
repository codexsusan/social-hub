import { PostPartial } from "@/types/postTypes";
import { CustomAvatar } from "../common/CustomAvatar";
// import { useEffect } from "react";
// import { useAppDispatch } from "@/app/hooks";
// import { fetchLatestPostUserData } from "@/features/home/homeSlice";
interface Props {
  className?: string;
  isBookmarked?: boolean;
  type?: string;
  post: PostPartial;
  children?: React.ReactNode;
}

function PostUserData(props: Props) {
  return (
    <div className="flex gap-x-3">
      <div
        className=""
        onClick={(event: React.MouseEvent) => {
          event.stopPropagation();
          console.log("Redirect to user profile");
        }}
      >
        <CustomAvatar />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <p
            onClick={(event: React.MouseEvent) => {
              event.stopPropagation();
              console.log("Redirect to user profile");
            }}
            className="text-white opacity-70 text-base font-semibold"
          >
            {props.post.author?.firstName + " " + props.post.author?.lastName}
          </p>
          <p
            onClick={(event: React.MouseEvent) => {
              event.stopPropagation();
              console.log("Redirect to user profile");
            }}
            className="text-white opacity-60 text-base"
          >
            @{props.post.author?.userName}
          </p>
        </div>
        <div>{props.children}</div>
      </div>
    </div>
  );
}

export default PostUserData;
