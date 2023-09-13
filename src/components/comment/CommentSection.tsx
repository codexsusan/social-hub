import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { cn } from "@/lib/utils";
import CommentWrapper from "./CommentWrapper";
import CommentActions from "./CommentActions";
import { Loader } from "lucide-react";
import CommentEditor from "./CommentEditor";
import parser from "html-react-parser";
import CommentButton from "./CommentButton";
import {
  changecommentreply,
  createReplyOnComment,
} from "@/features/comment/commentSlice";
import { NestedComment } from "@/types/commentTypes";

function CommentSection() {
  const currentcomment = useAppSelector((state) => state.currentcomment);
  const { loading } = currentcomment;

  return (
    <div className="mt-5">
      <div className={cn("flex gap-x-3 ")}>
        <div className={"w-10"}></div>
        <div className="flex flex-col gap-4 w-full">
          {loading ? <Loader className="animate-spin self-center" /> : <View />}
        </div>
      </div>
    </div>
  );
}

function View() {
  const currentcomment = useAppSelector((state) => state.currentcomment);
  const currentPost = useAppSelector((state) => state.currentpost);
  const dispatch = useAppDispatch();

  const handleReplySubmitCB = (comment: NestedComment) => {
    dispatch(
      createReplyOnComment({
        content: comment.comment_current_reply,
        postId: currentPost.post._id,
        parentId: comment._id,
      })
    ).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        console.log("fulfilled");
      }
      console.log(res);
    });
  };

  return (
    <>
      {currentcomment.comments.map((comment) => {
        const parsedContent = parser(comment?.content || "");
        return (
          <CommentWrapper key={comment._id} comment={comment}>
            <div className="text-base">{parsedContent}</div>
            <CommentActions comment={comment} />
            {comment.comment_reply_status && (
              <>
                {comment.replies_count > 0 && (
                  <>
                    {comment.comment_replies &&
                      comment.comment_replies.map((reply) => {
                        const parsedReply = parser(reply?.content || "");

                        return (
                          <CommentWrapper
                            key={reply._id}
                            comment={reply}
                            className="flex gap-y-4 my-4"
                          >
                            <div className="text-base">{parsedReply}</div>
                            <CommentActions comment={reply} />
                          </CommentWrapper>
                        );
                      })}
                  </>
                )}
                <div className="flex flex-col">
                  <CommentEditor
                    comment={comment}
                    contentChangeCB={(content: string) => {
                      dispatch(
                        changecommentreply({
                          commentId: comment._id,
                          reply: content,
                        })
                      );
                    }}
                  />
                  <CommentButton
                    loading={comment.comment_current_reply_loading}
                    handleCommentSubmit={() => {
                      handleReplySubmitCB(comment);
                    }}
                  />
                </div>
              </>
            )}
          </CommentWrapper>
        );
      })}
    </>
  );
}

export default CommentSection;
