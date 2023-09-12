import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader } from "lucide-react";
import { lazy, Suspense } from "react";
import MostViewedHome from "./MostViewedHome";

const LatestHome = lazy(() => import("./LatestHome"));
const TrendingHome = lazy(() => import("./TrendingHome"));


function HomeTab() {
  return (
    <div className="xl:w-2/5 lg:w-3/5 md:w-4/5 w-full flex gap-2">
      <Tabs defaultValue={"latest"} className="w-full">
        <TabsList className="grid w-full bg-[#27272A] grid-cols-3 ">
          <TabsTrigger value="latest">Latest</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="popular">Most Viewed</TabsTrigger>
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
        <TabsContent value="popular">
          <Suspense fallback={<Loader />}>
            <MostViewedHome />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default HomeTab;
