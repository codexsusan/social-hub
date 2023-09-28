import CommunityListCard from "@/components/community/CommunityListCard";

function ListCommunity() {
  return (
    <div className="w-full flex flex-col flex-1 items-center p-4 gap-y-2 overflow-auto text-white">
      <div className="xl:w-2/5 lg:w-3/5 md:w-4/5 w-full p-2 rounded-sm border-slate-600 flex flex-col gap-6">
        <div className="bg-[#27272a] p-2 rounded-md flex flex-col gap-4">
          <CommunityListCard />
        </div>
      </div>
    </div>
  );
}

export default ListCommunity;
