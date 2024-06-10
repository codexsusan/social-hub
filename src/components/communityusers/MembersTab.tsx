import MemberSection from './MemberSection';

function MembersTab() {
    return <MemberSection />;
  // return (
  //   <Tabs defaultValue={defaultValue} className="w-full mt-2">
  //     <TabsList className="grid w-full bg-[#27272A] grid-cols-3 ">
  //       <TabsTrigger value="members">Members</TabsTrigger>
  //       <TabsTrigger value="moderator">Moderator</TabsTrigger>
  //       <TabsTrigger value="admin">Admin</TabsTrigger>
  //     </TabsList>
  //     <TabsContent value="members">
  //       <MemberSection />
  //     </TabsContent>
  //     <TabsContent value="moderator">
  //       <ModeratorSection />
  //     </TabsContent>
  //     <TabsContent value="admin">
  //       <AdminSection />
  //     </TabsContent>
  //   </Tabs>
  // )
}

export default MembersTab
