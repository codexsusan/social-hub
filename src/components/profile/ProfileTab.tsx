import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { PostActions, PostBody } from "../post/PostCard";

export function ProfileTab() {
  return (
    <div className="xl:w-2/5 lg:w-3/5 md:w-4/5 w-full p-2  flex gap-2 flex-1">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full bg-[#27272A] grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
          <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
        </TabsList>
        <TabsContent className="" value="overview">
          <Card className="bg-[#27272A]">
            <CardHeader>
              <CardTitle className="text-white">Overview</CardTitle>
              <CardDescription>
                Overview of the user activity will be listed here
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2"></CardContent>
            <CardFooter></CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="posts">
          <Card className="bg-[#27272A]">
            <CardHeader className="">
              <CardTitle className="text-white">Posts</CardTitle>
              <CardDescription className="my-2">
                Overview of the user posts will be listed here.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-sm border-slate-600 flex gap-2 flex-col text-white p-4 cursor-pointer">
                {/* <PostBody />
                <PostActions /> */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="comments">
          <Card className="bg-[#27272A]">
            <CardHeader>
              <CardTitle className="text-white">Comments</CardTitle>
              <CardDescription>
                Overview of the user comments will be listed here.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2"></CardContent>
            <CardFooter></CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="bookmarks">
          <Card className="bg-[#27272A]">
            <CardHeader>
              <CardTitle className="text-white">Bookmarks</CardTitle>
              <CardDescription>
                Overview of the user bookmarks will be listed here.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-sm border-slate-600 flex gap-2 flex-col text-white p-4 cursor-pointer">
                {/* <PostBody />
                <PostActions /> */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
