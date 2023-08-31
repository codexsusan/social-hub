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
        "xl:w-2/5 lg:w-3/5 md:w-4/5 w-full border rounded-sm bg-[#27272a] border-slate-600 flex gap-2 flex-col text-white p-4 cursor-pointer",
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
  const [actionStatus, setActionStatus] = React.useState<PostActionType>({
    upVote: false,
    downVote: false,
    comment: false,
    bookmarkStatus: false,
    upVoteCount: 0,
    downVoteCount: 0,
    commentCount: 0,
  });

  const handleUpVote = () => {
    setActionStatus({
      ...actionStatus,
      upVote: !actionStatus.upVote,
      downVote: false,
    });
  };

  const handleDownVote = () => {
    setActionStatus({
      ...actionStatus,
      downVote: !actionStatus.downVote,
      upVote: false,
    });
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
    actionStatus.upVote > actionStatus.downVote ? "Upvote" : "Downvote";

  const voteCountElement = (
    <div className="font-medium text-sm p-2 flex gap-2">
      <div className="">{actionStatus.upVoteCount}</div>
      <div className="hidden sm:block">{voteStatus}</div>
    </div>
  );

  return (
    <div className="w-full border-t-2 mt-4 pt-2 flex gap-x-3 justify-start my-2 items-center">
      <div className="flex items-center">
        <ButtonAction onClick={handleUpVote}>{upVoteElement}</ButtonAction>
        <ButtonAction onClick={handleDownVote}>{downVoteElement}</ButtonAction>
        {voteCountElement}
      </div>
      <div onClick={() => {}}>
        <MessageSquare />
      </div>
      <div className="flex gap-x-2 items-center justify-center">
        <div>746</div>
        <div className="hidden sm:block text-white">Comment</div>
      </div>
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

function ButtonAction(props: {
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
