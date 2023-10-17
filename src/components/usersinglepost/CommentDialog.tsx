import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { CommentPartial } from "@/types/commentTypes";
import React, { ChangeEventHandler, MouseEventHandler, useState } from "react";
import { CustomAvatar } from "../common/CustomAvatar";
import CommentTextArea from "./CommentTextArea";
import { useAppDispatch } from "@/app/hooks";
import { createReplyOnComment } from "@/features/comment/commentSlice";
import { hasProperty } from "@/utils/generalUtils";
// import { addReplies } from "@/features/usersinglepost/usersinglepostslice";

function CommentDialog({
  children,
  comment,
}: {
  children: React.ReactNode;
  comment: CommentPartial;
}) {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [reply, setReply] = useState("");
  const handleReplyChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setReply(e.target.value);
  };

  const handleReplySubmit: MouseEventHandler = (e) => {
    e.preventDefault();
    dispatch(
      createReplyOnComment({
        content: reply,
        parentId: comment._id!,
        postId: comment.post_id!,
      })
    ).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        if (hasProperty(res.payload, "data")) {
          setIsOpen(false);
          setReply("");
          // addReplies(res.payload.data.data);
        }
      }
    });
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(!isOpen);
      }}
    >
      <DialogTrigger className="bg-transparent hover:bg-transparent" asChild>
        <Button onClick={() => setIsOpen(true)}>{children}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[720px] bg-[#09090b] text-white">
        <div className="flex flex-col gap-y-2 max-h-[425px] overflow-y-scroll">
          <div className={cn("flex gap-x-3")}>
            <div>
              <CustomAvatar src={comment.author?.profilePic} />
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <p className="text-white opacity-70 text-base font-semibold">
                    {comment.author?.firstName + " " + comment.author?.lastName}
                  </p>
                  <p className="text-white opacity-60 text-base">
                    @{comment.author!.userName}
                  </p>
                </div>
              </div>
              <div className="w-full">
                <div className="w-full flex gap-x-8 justify-normal items-center">
                  <div className="text-sm">{comment.content}</div>
                </div>
              </div>
            </div>
          </div>
          <CommentTextArea
            comment={reply}
            handleSubmit={handleReplySubmit}
            handleCommentChange={handleReplyChange}
            className="mt-2"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CommentDialog;
