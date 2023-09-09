import { useAppDispatch, useAppSelector } from "@/app/hooks";
import PostWrapper from "@/components/common/PostWrapper";
import EditorView from "@/components/submit/EditorView";
import { SinglePageState, getPost } from "@/features/post/postSlice";
import { cn } from "@/lib/utils";
import { UserPartial } from "@/types/userTypes";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import AddCommentWrapper from "@/components/comment/AddCommentWrapper";
import { getCommentsOnPost } from "@/features/comment/commentSlice";
import CommentSection from "@/components/comment/CommentSection";
import PostActions from "@/components/post/PostActions";

function SinglePost() {
  const { postId } = useParams();
  const dispatch = useAppDispatch();
  const userId: UserPartial["_id"] = useAppSelector((state) => state.user._id);

  useEffect(() => {
    dispatch(getPost({ postId, userId }));
    dispatch(getCommentsOnPost(postId));
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
  const singlePost = useAppSelector((state) => state.currentpost);
  const post = singlePost.post;
  const { title, content } = singlePost.post;
  return (
    <>
      {singlePost.loading ? (
        <Loader className="animate-spin" />
      ) : (
        <PostWrapper post={post} type="post">
          <div className="text-base mt-2 space-y-4 w-full">
            <div className="text-xl font-semibold">{title}</div>
            <div>{content}</div>
            <PostActions post={post} type={"single-post"} />
          </div>
        </PostWrapper>
      )}
    </>
  );
}

function AddComment() {
  const singlePage: SinglePageState = useAppSelector(
    (state) => state.currentpost
  );
  const post = singlePage.post;
  return (
    <div className="mt-5">
      {post.comment_status ? (
        <AddCommentWrapper post={post} type="comment">
          <EditorView src="comment" className="mt-2" height={200} />
        </AddCommentWrapper>
      ) : null}
    </div>
  );
}

export default SinglePost;
