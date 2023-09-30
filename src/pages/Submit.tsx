import { useAppDispatch, useAppSelector } from "@/app/hooks";
import CustomSelect from "@/components/common/CustomSelect";
import SubmitTab from "@/components/submit/SubmitTab";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { fetchAllCommunityByUser } from "@/features/community/communityLists";
import { changeCommunity, createPost } from "@/features/submit/submitSlice";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function Submit() {
  useDocumentTitle("Submit | Social Hub");
  const dispatch = useAppDispatch();
  const submit = useAppSelector((state) => state.submit);
  const user = useAppSelector((state) => state.user);
  const [searchParams] = useSearchParams();
  const comm = searchParams.get("comm");
  useEffect(() => {
    dispatch(fetchAllCommunityByUser());
  }, [dispatch]);

  const optionData = useAppSelector(
    (state) => state.community.lists.communities
  );
  let options = optionData.map((option) => {
    return {
      id: option._id,
      name: option.displayName,
    };
  });

  options = [
    {
      id: user._id,
      name: user.userName,
    },
    ...options,
  ];

  const handlePostSubmit = () => {
    dispatch(createPost(submit.post)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        toast({
          title: "Post Submitted",
          description: "Post created successfully.",
          className: "bg-[#09090B] text-[#e2e2e2] border-none ",
          duration: 2000,
        });
      } else {
        toast({
          title: "Post submission failed.",
          description: "Please try again.",
          className: "bg-[#09090B] text-[#e2e2e2] border-none ",
          duration: 2000,
        });
      }
    });
  };

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
            defaultValue={comm !== null ? comm : undefined}
            options={["Productivity", "Gaming", "Programming", "Sports"]}
            placeholder="Choose a community"
            optionData={options}
          />
        </div>
        <SubmitTab>
          <Separator className="bg-gray-700" orientation="horizontal" />
          <div className="flex justify-end gap-x-4">
            <Button>Save Draft</Button>
            <PostButton
              loading={submit.loading}
              handlePostSubmit={handlePostSubmit}
            />
          </div>
        </SubmitTab>
      </div>
    </div>
  );
}

type PostButtonProps = {
  loading: boolean;
  handlePostSubmit: () => void;
};

function PostButton(props: PostButtonProps) {
  const { loading, handlePostSubmit } = props;
  return (
    <>
      {loading ? (
        <Button disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </Button>
      ) : (
        <Button onClick={handlePostSubmit}>Post</Button>
      )}
    </>
  );
}

export default Submit;
