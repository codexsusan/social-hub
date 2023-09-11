import { useAppSelector } from "@/app/hooks";
import { cn } from "@/lib/utils";
import CommentWrapper from "./CommentWrapper";
import CommentActions from "./CommentActions";
import { Loader } from "lucide-react";
import CommentEditor from "./CommentEditor";
import parser from "html-react-parser";

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
  return (
    <>
      {currentcomment.comments.map((comment) => {
        const parsedContent = parser(comment?.content || "");
        return (
          <CommentWrapper key={comment._id} comment={comment}>
            <div className="text-base">{parsedContent}</div>
            <CommentActions comment={comment} />
            {comment.comment_reply_status && <CommentEditor />}
          </CommentWrapper>
        );
      })}
    </>
  );
}

export default CommentSection;
