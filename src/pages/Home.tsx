import CreatePost from "@/components/home/CreatePost";
import LatestHome from "@/components/home/LatestHome";
import MostViewedHome from "@/components/home/MostViewedHome";
import TrendingHome from "@/components/home/TrendingHome";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader } from "lucide-react";
import { Suspense } from "react";

function Home() {
  return (
    <div className="text-white bg-[#030303]">
      <div className="grid grid-cols-1 sm:grid-cols-5 md:grid-cols-4">
        <div className="col-span-1 sm:col-start-2 sm:col-span-3 md:col-span-2 md:col-start-2 overflow-y-auto">
          <div className="w-full flex gap-2 items-center bg-[#030303] flex-col p-2">
            <CreatePost />
            <Tabs defaultValue={"latest"} className="w-full">
              <TabsList className="grid w-full bg-[#27272A] grid-cols-3 ">
                <TabsTrigger value="latest">Latest</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="most-viewed">Most Viewed</TabsTrigger>
              </TabsList>
              <TabsContent value="latest">
                <Suspense fallback={<Loader />}>
                  <LatestHome />
                </Suspense>
              </TabsContent>
              <TabsContent value="trending">
                <Suspense fallback={<Loader />}>
                  <TrendingHome />
                </Suspense>
              </TabsContent>
              <TabsContent value="most-viewed">
                <Suspense fallback={<Loader />}>
                  <MostViewedHome />
                </Suspense>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="hidden lg:block mr-5 ">
          <div className="p-10 relative rounded-md top-36 w-full bg-[#27272a]"></div>
        </div>
      </div>
    </div>
  );
}

export default Home;
