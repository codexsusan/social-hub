import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { CustomAvatar } from "@/components/common/CustomAvatar";
import PageWrapper from "@/components/common/PageWrapper";
import AppearanceSection from "@/components/communitysettings/AppearanceSection";
import GeneralSection from "@/components/communitysettings/GeneralSection";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchCommunityById } from "@/features/community/communityInfo";
import { User2 } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function CommunitySettings() {
  const { communityId } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCommunityById(communityId));
  }, [dispatch, communityId]);
  return (
    <PageWrapper
      LeftContent={<LeftContent />}
      RightContent={<RightContent />}
    />
  );
}

function LeftContent() {
  return (
    <div className="w-full flex flex-col flex-1 items-center p-4 gap-y-2 overflow-auto text-white">
      <div className=" md:w-4/5 w-full p-2 rounded-sm border-slate-600 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="text-xl font-bold">Community Settings</div>
          <Separator className="bg-gray-700" orientation="horizontal" />
        </div>
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full  bg-[#27272A] grid-cols-2">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <GeneralSection />
          </TabsContent>
          <TabsContent className="" value="appearance">
            <AppearanceSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function RightContent() {
  const communityInfo = useAppSelector((state) => state.community.home.info);
  return (
    <div className="relative rounded-md top-20 w-full bg-[#111111] overflow-hidden">
      <div className="p-5 flex items-center gap-x-2 bg-[#202020] border-b border-[#2B2B2B]">
        <User2 className="" />
        <p className="text-lg font-semibold">Community Profile</p>
      </div>
      <div className=" grid grid-cols-1 p-2 divide-y divide-zinc-500">
        <div className="w-full flex justify-between p-4 items-center">
          <p className=" font-medium">Avatar</p>
          <CustomAvatar src={communityInfo.icon_image} />
        </div>
        <div className="w-full flex justify-between p-4">
          <p className=" font-medium">Display Name</p>
          <p>{communityInfo.displayName}</p>
        </div>
        <div className="w-full flex justify-between p-4">
          <p className="font-medium">Name</p>
          <div>
            <p>{communityInfo.name}</p>
          </div>
        </div>
        <div className="w-full flex justify-between p-4">
          <p className=" font-medium">Visibility</p>
          {communityInfo.community_type!.charAt(0).toUpperCase() +
            communityInfo.community_type?.slice(1)}
        </div>
      </div>
    </div>
  );
}

export default CommunitySettings;
