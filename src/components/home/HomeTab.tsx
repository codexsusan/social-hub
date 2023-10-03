import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader } from "lucide-react";
import { Suspense } from "react";
import CreatePost from "./CreatePost";
import LatestHome from "./LatestHome";
import MostViewedHome from "./MostViewedHome";
import TrendingHome from "./TrendingHome";

function HomeTab() {
  return (
    <div className="w-full flex flex-col flex-1 items-center p-4 gap-y-2 overflow-auto bg-[#030303]">
      <CreatePost />
      <div className="xl:w-1/2 lg:w-3/5 md:w-4/5 w-full flex gap-2 items-center bg-[#030303] flex-col">
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
  );
}

export default HomeTab;
