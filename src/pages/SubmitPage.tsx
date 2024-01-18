import { useAppDispatch, useAppSelector } from "@/app/hooks";
import PageWrapper from "@/components/common/PageWrapper";
import { Separator } from "@/components/ui/separator";
import { fetchAllCommunityByUser } from "@/features/community/communityLists";
import useDocumentTitle from "@/hooks/useDocumentTitle";

import { CustomAvatar } from "@/components/common/CustomAvatar";
import CustomSelect from "@/components/common/CustomSelect";
import TextEditor from "@/components/common/TextEditor";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import {
  changeCommunity,
  changeContent,
  changeTitle,
  createPost,
} from "@/features/submit/submitSlice";
import { User2 } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";

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
  const origin = searchParams.get("origin");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const submitPage = useAppSelector((state) => state.submit);

  useEffect(() => {
    dispatch(
      fetchAllCommunityByUser({
        page: 1,
        limit: 100,
      })
    );
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
        navigate(origin ? origin : "/", { replace: true });
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
    <div className="w-full flex flex-col items-center p-4 gap-y-2 overflow-autotext-white">
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
        <TextEditor changeContent={changeContentCB} contentData={submitPage.post.content!} />
        {/* <Editor
          value={JSON.parse(submitPage.post.content!)}
          changeContentCB={changeContentCB}
        /> */}
        <Button onClick={handlePostSubmit} variant={"default"}>
          Post
        </Button>
      </div>
    </div>
  );
}

function RightContent() {
  const user = useAppSelector((state) => state.user);
  return (
    <div className="relative rounded-md top-20 w-full bg-[#F2F7F8] overflow-hidden">
      <div className="p-5 flex items-center gap-x-2 bg-[#eef2f3] border-b border-[#2B2B2B]">
        <User2 className="" />
        <p className="text-lg font-semibold">User Profile</p>
      </div>
      <div className=" grid grid-cols-1 p-2 divide-y divide-zinc-500">
        <div className="w-full flex justify-between p-4 items-center">
          <p className=" font-medium">Avatar</p>
          <CustomAvatar src={user.profilePic} />
        </div>
        <div className="w-full flex justify-between p-4">
          <p className=" font-medium">Email</p>
          <p>{user.email}</p>
        </div>
        <div className="w-full flex justify-between p-4">
          <p className=" font-medium">Fullname</p>
          <p>{user.firstName + " " + user.lastName}</p>
        </div>
        <div className="w-full flex justify-between p-4">
          <p className="font-medium">Username</p>
          <div>
            <p>{"@" + user.userName}</p>
          </div>
        </div>
        <div className="w-full flex justify-between p-4">
          <p className=" font-medium">Gender</p>
          <p>{user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}</p>
        </div>
      </div>
    </div>
  );
}

export default SubmitPage;
