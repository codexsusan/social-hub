import { Card, CardContent } from "../ui/card";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useEffect } from "react";
import { getPostsByUser } from "@/features/profile/postSlice";
import { Loader } from "lucide-react";
import PostCard from "../post/PostCard";

function PostTab() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPostsByUser());
  }, [dispatch]);
  return (
    <Card className="bg-[#27272A]">
      <CardContent className="space-y-4 p-4 text-white">
        <View />
      </CardContent>
    </Card>
  );
}

function View() {
  const postData = useAppSelector((state) => state.profile.posts);
  return postData.loading ? (
    <div className="flex justify-center">
      <Loader className=" animate-spin my-4" />
    </div>
  ) : (
    postData.posts.map((post) => {
      return <PostCard type="profile-post" key={post._id} post={post} />;
    })
  );
}

export default PostTab;
