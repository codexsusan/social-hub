import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import FileUploadButton from "../common/FileUploadButton";
import { useSearchParams } from "react-router-dom";
import EditorView from "./EditorView";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { changeTitle, createPost } from "@/features/submit/submitSlice";
import { createPostUtils } from "@/utils/postUtils";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function SubmitTab(props: Props) {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const defaultValue = type ? type : "posts";

  return (
    <Tabs defaultValue={defaultValue} className="w-full">
      <TabsList className="grid w-full bg-[#27272A] grid-cols-3 ">
        <TabsTrigger value="posts">Posts</TabsTrigger>
        <TabsTrigger value="image">Image</TabsTrigger>
        <TabsTrigger value="links">Links</TabsTrigger>
      </TabsList>
      <TabsContent value="posts">
        <PostView {...props} />
      </TabsContent>
      <TabsContent value="image">
        <ImageView {...props} />
      </TabsContent>
      <TabsContent value="links">
        <LinkView {...props} />
      </TabsContent>
    </Tabs>
  );
}

function PostView(props: Props) {
  const dispatch = useAppDispatch();
  const post = useAppSelector((state) => state.submit.post);

  

  return (
    <Card className="bg-[#27272A] ">
      <CardContent className="space-y-4 p-6">
        <Input
          onChange={(e) => {
            dispatch(changeTitle(e.target.value));
          }}
          value={post.title}
          className="bg-[#09090B] text-white"
          type="text"
          placeholder="Title"
        />
        <EditorView />
        {props.children}
      </CardContent>
    </Card>
  );
}

function ImageView(props: Props) {
  return (
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
        {props.children}
      </CardContent>
    </Card>
  );
}

function LinkView(props: Props) {
  return (
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
        {props.children}
      </CardContent>
    </Card>
  );
}

export default SubmitTab;
