import { NestedComment } from "@/types/commentTypes";
import parser from "html-react-parser";
import { cn } from "@/lib/utils";
import { CustomAvatar } from "../common/CustomAvatar";
import CommentReplyActions from "./CommentReplyAction";

function CommentReply(props: { reply: NestedComment }) {
  const { reply } = props;

  const parsedReply = parser(reply?.content || "");
  return (
    <div className={cn("flex gap-x-3 my-4")}>
      <div
        className={""}
        onClick={(event: React.MouseEvent) => {
          event.stopPropagation();
          console.log("Redirect to user profile");
        }}
      >
        <CustomAvatar />
      </div>
      <div className="w-full">
        <div className="flex items-center gap-2">
          <p
            onClick={(event: React.MouseEvent) => {
              event.stopPropagation();
              console.log("Redirect to user profile");
            }}
            className="text-white opacity-70 text-base font-semibold"
          >
            {reply?.author?.firstName + " " + reply?.author?.lastName}
          </p>
          <p
            onClick={(event: React.MouseEvent) => {
              event.stopPropagation();
              console.log("Redirect to user profile");
            }}
            className="text-white opacity-60 text-base"
          >
            @{reply?.author?.userName}
          </p>
        </div>
        {/* Children should be here as */}
        <div className="text-base">{parsedReply}</div>
        <CommentReplyActions reply={reply} />
      </div>
    </div>
  );
}

export default CommentReply;
