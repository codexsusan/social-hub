import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import FileUploadButton from "../common/FileUploadButton";

function SubmitTab() {
  return (
    <Tabs defaultValue="posts" className="w-full">
      <TabsList className="grid w-full bg-[#27272A] grid-cols-3">
        <TabsTrigger value="posts">Posts</TabsTrigger>
        <TabsTrigger value="image">Image</TabsTrigger>
        <TabsTrigger value="links">Links</TabsTrigger>
      </TabsList>
      <TabsContent value="posts">
        <Card className="bg-[#27272A]">
          <CardContent className="space-y-4 p-6">
            <Input
              className="bg-[#09090B] text-white"
              type="text"
              placeholder="Title"
            />
            <Separator className="bg-gray-700" orientation="horizontal" />
            <div className="flex justify-end gap-x-4">
              <Button>Save Draft</Button>
              <Button>Post</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="image">
        <Card className="bg-[#27272A]">
          <CardContent className="space-y-4 p-6">
            <Input
              className="bg-[#09090B] text-white"
              type="text"
              placeholder="Title"
            />
            <div className="w-full h-40 bg-[#09090B] rounded flex items-center justify-center text-slate-200 gap-x-4">
              Upload a image
              <FileUploadButton />
            </div>
            <Separator className="bg-gray-700" orientation="horizontal" />
            <div className="flex justify-end gap-x-4">
              <Button>Save Draft</Button>
              <Button>Post</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="links">
        <Card className="bg-[#27272A]">
          <CardContent className="space-y-4 p-6">
            <Input
              className="bg-[#09090B] text-white"
              type="text"
              placeholder="Title"
            />
            <Textarea
              className="bg-[#09090B] text-white"
              placeholder="Type your link here..."
            />
            <Separator className="bg-gray-700" orientation="horizontal" />
            <div className="flex justify-end gap-x-4">
              <Button>Save Draft</Button>
              <Button>Post</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

export default SubmitTab;
