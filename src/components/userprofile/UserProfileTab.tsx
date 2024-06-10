import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserPostTab from "./UserPostTab";
import BookmarkTab from "./BookmarkTab";

export function UserProfileTab() {
  return (
    <div className="w-full flex gap-2 flex-1">
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full bg-slate-300/20 grid-cols-2">
          <TabsTrigger className="text-lg text-black" value="posts">Posts</TabsTrigger>
          <TabsTrigger className="text-lg text-black" value="bookmarks">Bookmarks</TabsTrigger>
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
