import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Card, CardContent } from "../ui/card";
import { Loader } from "lucide-react";
import PostCard from "../post/PostCard";
import { useEffect } from "react";
import { fetchMostViewedPosts } from "@/features/home/mostviewedSlice";

function MostViewedHome() {
  const dispatch = useAppDispatch();
  const mostviewed = useAppSelector((state) => state.mostviewedpost);
  const userId = useAppSelector((state) => state.user._id);

  useEffect(() => {
    mostviewed.posts.length == 0 && dispatch(fetchMostViewedPosts(userId));
  }, [dispatch, mostviewed.posts.length, userId]);
  return (
    <Card className="bg-[#27272A]">
      <CardContent className="space-y-4 p-4 text-white">
        <View />
      </CardContent>
    </Card>
  );
}

function View() {
  const mostviewed = useAppSelector((state) => state.mostviewedpost);
  return mostviewed.loading ? (
    <div className="flex justify-center">
      <Loader className=" animate-spin my-4" />
    </div>
  ) : (
    mostviewed.posts.map((post) => {
      return <PostCard type="latest" key={post._id} post={post} />;
    })
  );
}

export default MostViewedHome;
