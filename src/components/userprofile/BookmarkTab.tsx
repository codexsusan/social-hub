import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Card, CardContent } from "../ui/card";
import { Loader } from "lucide-react";
import PostCard from "../post/PostCard";
import { useEffect } from "react";
import { getBookmarks } from "@/features/profile/bookmarkSlice";

function BookmarkTab() {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user._id);
  useEffect(() => {
    dispatch(getBookmarks());
  }, [dispatch, userId]);
  return (
    <Card className="bg-[#27272A]">
      <CardContent className="space-y-4 p-4 text-white">
        <View />
      </CardContent>
    </Card>
  );
}

function View() {
  const postData = useAppSelector((state) => state.profile.bookmarks);
  return postData.loading ? (
    <div className="flex justify-center">
      <Loader className=" animate-spin my-4" />
    </div>
  ) : (
    postData.posts.map((post) => {
      return <PostCard key={post._id} type="profile-bookmark" post={post} />;
    })
  );
}

export default BookmarkTab;
