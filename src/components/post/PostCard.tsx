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
import { PostActionType } from "@/types/postTypes";

function PostCard(props: { className?: string }) {
  return (
    <div
      className={cn(
        "w-full border rounded-sm bg-[#27272a] border-slate-600 flex gap-2 flex-col text-white p-4 cursor-pointer",
        props.className
      )}
    >
      <PostBody />
      <PostActions type="post" />
    </div>
  );
}

export function PostBody() {
  return (
    <>
      <PostUserData />
      <div
        onClick={() => {
          console.log("Redirect to single post page");
        }}
        className="text-base mt-2 space-y-4"
      >
        <div className="text-xl font-semibold">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi quaerat
          fugiat neque.
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
          repudiandae tenetur qui quasi ratione impedit porro doloremque quaerat
          minima nostrum perferendis, eligendi obcaecati dolore optio odit
          molestias illo dicta, aliquid inventore dignissimos, officiis illum!
          Cum omnis sed ducimus dolorem ab quas nisi tempore eligendi? Voluptas
          nemo optio ipsa autem itaque totam assumenda cumque, ea quam.
        </div>
      </div>
    </>
  );
}

export function PostActions(props: { isBookmarked?: boolean; type?: string }) {
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
    console.log(actionStatus);
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
    console.log(actionStatus);
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
