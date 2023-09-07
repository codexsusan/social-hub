// import { CustomAvatar } from "@/components/common/CustomAvatar";
// import { PostActions, PostBody } from "@/components/post/PostCard";
// import EditorView from "@/components/submit/EditorView";
// import { Separator } from "@/components/ui/separator";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { PostActions } from "@/components/post/PostCard";
import PostUserData from "@/components/post/PostUserData";
import { getPost } from "@/features/post/postSlice";
import { cn } from "@/lib/utils";
import { PostPartial } from "@/types/postTypes";
import { UserPartial } from "@/types/userTypes";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
// import { Pin } from "lucide-react";

function SinglePost() {
  const { postId } = useParams();
  const dispatch = useAppDispatch();
  const post: PostPartial = useAppSelector((state) => state.singlepost.post);
  const userId: UserPartial["_id"] = useAppSelector((state) => state.user._id);

  useEffect(() => {
    dispatch(getPost({ postId, userId }));
  }, [dispatch, postId, userId]);

  return (
    <div className="w-full flex flex-col flex-1 items-center p-4 gap-y-2 overflow-auto text-white">
      <div
        className={cn(
          "xl:w-2/5 lg:w-3/5 md:w-4/5 w-full border rounded-sm bg-[#27272a] border-slate-600 flex flex-col text-white p-4 cursor-pointer"
        )}
      >
        <PostUserData post={post} type="single-post">
          <div className="text-base mt-2 space-y-4 w-full">
            <div className="text-xl font-semibold">{post.title}</div>
            <div>{post.content}</div>
            <PostActions post={post} type={"single-post"} />
          </div>
        </PostUserData>
      </div>
    </div>
  );
}

export default SinglePost;
