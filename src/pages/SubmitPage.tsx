import { useAppDispatch, useAppSelector } from "@/app/hooks";
import Editor from "@/components/common/Editor";
import PageWrapper from "@/components/common/PageWrapper";
import { Separator } from "@/components/ui/separator";
import { fetchAllCommunityByUser } from "@/features/community/communityLists";
import useDocumentTitle from "@/hooks/useDocumentTitle";

import CustomSelect from "@/components/common/CustomSelect";
import { Button } from "@/components/ui/button";
import {
  changeCommunity,
  changeContent,
  changeTitle,
  createPost,
} from "@/features/submit/submitSlice";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

function SubmitPage() {
  useDocumentTitle("Submit | Social Hub");
  return (
    <PageWrapper
      LeftContent={<LeftContent />}
      RightContent={<RightContent />}
    />
  );
}

function LeftContent() {
  const [searchParams] = useSearchParams();
  const comm = searchParams.get("comm");

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const submitPage = useAppSelector((state) => state.submit);

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

  const changeContentCB = (content: string) => {
    dispatch(changeContent(content));
  };

  const handlePostSubmit = () => {
    dispatch(createPost(submitPage.post)).then((res) => {
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
      <div className=" w-full p-2 rounded-sm border-slate-600 flex flex-col gap-4">
        <div className="text-xl font-semibold">Create a post</div>
        <Separator className="bg-gray-700" orientation="horizontal" />
        <div className="w-1/2 flex flex-col gap-2">
          <Label>Select community</Label>
          <CustomSelect
            onValueChange={(value: string) => {
              dispatch(changeCommunity(value));
            }}
            defaultValue={comm !== null ? comm : undefined}
            placeholder="Choose a community"
            optionData={options}
          />
        </div>
        <TextareaAutosize
          className="w-full resize-none appearance-none overflow-hidden rounded-sm p-2 text-3xl font-bold focus:outline-none text-black"
          placeholder="Title Here"
          value={submitPage.post.title}
          onChange={(e) => {
            dispatch(changeTitle(e.target.value));
          }}
        />
        <Editor
          value={JSON.parse(submitPage.post.content!)}
          changeContentCB={changeContentCB}
        />
        <Button onClick={handlePostSubmit} variant={"default"}>
          Post
        </Button>
      </div>
    </div>
  );
}

function RightContent() {
  return <>Right Content</>;
}

export default SubmitPage;
