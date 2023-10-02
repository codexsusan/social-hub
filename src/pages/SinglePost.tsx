import { useAppDispatch, useAppSelector } from "@/app/hooks";
import UserPostWrapper from "@/components/common/UserPostWrapper";
import EditorView from "@/components/submit/EditorView";
import { getPost } from "@/features/post/postSlice";
import { cn } from "@/lib/utils";
import { UserPartial } from "@/types/userTypes";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import AddCommentWrapper from "@/components/comment/AddCommentWrapper";
import {
  changepostcomment,
  createCommentOnPost,
  getCommentsOnPost,
} from "@/features/comment/commentSlice";
import CommentSection from "@/components/comment/CommentSection";
import PostActions from "@/components/post/PostActions";
import parser from "html-react-parser";
import CommentButton from "@/components/comment/CommentButton";

function SinglePost() {
  const { postId } = useParams();
  const dispatch = useAppDispatch();
  const userId: UserPartial["_id"] = useAppSelector((state) => state.user._id);

  useEffect(() => {
    dispatch(getPost({ postId, userId }));
    dispatch(getCommentsOnPost({ postId, userId }));
  }, [dispatch, postId, userId]);

  return (
    <div className="w-full flex flex-col flex-1 items-center p-4 gap-y-2 overflow-auto text-white">
      <div
        className={cn(
          "xl:w-2/5 lg:w-3/5 md:w-4/5 w-full border rounded-sm bg-[#27272a] border-slate-600 flex flex-col text-white p-4 cursor-pointer"
        )}
      >
        <PostView />
        <AddComment />
        <Separator className="my-4 self-center" orientation="horizontal" />
        <CommentSection />
      </div>
    </div>
  );
}

function PostView() {
  const singlePost = useAppSelector((state) => state.singlepage.post);
  const post = singlePost.post;
  const { title, content } = singlePost.post;
  const parsedContent = parser(content || "");
  return (
    <>
      {singlePost.loading ? (
        <Loader className="animate-spin self-center" />
      ) : (
        <UserPostWrapper post={post} type="post">
          <div className="text-base mt-2 space-y-4 w-full">
            <div className="text-xl font-semibold">{title}</div>
            <div>{parsedContent}</div>
            <PostActions post={post} type={"single-post"} />
          </div>
        </UserPostWrapper>
      )}
    </>
  );
}

function AddComment() {
  const dispatch = useAppDispatch();
  const singlePage = useAppSelector((state) => state.singlepage.post);
  const commentsData = useAppSelector((state) => state.singlepage.comment);
  const user = useAppSelector((state) => state.user);
  const post = singlePage.post;
  const comment = commentsData.current_comment;
  const changeComment = (content: string) => {
    dispatch(changepostcomment(content));
  };

  const handleCommentSubmitCB = () => {
    dispatch(createCommentOnPost({ postId: post._id, content: comment })).then(
      (res) => {
        if (res.meta.requestStatus === "fulfilled") {
          dispatch(getCommentsOnPost({ postId: post._id, userId: user._id }));
        }
      }
    );
  };

  return (
    <div className="mt-5">
      {post.comment_status ? (
        <AddCommentWrapper post={post} type="post">
          <EditorView
            content={comment}
            contentChangeCB={changeComment}
            src="comment"
            className="mt-2"
            height={200}
          />
          <CommentButton
            loading={commentsData.current_comment_loading}
            handleCommentSubmit={handleCommentSubmitCB}
          />
        </AddCommentWrapper>
      ) : null}
    </div>
  );
}

export default SinglePost;
