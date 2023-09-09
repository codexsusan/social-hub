import { PostPartial } from "@/types/postTypes";
import { CustomAvatar } from "./CustomAvatar";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/app/hooks";

type sourceType = "post" | "comment";

interface Props {
  className?: string;
  type?: sourceType;
  post?: PostPartial;
  children?: React.ReactNode;
}

function PostWrapper(props: Props) {
  const { className, type, children, post } = props;
  const user = useAppSelector((state) => state.user);
  const { firstName, lastName, userName } = user;

  const displayName =
    type === "comment"
      ? firstName + " " + lastName
      : post?.author?.firstName + " " + post?.author?.lastName;

  const username = type === "comment" ? userName : post?.author?.userName;

  return (
    <div className={cn("flex gap-x-3", className)}>
      <div
        className={""}
        onClick={(event: React.MouseEvent) => {
          event.stopPropagation();
          console.log("Redirect to user profile");
        }}
      >
        <CustomAvatar />
      </div>
      <div className="w-full">
        <div className="flex items-center gap-2">
          <p
            onClick={(event: React.MouseEvent) => {
              event.stopPropagation();
              console.log("Redirect to user profile");
            }}
            className="text-white opacity-70 text-base font-semibold"
          >
            {displayName}
          </p>
          <p
            onClick={(event: React.MouseEvent) => {
              event.stopPropagation();
              console.log("Redirect to user profile");
            }}
            className="text-white opacity-60 text-base"
          >
            @{username}
          </p>
        </div>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}

export default PostWrapper;
