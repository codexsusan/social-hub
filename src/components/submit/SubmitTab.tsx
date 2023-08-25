import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InputWithLabel } from "../common/InputWithLabel";

function SubmitTab() {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full bg-[#27272A] grid-cols-3">
        <TabsTrigger value="posts">Posts</TabsTrigger>
        <TabsTrigger value="image">Image</TabsTrigger>
        <TabsTrigger value="links">Links</TabsTrigger>
      </TabsList>
      <TabsContent value="posts">
        <Card className="bg-[#27272A]">
          <CardContent className="space-y-4 p-6">
            <InputWithLabel
              id="title"
              label="Title"
              placeholder="Title"
              type="text"
              inputClassName="bg-[#09090B] text-white"
            />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="image">
        <Card className="bg-[#27272A]">
          <CardContent className="space-y-2 p-6">
            <InputWithLabel
              id="title"
              label="Title"
              placeholder="Title"
              type="text"
              inputClassName="bg-[#09090B] text-white"
            />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="links">
        <Card className="bg-[#27272A]">
          <CardContent className="space-y-4 p-6">
            <InputWithLabel
              id="title"
              label="Title"
              placeholder="Title"
              type="text"
              inputClassName="bg-[#09090B] text-white"
            />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

export default SubmitTab;
