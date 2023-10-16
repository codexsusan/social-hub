import { cn } from "@/lib/utils";
import { ArrowBigDown, ArrowBigUp, MessageCircle } from "lucide-react";
import { CustomAvatar } from "../common/CustomAvatar";

function CommentSection() {
  return (
    <div className="flex flex-col gap-2">
      <CommentCard />
    </div>
  );
}

function CommentCard() {
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
              {"displayName"}
            </p>
            <p
              onClick={handleRedirectToAuthorProfile}
              className="text-white opacity-60 text-base"
            >
              @{"username"}
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
