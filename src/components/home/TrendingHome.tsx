import { Card, CardContent } from "@/components/ui/card";
import PostCard from "../post/PostCard";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useEffect } from "react";
import { fetchTrendingPosts } from "@/features/home/homeSlice";
import { Loader } from "lucide-react";

function TrendingHome() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTrendingPosts());
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
  const trending = useAppSelector((state) => state.home.trending);
  return trending.loading ? (
    <div className="flex justify-center">
      <Loader className=" animate-spin my-4" />
    </div>
  ) : (
    trending.posts.map((post) => {
      return <PostCard key={post._id} post={post} />;
    })
  );
}

export default TrendingHome;
