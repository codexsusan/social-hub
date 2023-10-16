import { useAppDispatch, useAppSelector } from "@/app/hooks";
import PageWrapper from "@/components/common/PageWrapper";
import UserPostWrapper from "@/components/common/UserPostWrapper";
import { Separator } from "@/components/ui/separator";
import CommentSection from "@/components/usersinglepost/CommentSection";
import CommentTextArea from "@/components/usersinglepost/CommentTextArea";
import { switchBookmark } from "@/features/bookmarks/bookmarkSlice";
import { downvotePost, upvotePost } from "@/features/post/postSlice";
import {
  downvoteSinglePostSuccess,
  fetchSinglePost,
  switchSinglePostBookmarkSuccess,
  upvoteSinglePostSuccess,
} from "@/features/usersinglepost/usersinglepostslice";
import Output from "editorjs-react-renderer";
import {
  ArrowBigDown,
  ArrowBigUp,
  Bookmark,
  MessageCircle,
} from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function UpdatedSinglePost() {
  return (
    <PageWrapper
      LeftContent={<LeftContent />}
      RightContent={<RightContent />}
    />
  );
}

const style = {
  paragraph: {
    fontSize: "1rem",
    lineHeight: "1.25rem",
  },
};

function LeftContent() {
  const { postId } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchSinglePost(postId));
  }, [dispatch, postId]);

  const postData = useAppSelector((state) => state.usersinglepost.post);

  const {
    title,
    upVoteStatus,
    downVoteStatus,
    upvotes_count,
    downvotes_count,
    comment_count,
    isBookmarked,
  } = postData;

  const VoteCount =
    upvotes_count! - downvotes_count! == 0
      ? "Vote"
      : upvotes_count! - downvotes_count!;

  const CommentCount = comment_count == 0 ? "Comment" : comment_count;

  const content = JSON.parse(postData!.content!);

  const handleUpVote = () => {
    dispatch(upvotePost(postData._id)).then((res) => {
      if (res.meta.requestStatus == "fulfilled") {
        dispatch(upvoteSinglePostSuccess());
      }
    });
  };

  const handleDownVote = () => {
    dispatch(downvotePost(postData._id)).then((res) => {
      if (res.meta.requestStatus == "fulfilled") {
        dispatch(downvoteSinglePostSuccess());
      }
    });
  };

  const switchBookmarkCB = () => {
    dispatch(switchBookmark(postData._id)).then((res) => {
      if (res.meta.requestStatus == "fulfilled") {
        dispatch(switchSinglePostBookmarkSuccess());
      }
    });
  };

  return (
    <div className="mt-4 flex justify-center">
      <div className="w-3/4 rounded-sm bg-[#27272a]  flex gap-5 flex-col text-white p-4 cursor-pointer hover:bg-[#1e1e1e]">
        <UserPostWrapper post={postData} type="post">
          <div className="text-base mt-2 space-y-4 w-full">
            <div className="text-xl font-semibold mb-2">{title}</div>
            <Output
              className="text-white border"
              style={style}
              data={content}
            />
            {/* Action Button */}
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
              <div>
                <Bookmark
                  onClick={switchBookmarkCB}
                  strokeWidth={1}
                  size={22}
                  fill={isBookmarked ? "white" : undefined}
                />
              </div>
            </div>
          </div>
        </UserPostWrapper>
        <Separator className="bg-slate-900/50 h-1" orientation="horizontal" />
        <CommentTextArea />
        <Separator className="bg-slate-900/50 h-1" orientation="horizontal" />
        <CommentSection />
      </div>
    </div>
  );
}

function RightContent() {
  return <div className="mt-4">Right Content</div>;
}

export default UpdatedSinglePost;
