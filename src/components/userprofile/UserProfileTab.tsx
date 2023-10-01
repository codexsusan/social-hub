import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserPostTab from "./UserPostTab";
import BookmarkTab from "./BookmarkTab";

export function UserProfileTab() {
  return (
    <div className="xl:w-2/5 lg:w-3/5 md:w-4/5 w-full p-2  flex gap-2 flex-1">
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full bg-[#27272A] grid-cols-2">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          <UserPostTab />
        </TabsContent>
        <TabsContent value="bookmarks">
          <BookmarkTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
