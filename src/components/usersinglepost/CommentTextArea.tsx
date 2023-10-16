import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { createCommentOnPost } from "@/features/comment/commentSlice";
import { addcommentSinglePostSuccess } from "@/features/usersinglepost/usersinglepostslice";
import { cn } from "@/lib/utils";
import { hasProperty } from "@/utils/generalUtils";
import { ChangeEvent, MouseEventHandler, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { CustomAvatar } from "../common/CustomAvatar";
import { Button } from "../ui/button";

function CommentTextArea() {
  const dispatch = useAppDispatch();
  const { postId } = useParams();
  const [comment, setComment] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const postButtonRef = useRef<HTMLButtonElement>(null);
  const currentUser = useAppSelector((state) => state.user);

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmitComment: MouseEventHandler = (e) => {
    e.preventDefault();
    dispatch(createCommentOnPost({ postId, content: comment })).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        if (hasProperty(res.payload, "data")) {
          console.log(res.payload);
          const commentData = res.payload.data.data;
          dispatch(addcommentSinglePostSuccess(commentData));
        }
        setComment("");
      }
    });
  };

  const handleRedirectToAuthorProfile = () => {};
  return (
    <div className={cn("flex gap-x-3 items-start")}>
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
                return textAreaRef.current!.blur();
              }}
              onChange={handleCommentChange}
              placeholder="Add a comment"
              className="w-full bg-[#27272a] border p-2 border-slate-600 rounded-md text-white h-[50px]"
              name="comment"
              id="comment-box"
              cols={100}
            ></textarea>
          </div>
        </div>
        <Button
          onClick={handleSubmitComment}
          className="hidden"
          ref={postButtonRef}
          variant={"secondary"}
        >
          Post
        </Button>
      </div>
    </div>
  );
}

export default CommentTextArea;
