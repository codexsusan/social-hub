import {
  ArrowBigDown,
  ArrowBigUp,
  Bookmark,
  MessageCircle,
  MessageSquare,
} from "lucide-react";
import PostUserData from "./PostUserData";
import parser from "html-react-parser";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

import React from "react";
import { PostActionType, PostPartial } from "@/types/postTypes";
import { useNavigate } from "react-router-dom";

interface Props {
  className?: string;
  type?: string;
  post: PostPartial;
}

function PostCard(props: Props) {
  const { post, type, className } = props;
  const navigate = useNavigate();
  const routeToSinglePost = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/c/${post.community_id}/post/${post._id}`);
  };

  return (
    <div
      onClick={routeToSinglePost}
      className={cn(
        "w-full border rounded-sm bg-[#27272a] border-slate-600 flex gap-2 flex-col text-white p-4 cursor-pointer hover:bg-[#1e1e1e]",
        className
      )}
    >
      <PostUserData {...props}>
        <div className="text-base mt-2 space-y-4">
          <div className="text-xl font-semibold">{post.title}</div>
          <div>{post.content}</div>
          <PostActions {...props} type="post" />
        </div>
      </PostUserData>
    </div>
  );
}

export function PostBody(props: Props) {
  const content = parser(props.post.content || "");
  return (
    <>
      <PostUserData {...props}>
        <div className="text-base mt-2 space-y-4">
          <div className="text-xl font-semibold">{props.post.title}</div>
          <div>{content}</div>
        </div>
      </PostUserData>
    </>
  );
}

export function PostActions(props: Props) {
  const { post } = props;
  const VoteCount = post.upvotes! - post.downvotes! == 0 ? "" : null;
  return (
    <div className="w-full flex gap-x-3 justify-between my-2 items-center">
      <div className="flex gap-x-2">
        <ArrowBigUp strokeWidth={1} />
        <ArrowBigDown strokeWidth={1} />
        {VoteCount}
      </div>
      <div className="flex gap-x-2">
        <MessageCircle strokeWidth={1} size={22} />
        {post.comment_count}
      </div>
      <div>
        <Bookmark strokeWidth={1} size={22} />
      </div>
    </div>
  );
}

// export function PostActions(props: Props) {
//   const initialState = {
//     vote: 0,
//     upVote: false,
//     downVote: false,
//     comment: false,
//     bookmarkStatus: false,
//     upVoteCount: 0,
//     downVoteCount: 0,
//     commentCount: 0,
//   };
//   const [actionStatus, setActionStatus] =
//     React.useState<PostActionType>(initialState);

//   const handleUpVote = () => {
//     if (actionStatus.downVote) {
//       setActionStatus({
//         ...actionStatus,
//         downVote: !actionStatus.downVote,
//         downVoteCount: actionStatus.downVoteCount - 1,
//         vote: actionStatus.vote + 1,
//       });
//     }
//     if (actionStatus.upVote) {
//       setActionStatus({
//         ...actionStatus,
//         upVote: !actionStatus.upVote,
//         upVoteCount: actionStatus.upVoteCount - 1,
//         downVote: false,
//         vote: actionStatus.vote - 1,
//       });
//     } else if (!actionStatus.upVote) {
//       setActionStatus({
//         ...actionStatus,
//         upVote: !actionStatus.upVote,
//         upVoteCount: actionStatus.upVoteCount + 1,
//         downVote: false,
//         vote: actionStatus.vote + 1,
//       });
//     }
//     // console.log(actionStatus);
//   };

//   const handleDownVote = () => {
//     if (!actionStatus.downVote) {
//       setActionStatus({
//         ...actionStatus,
//         downVote: !actionStatus.downVote,
//         downVoteCount: actionStatus.downVoteCount - 1,
//         vote: actionStatus.vote - 1,
//         upVote: false,
//       });
//     } else if (actionStatus.downVote) {
//       setActionStatus({
//         ...actionStatus,
//         downVote: !actionStatus.downVote,
//         downVoteCount: actionStatus.downVoteCount + 1,
//         vote: actionStatus.vote + 1,
//         upVote: false,
//       });
//     }
//   };

//   const upVoteElement = actionStatus.upVote ? (
//     <ArrowBigUp fill="white" />
//   ) : (
//     <ArrowBigUp />
//   );

//   const downVoteElement = actionStatus.downVote ? (
//     <ArrowBigDown fill="white" />
//   ) : (
//     <ArrowBigDown />
//   );

//   const voteStatus =
//     actionStatus.upVote >= actionStatus.downVote ? "Upvote" : "Downvote";

//   const voteCountElement = (
//     <div className="text-sm p-2 flex gap-2">
//       <div className="">{actionStatus.vote}</div>
//       <div>{actionStatus.upVote}</div>
//       <div>{actionStatus.downVote}</div>
//       <div className="hidden sm:block">{voteStatus}</div>
//     </div>
//   );

//   const commentCountElement = (
//     <div className="flex gap-x-2 items-center justify-center text-sm">
//       <div>746</div>
//       {/* <div className="hidden sm:block text-white">Comment</div> */}
//     </div>
//   );

//   return (
//     <div className="w-full flex gap-x-3 justify-between my-2 items-center">
//       <div className="flex items-center">
//         <ActionButton onClick={handleUpVote}>{upVoteElement}</ActionButton>
//         <ActionButton onClick={handleDownVote}>{downVoteElement}</ActionButton>
//         <div>{voteCountElement}</div>
//       </div>
//       <div onClick={() => {}}>
//         <MessageSquare />
//       </div>
//       <div>{commentCountElement}</div>
//       {props.type === "post" && (
//         <>
//           <Button
//             onClick={() => {
//               console.log("Handle bookmark action");
//             }}
//             className="bg-transparent"
//           >
//             <div className="flex gap-x-2 items-center justify-center">
//               {props.post.bookmark_status ? (
//                 <Bookmark fill="white" />
//               ) : (
//                 <Bookmark />
//               )}

//               <div className="hidden sm:block">Bookmark</div>
//             </div>
//           </Button>
//         </>
//       )}
//     </div>
//   );
// }

// function ActionButton(props: {
//   children: React.ReactNode;
//   onClick?: () => void;
// }) {
//   return (
//     <Button onClick={props.onClick} className="bg-transparent px-2">
//       {props.children}
//     </Button>
//   );
// }

export default PostCard;
