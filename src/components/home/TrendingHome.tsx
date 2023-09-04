import { Card, CardContent } from "@/components/ui/card";
import PostCard from "../post/PostCard";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useEffect } from "react";
import { fetchTrendingPosts } from "@/features/home/homeSlice";

function TrendingHome() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTrendingPosts());
  }, [dispatch]);

  const trending = useAppSelector((state) => state.home.trending);
  return (
    <Card className="bg-[#27272A]">
      <CardContent className="space-y-4 p-4 text-white">
        {trending.posts.map((post) => {
          return <PostCard key={post._id} post={post} />;
        })}
      </CardContent>
    </Card>
  );
}

export default TrendingHome;
