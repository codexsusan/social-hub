import { CustomAvatar } from "@/components/common/CustomAvatar";
import { PostActions, PostBody } from "@/components/post/PostCard";
import EditorView from "@/components/submit/EditorView";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Pin } from "lucide-react";

function SinglePost() {
  
  return (
    <div className="w-full flex flex-col flex-1 items-center p-4 gap-y-2 overflow-auto text-white">
      <div
        className={cn(
          "xl:w-2/5 lg:w-3/5 md:w-4/5 w-full border rounded-sm bg-[#27272a] border-slate-600 flex flex-col text-white p-4 cursor-pointer"
        )}
      >
        <PostBody />
        <PostActions type="post" />
        <EditorView />
        <Separator orientation="horizontal" className="my-4" />
        <div className="flex items-center gap-x-2 ">
          <CustomAvatar />
          <div onClick={() => {}} className="flex gap-x-2 items-center">
            Susan Khadka
            <span className=" text-gray-400 text-sm">• 4 hours</span>
            {/* TODO: Pinned Status */}
            <Pin className="w-3 h-3" fill="white" />
          </div>
        </div>
        <div className="ml-12 text-sm">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet, quam!
          Praesentium atque suscipit expedita quia tempore minima, alias cumque
          similique soluta mollitia ullam aspernatur beatae ipsum blanditiis
          illum libero, ducimus asperiores commodi possimus esse odit, inventore
          autem? Sint quibusdam minus accusamus expedita recusandae aliquid
          natus, reprehenderit alias. Deserunt architecto ea, laudantium quae
          magni unde asperiores.
          <PostActions type="comment" />
        </div>
      </div>
    </div>
  );
}

export default SinglePost;
