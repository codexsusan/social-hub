import { CommentSectionInitialState } from "@/features/communitysinglepost/communitysinglepostslice";
import { Loader2 } from "lucide-react";
import CommentCard from "./CommentCard";

function CommentSection({
  commentsData,
  source,
}: {
  commentsData: CommentSectionInitialState;
  source: string;
}) {
  return commentsData.loading ? (
    <div className="flex justify-center py-10">
      <Loader2 className="animate-spin h-4 w-4" />
    </div>
  ) : (
    <div className="flex flex-col divide-y divide-slate-400/90">
      {commentsData.comments &&
        commentsData.comments.map((comment) => {
          return (
            <CommentCard source={source} key={comment._id!} comment={comment} />
          );
        })}
      {commentsData.comments?.length === 0 && (
        <div className="flex justify-center py-10">
          <p className="text-white">No comments yet</p>
        </div>
      )}
    </div>
  );
}

export default CommentSection;
