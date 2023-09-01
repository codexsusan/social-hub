import { useAppDispatch, useAppSelector } from "@/app/hooks";
import CustomSelect from "@/components/common/CustomSelect";
import SubmitTab from "@/components/submit/SubmitTab";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { changeCommunity, createPost } from "@/features/submit/submitSlice";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Submit() {
  useDocumentTitle("Submit | Social Hub");
  const dispatch = useAppDispatch();
  const submit = useAppSelector((state) => state.submit);
  const navigate = useNavigate();

  const handlePostSubmit = () => {
    dispatch(createPost(submit.post)).then((res) => {
      if (res.type === "submit/createPost/fulfilled") {
        navigate("/");
      }
    });
  };

  const PostButton = submit.loading ? (
    <Button disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>
  ) : (
    <Button onClick={handlePostSubmit}>Post</Button>
  );

  return (
    <div className="w-full flex flex-col flex-1 items-center p-4 gap-y-2 overflow-auto text-white">
      <div className="xl:w-2/5 lg:w-3/5 md:w-4/5 w-full p-2 rounded-sm border-slate-600 flex flex-col gap-6">
        <div className="text-xl font-medium flex justify-between w-full items-baseline">
          <div>Create a post</div>
          <div className="text-sm">Draft</div>
        </div>
        <Separator className="bg-gray-700" orientation="horizontal" />
        <div className="w-1/2">
          <CustomSelect
            onValueChange={(value: string) => {
              dispatch(changeCommunity(value));
            }}
            options={["Productivity", "Gaming", "Programming", "Sports"]}
            placeholder="Choose a community"
          />
        </div>
        <SubmitTab>
          <Separator className="bg-gray-700" orientation="horizontal" />
          <div className="flex justify-end gap-x-4">
            <Button>Save Draft</Button>
            {PostButton}
          </div>
        </SubmitTab>
      </div>
    </div>
  );
}

export default Submit;
