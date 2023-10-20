import { useAppDispatch } from "@/app/hooks";
import {
  getCommentsOnPostById
} from "@/features/comment/commentSlice";
import { CommentSectionInitialState } from "@/features/communitysinglepost/communitysinglepostslice";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CommentCard from "./CommentCard";

function CommentSection({
  commentsData,
}: {
  commentsData: CommentSectionInitialState;
}) {
  const { postId } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCommentsOnPostById(postId));
  }, [dispatch, postId]);

  return commentsData.loading ? (
    <div className="flex justify-center py-10">
      <Loader2 className="animate-spin h-4 w-4" />
    </div>
  ) : (
    <div className="flex flex-col divide-y divide-slate-400/90">
      {commentsData.comments &&
        commentsData.comments.map((comment) => {
          return <CommentCard key={comment._id!} comment={comment} />;
        })}
    </div>
  );
}


export default CommentSection;
