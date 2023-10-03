import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserPostTab from "./UserPostTab";
import BookmarkTab from "./BookmarkTab";

export function UserProfileTab() {
  return (
    <div className="w-full flex gap-2 flex-1">
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
