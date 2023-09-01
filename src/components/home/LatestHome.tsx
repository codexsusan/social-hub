import { Card, CardContent } from "@/components/ui/card";
import PostCard from "../post/PostCard";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useEffect } from "react";
import { fetchLatestPosts } from "@/features/home/homeSlice";

function LatestHome() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchLatestPosts());
  }, []);
  const latest = useAppSelector((state) => state.home.latest);
  

  return (
    <Card className="bg-[#27272A]">
      <CardContent className="space-y-4 p-4 text-white">
        {latest.posts.map((post) => {
          return <PostCard key={post._id} post={post} />;
        })}
      </CardContent>
    </Card>
  );
}

export default LatestHome;
