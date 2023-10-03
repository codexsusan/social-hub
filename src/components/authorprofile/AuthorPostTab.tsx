import { useAppSelector } from "@/app/hooks";
import { Loader } from "lucide-react";
import PostCard from "../post/PostCard";
import { Card, CardContent } from "../ui/card";

function UserPostTab() {
  return (
    <Card className="bg-[#27272A]">
      <CardContent className="space-y-4 p-4 text-white">
        <View />
      </CardContent>
    </Card>
  );
}

function View() {
  const postData = useAppSelector((state) => state.author.post);
  return postData.loading ? (
    <div className="flex justify-center">
      <Loader className=" animate-spin my-4" />
    </div>
  ) : (
    postData.posts.map((post) => {
      return <PostCard type="author-post" key={post._id} post={post} />;
    })
  );
}

export default UserPostTab;
