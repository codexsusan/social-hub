import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Card, CardContent } from "../ui/card";
import { Loader } from "lucide-react";
import PostCard from "../post/PostCard";
import { useEffect } from "react";
import { fetchMostViewedPosts } from "@/features/home/mostviewedSlice";
import { toast } from "../ui/use-toast";

function MostViewedHome() {
  const dispatch = useAppDispatch();
  const mostviewed = useAppSelector((state) => state.home.mostviewed);

  useEffect(() => {
    mostviewed.posts.length == 0 &&
      dispatch(fetchMostViewedPosts()).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          toast({
            title: "Failed to load data.",
            duration: 2000,
            className: "bg-[#09090B] text-[#e2e2e2] border-none ",
          });
        }
      });
  }, [dispatch, mostviewed.posts.length]);
  return (
    <Card className="bg-[#27272A]">
      <CardContent className="space-y-4 p-4 text-white">
        <View />
      </CardContent>
    </Card>
  );
}

function View() {
  const mostviewed = useAppSelector((state) => state.home.mostviewed);
  return mostviewed.loading ? (
    <div className="flex justify-center">
      <Loader className=" animate-spin my-4" />
    </div>
  ) : (
    mostviewed.posts.map((post) => {
      return <PostCard type="most-viewed" key={post._id} post={post} />;
    })
  );
}

export default MostViewedHome;
