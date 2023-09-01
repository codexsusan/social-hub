import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import PostCard from "@/components/home/HomeTab";

function HomeTab() {
  return (
    <div className="xl:w-2/5 lg:w-3/5 md:w-4/5 w-full flex gap-2">
      <Tabs defaultValue={"trending"} className="w-full">
        <TabsList className="grid w-full bg-[#27272A] grid-cols-3 ">
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="latest">Latest</TabsTrigger>
          <TabsTrigger value="most-viewed">Most Viewed</TabsTrigger>
        </TabsList>
        <TabsContent className="" value="trending">
          <Card className="bg-[#27272A]">
            <CardContent className="space-y-4 p-4 text-white">
              <PostCard />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="latest">
          <Card className="bg-[#27272A] ">
            <CardContent className="space-y-4 p-4 text-white">
              <div>Latest</div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="most-viewed">
          <Card className="bg-[#27272A] ">
            <CardContent className="space-y-4 p-4 text-white">
              <div>Most Viewed</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default HomeTab;
