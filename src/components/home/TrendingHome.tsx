import { Card, CardContent } from "@/components/ui/card";
import PostCard from "../post/PostCard";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useEffect } from "react";

import { Loader } from "lucide-react";
import { fetchTrendingPosts } from "@/features/home/trendingSlice";

function TrendingHome() {
  const dispatch = useAppDispatch();
  const trending = useAppSelector((state) => state.trendingpost);
  const userId = useAppSelector((state) => state.user._id);
  useEffect(() => {
    trending.posts.length == 0 && dispatch(fetchTrendingPosts(userId));
  }, [dispatch, trending.posts.length, userId]);

  return (
    <Card className="bg-[#27272A]">
      <CardContent className="space-y-4 p-4 text-white">
        <View />
      </CardContent>
    </Card>
  );
}

function View() {
  const trending = useAppSelector((state) => state.trendingpost);
  return trending.loading ? (
    <div className="flex justify-center">
      <Loader className=" animate-spin my-4" />
    </div>
  ) : (
    trending.posts.map((post) => {
      return <PostCard type="trending" key={post._id} post={post} />;
    })
  );
}

export default TrendingHome;
