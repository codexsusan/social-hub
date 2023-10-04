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
  );
}

function RightContent() {
  const navigate = useNavigate();
  return (
    <div className="relative rounded-md top-20 w-full bg-[#111111] overflow-hidden">
      <div className="p-5 flex items-center gap-x-2 bg-[#202020] border-b border-[#2B2B2B]">
        <HomeIcon />
        <p className="text-lg font-semibold">Home</p>
      </div>
      <div className="p-5 flex-col w-full">
        <p className="text-base">
          This is your personal homepage. Come here to check in with your
          favourite communities
        </p>
        <div className="w-full">
          <Button
            variant="secondary"
            onClick={() => navigate("/c/create")}
            className="mt-5 w-full"
          >
            Create Community
          </Button>
          <Button
            onClick={() => navigate("/explore")}
            variant="secondary"
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
