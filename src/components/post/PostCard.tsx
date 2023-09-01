import {
  ArrowBigDown,
  ArrowBigUp,
  Bookmark,
  MessageSquare,
} from "lucide-react";
import PostUserData from "./PostUserData";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

import React from "react";
import { PostActionType, PostPartial } from "@/types/postTypes";

interface Props {
  className?: string;
  isBookmarked?: boolean;
  type?: string;
  post: PostPartial;
}

function PostCard(props: Props) {
  return (
    <div
      className={cn(
        "w-full border rounded-sm bg-[#27272a] border-slate-600 flex gap-2 flex-col text-white p-4 cursor-pointer",
        props.className
      )}
    >
      <PostBody {...props} />
      <PostActions {...props} type="post" />
    </div>
  );
}

export function PostBody(props: Props) {
  return (
    <>
      <PostUserData {...props} />
      <div
        onClick={() => {
          console.log("Redirect to single post page");
        }}
        className="text-base mt-2 space-y-4"
      >
        <div className="text-xl font-semibold">{props.post.title}</div>
        <div>{props.post.content}</div>
      </div>
    </>
  );
}

export function PostActions(props: Props) {
  const initialState = {
    vote: 0,
    upVote: false,
    downVote: false,
    comment: false,
    bookmarkStatus: false,
    upVoteCount: 0,
    downVoteCount: 0,
    commentCount: 0,
  };
  const [actionStatus, setActionStatus] =
    React.useState<PostActionType>(initialState);

  const handleUpVote = () => {
    if (actionStatus.downVote) {
      setActionStatus({
        ...actionStatus,
        downVote: !actionStatus.downVote,
        downVoteCount: actionStatus.downVoteCount - 1,
        vote: actionStatus.vote + 1,
      });
    }
    if (actionStatus.upVote) {
      setActionStatus({
        ...actionStatus,
        upVote: !actionStatus.upVote,
        upVoteCount: actionStatus.upVoteCount - 1,
        downVote: false,
        vote: actionStatus.vote - 1,
      });
    } else if (!actionStatus.upVote) {
      setActionStatus({
        ...actionStatus,
        upVote: !actionStatus.upVote,
        upVoteCount: actionStatus.upVoteCount + 1,
        downVote: false,
        vote: actionStatus.vote + 1,
      });
    }
    // console.log(actionStatus);
  };

  const handleDownVote = () => {
    if (!actionStatus.downVote) {
      setActionStatus({
        ...actionStatus,
        downVote: !actionStatus.downVote,
        downVoteCount: actionStatus.downVoteCount - 1,
        vote: actionStatus.vote - 1,
        upVote: false,
      });
    } else if (actionStatus.downVote) {
      setActionStatus({
        ...actionStatus,
        downVote: !actionStatus.downVote,
        downVoteCount: actionStatus.downVoteCount + 1,
        vote: actionStatus.vote + 1,
        upVote: false,
      });
    }
    // console.log(actionStatus);
  };

  const upVoteElement = actionStatus.upVote ? (
    <ArrowBigUp fill="white" />
  ) : (
    <ArrowBigUp />
  );

  const downVoteElement = actionStatus.downVote ? (
    <ArrowBigDown fill="white" />
  ) : (
    <ArrowBigDown />
  );

  const voteStatus =
    actionStatus.upVote >= actionStatus.downVote ? "Upvote" : "Downvote";

  const voteCountElement = (
    <div className="text-sm p-2 flex gap-2">
      <div className="">{actionStatus.vote}</div>
      <div>{actionStatus.upVote}</div>
      <div>{actionStatus.downVote}</div>
      <div className="hidden sm:block">{voteStatus}</div>
    </div>
  );

  const commentCountElement = (
    <div className="flex gap-x-2 items-center justify-center text-sm">
      <div>746</div>
      <div className="hidden sm:block text-white">Comment</div>
    </div>
  );

  return (
    <div className="w-full border-t-2 mt-4 pt-2 flex gap-x-3 justify-start my-2 items-center">
      <div className="flex items-center">
        <ActionButton onClick={handleUpVote}>{upVoteElement}</ActionButton>
        <ActionButton onClick={handleDownVote}>{downVoteElement}</ActionButton>
        <div>{voteCountElement}</div>
      </div>
      <div onClick={() => {}}>
        <MessageSquare />
      </div>
      <div>{commentCountElement}</div>
      {props.type === "post" && (
        <>
          <Button
            onClick={() => {
              console.log("Handle bookmark action");
            }}
            className="bg-transparent"
          >
            <div className="flex gap-x-2 items-center justify-center">
              {props.isBookmarked ? <Bookmark fill="white" /> : <Bookmark />}

              <div className="hidden sm:block">Bookmark</div>
            </div>
          </Button>
        </>
      )}
    </div>
  );
}

function ActionButton(props: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Button onClick={props.onClick} className="bg-transparent px-2">
      {props.children}
    </Button>
  );
}

export default PostCard;
