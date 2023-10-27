import { useAppSelector } from "@/app/hooks";
import { CustomAvatar } from "@/components/common/CustomAvatar";
import PageWrapper from "@/components/common/PageWrapper";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountTab from "@/components/usersetting/AccountTab";
import ProfileTab from "@/components/usersetting/ProfileTab";
import { User2 } from "lucide-react";

export function UserSettings() {
  return (
    <PageWrapper
      LeftContent={<LeftContent />}
      RightContent={<RightContent />}
    />
  );
}

function LeftContent() {
  return (
    <div className="w-full flex flex-col flex-1 items-center p-4 gap-y-2 overflow-auto ">
      <div className=" md:w-4/5 w-full p-2 rounded-sm border-slate-600 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="text-xl font-bold">User Settings</div>
          <Separator className="bg-gray-700" orientation="horizontal" />
        </div>
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full  bg-slate-300/20 grid-cols-2">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <AccountTab />
          </TabsContent>
          <TabsContent className="" value="profile">
            <ProfileTab />
          </TabsContent>
        </Tabs>
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
