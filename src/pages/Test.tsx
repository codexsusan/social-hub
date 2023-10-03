import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchLatestPosts } from "@/features/home/latestSlice";
import { Loader } from "lucide-react";
import { Suspense, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function Test() {
  const latestPosts = useAppSelector((state) => state.home.latest.posts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLatestPosts());
  }, [dispatch]);

  const fetchData = () => {
    console.log("Fetch more data");
    // Fetch more data here and append it to the 'items' array.
    // Update 'hasMore' to indicate if there is more data to fetch.
  };
  return (
    <div className="w-full flex flex-col flex-1 items-center p-4 gap-y-2 bg-[#030303]">
      <div className="xl:w-2/5 lg:w-3/5 md:w-4/5 w-full flex gap-2 items-center ">
        <Tabs defaultValue={"latest"} className="w-full">
          <TabsList className="grid w-full bg-[#27272A] grid-cols-3 ">
            <TabsTrigger value="latest">Latest</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="popular">Most Viewed</TabsTrigger>
          </TabsList>
          <TabsContent value="latest">
            <Suspense fallback={<Loader />}>
              <InfiniteScroll
              className="mt-0"
                dataLength={latestPosts.length}
                next={fetchData}
                hasMore={true}
                loader={<h4 className="bg-slate-700">Loading...</h4>}
              >
                {latestPosts.map((post, index) => (
                  <div className="text-white p-10" key={post._id}>
                    div - #{index}
                  </div>
                ))}
              </InfiniteScroll>
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Test;

// <div className="xl:w-2/5 lg:w-3/5 md:w-4/5 w-full flex gap-2 text-white">
