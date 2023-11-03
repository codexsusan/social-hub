import CommunitySearch from "@/components/searchpage/CommunitySearch";
import PostSearch from "@/components/searchpage/PostSearch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function SearchPage() {
  return (
    <div className="mt-4">
      <div className="grid grid-cols-10">
        <div className="p-4 border col-start-3 sm:col-start-2 sm:col-span-8 md:col-start-3 md:col-span-6">
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="grid w-full bg-slate-300/20 grid-cols-2">
              <TabsTrigger className="text-lg text-black" value="posts">
                Posts
              </TabsTrigger>
              <TabsTrigger className="text-lg text-black" value="community">
                Community
              </TabsTrigger>
            </TabsList>
            <TabsContent value="posts">
              <PostSearch />
            </TabsContent>
            <TabsContent value="community">
              <CommunitySearch />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
