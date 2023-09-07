import { Card, CardContent } from "@/components/ui/card";
import PostCard from "../post/PostCard";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useEffect } from "react";

import { Loader } from "lucide-react";
import { fetchLatestPosts } from "@/features/home/latestSlice";

function LatestHome() {
  const dispatch = useAppDispatch();
  const latest = useAppSelector((state) => state.latestpost);
  const user = useAppSelector((state) => state.user);
  useEffect(() => {
    latest.posts.length == 0 && dispatch(fetchLatestPosts(user._id));
  }, [dispatch, latest.posts.length, user._id]);

  return (
    <Card className="bg-[#27272A]">
      <CardContent className="space-y-4 p-4 text-white">
        <View />
      </CardContent>
    </Card>
  );
}

function View() {
  const latest = useAppSelector((state) => state.latestpost);
  return latest.loading ? (
    <div className="flex justify-center">
      <Loader className=" animate-spin my-4" />
    </div>
  ) : (
    latest.posts.map((post) => {
      return <PostCard key={post._id} post={post} />;
    })
  );
}

export default LatestHome;
