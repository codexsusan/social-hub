import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuthorPostTab from "./AuthorPostTab";

export function AuthorProfileTab() {
  return (
    <div className="xl:w-2/5 lg:w-3/5 md:w-4/5 w-full p-2  flex gap-2 flex-1">
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full bg-[#27272A] grid-cols-1">
          <TabsTrigger value="posts">Posts</TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          <AuthorPostTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
