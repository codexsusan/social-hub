import { useAppDispatch } from "@/app/hooks";
import PageWrapper from "@/components/common/PageWrapper";
import AppearanceSection from "@/components/communitysettings/AppearanceSection";
import GeneralSection from "@/components/communitysettings/GeneralSection";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchCommunityById } from "@/features/community/communityInfo";
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
  return <></>;
}

export default CommunitySettings;
