import { useAppSelector } from "@/app/hooks";
import { cn } from "@/lib/utils";
import CommentWrapper from "./CommentWrapper";
import CommentActions from "./CommentActions";
import { Loader } from "lucide-react";

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
        return (
          <>
            <CommentWrapper key={comment._id} comment={comment}>
              <div className="text-base">{comment?.content}</div>
              <CommentActions comment={comment} />
            </CommentWrapper>
          </>
        );
      })}
    </>
  );
}

export default CommentSection;
