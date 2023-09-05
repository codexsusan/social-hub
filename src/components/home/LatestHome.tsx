import { Card, CardContent } from "@/components/ui/card";
import PostCard from "../post/PostCard";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useEffect } from "react";
import { fetchLatestPosts } from "@/features/home/homeSlice";
import Spinner from "../common/Spinner";

function LatestHome() {
  const dispatch = useAppDispatch();
  const latest = useAppSelector((state) => state.home.latest);
  
  useEffect(() => {
    latest.posts.length === 0 &&
      dispatch(fetchLatestPosts({ page: 1, limit: 10 }));
  }, [dispatch, latest.posts.length]);

  return (
    <Card className="bg-[#27272A]">
      <CardContent className="space-y-4 p-4 text-white">
        <View />
      </CardContent>
    </Card>
  );
}

function View() {
  const latest = useAppSelector((state) => state.home.latest);
  return latest.loading ? (
    <Spinner />
  ) : (
    latest.posts &&
      latest.posts.map((post) => {
        return <PostCard key={post._id} post={post} />;
      })
  );
}

export default LatestHome;
