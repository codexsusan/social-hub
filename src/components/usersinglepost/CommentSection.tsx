import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { cn } from "@/lib/utils";
import { CommentPartial } from "@/types/commentTypes";
import { ArrowBigDown, ArrowBigUp, Loader2, MessageCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import { CustomAvatar } from "../common/CustomAvatar";
import { getCommentsOnPostById } from "@/features/comment/commentSlice";
import { useEffect } from "react";

function CommentSection() {
  const { postId } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCommentsOnPostById(postId));
  }, [dispatch, postId]);

  const commentsData = useAppSelector((state) => state.usersinglepost.comment);

  return commentsData.loading ? (
    <div className="flex justify-center">
      <Loader2 className="animate-spin h-4 w-4" />
    </div>
  ) : (
    <div className="flex flex-col gap-2">
      {commentsData.comments &&
        commentsData.comments.map((comment) => {
          return <CommentCard comment={comment} />;
        })}
    </div>
  );
}

function CommentCard({ comment }: { comment: CommentPartial }) {
  const handleRedirectToAuthorProfile = () => {};
  const handleUpVote = () => {};
  const handleDownVote = () => {};

  //   TODO: Need to update from backend
  const VoteCount = 0;
  const CommentCount = 0;

  const upVoteStatus = false;
  const downVoteStatus = false;

  return (
    <div className={cn("flex gap-x-3")}>
      <div onClick={handleRedirectToAuthorProfile}>
        <CustomAvatar />
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <p
              onClick={handleRedirectToAuthorProfile}
              className="text-white opacity-70 text-base font-semibold"
            >
              {comment.author?.firstName + " " + comment.author?.lastName}
            </p>
            <p
              onClick={handleRedirectToAuthorProfile}
              className="text-white opacity-60 text-base"
            >
              @{comment.author?.userName}
            </p>
          </div>
        </div>
        <div>Hello</div>
        <div className="w-full">
          <div className="w-full flex gap-x-8 justify-normal items-center">
            <div className="flex gap-x-2">
              <ArrowBigUp
                onClick={handleUpVote}
                strokeWidth={1}
                fill={upVoteStatus ? "white" : ""}
              />
              <ArrowBigDown
                onClick={handleDownVote}
                strokeWidth={1}
                fill={downVoteStatus ? "white" : undefined}
              />
              {VoteCount}
            </div>
            <div className="flex gap-x-2">
              <MessageCircle strokeWidth={1} size={22} />
              {CommentCount}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentSection;
