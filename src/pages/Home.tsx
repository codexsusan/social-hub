import PageWrapper from "@/components/common/PageWrapper";
import CreatePost from "@/components/home/CreatePost";
import LatestHome from "@/components/home/LatestHome";
import MostViewedHome from "@/components/home/MostViewedHome";
import TrendingHome from "@/components/home/TrendingHome";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HomeIcon, Loader } from "lucide-react";
import { Suspense } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  return (
    <PageWrapper
      LeftContent={<LeftContent />}
      RightContent={<RightContent />}
    />
  );
}

function LeftContent() {
  return (
    <div className="w-full flex gap-2 items-center flex-col border-2">
      <CreatePost />
      <Tabs defaultValue={"latest"} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-slate-300/20">
          <TabsTrigger className="text-lg text-black" value="latest">Latest</TabsTrigger>
          <TabsTrigger className="text-lg text-black" value="trending">Trending</TabsTrigger>
          <TabsTrigger className="text-lg text-black" value="most-viewed">Most Viewed</TabsTrigger>
        </TabsList>
        <TabsContent value="latest">
          <Suspense fallback={<Loader color="black" />}>
            <LatestHome />
          </Suspense>
        </TabsContent>
        <TabsContent value="trending">
          <Suspense fallback={<Loader color="black" />}>
            <TrendingHome />
          </Suspense>
        </TabsContent>
        <TabsContent value="most-viewed">
          <Suspense fallback={<Loader color="black" />}>
            <MostViewedHome />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function RightContent() {
  const navigate = useNavigate();
  return (
    // #F2F7F8
    // #EEF2F3
    <div className="relative rounded-md top-20 w-full bg-[#F2F7F8] overflow-hidden">
      <div className="p-5 flex items-center gap-x-4 bg-[#eef2f3] border-b ">
        <HomeIcon />
        <p className="text-2xl font-semibold pt-1">Home</p>
      </div>
      <div className="p-5 flex-col w-full">
        <p className="text-lg">
          This is your personal homepage. Come here to check in with your
          favourite communities
        </p>
        <div className="w-full">
          <Button
            variant="default"
            onClick={() => navigate("/c/create")}
            className="mt-5 w-full"
          >
            Create Community
          </Button>
          <Button
            onClick={() => navigate("/explore")}
            variant="default"
            className="mt-5 w-full"
          >
            Explore Community
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
