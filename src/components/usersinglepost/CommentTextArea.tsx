import { useAppSelector } from "@/app/hooks";
import { cn } from "@/lib/utils";
import { AuthorRedirectData } from "@/types/userTypes";
import { ChangeEventHandler, MouseEventHandler, useRef } from "react";
import { CustomAvatar } from "../common/CustomAvatar";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

function CommentTextArea({
  comment,
  className,
  handleCommentChange,
  handleSubmit,
}: {
  comment: string;
  className?: string;
  handleCommentChange: ChangeEventHandler<HTMLTextAreaElement>;
  handleSubmit: MouseEventHandler;
}) {
  const navigate = useNavigate();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const postButtonRef = useRef<HTMLButtonElement>(null);
  const currentUser = useAppSelector((state) => state.user);

  const handleRedirectToAuthorProfile: MouseEventHandler = (e) => {
    e.stopPropagation();
    const userDetails: AuthorRedirectData = {
      id: currentUser._id,
      username: currentUser.userName,
    };
    navigate(`/user/${currentUser.userName}`, { state: userDetails });
  };
  return (
    <div className={cn("flex gap-x-3 items-start px-2", className)}>
      <div className={"mt-1"} onClick={handleRedirectToAuthorProfile}>
        <CustomAvatar
          src={currentUser.profilePic}
          fallBack={currentUser.firstName?.charAt(0)}
        />
      </div>
      <div className="w-full flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <textarea
              value={comment}
              ref={textAreaRef}
              onFocus={() => {
                textAreaRef.current!.style.height = "100px";
                postButtonRef.current!.style.display = "block";
                return textAreaRef.current!.focus();
              }}
              onBlur={() => {
                if (textAreaRef.current?.value.length === 0) {
                  textAreaRef.current!.style.height = "50px";
                  postButtonRef.current!.style.display = "none";
                }
                return textAreaRef.current!.blur();
              }}
              onChange={handleCommentChange}
              placeholder="Add a comment"
              className="w-full border border-gray-500/30 bg-[#AFFEFA] p-2 rounded-md text-lg h-[50px]"
              name="comment"
              id="comment-box"
              cols={95}
            ></textarea>
          </div>
        </div>
        <Button
          onClick={handleSubmit}
          className="hidden"
          ref={postButtonRef}
          variant={"default"}
        >
          Post
        </Button>
      </div>
    </div>
  );
}

export default CommentTextArea;
