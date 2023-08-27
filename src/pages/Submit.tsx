import CustomSelect from "@/components/common/CustomSelect";
import SubmitTab from "@/components/submit/SubmitTab";
import { Separator } from "@/components/ui/separator";

function Submit() {
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
              console.log(value);
            }}
            options={["Productivity", "Gaming", "Programming", "Sports"]}
            placeholder="Choose a community"
          />
        </div>
        <SubmitTab />
      </div>
    </div>
  );
}

export default Submit;
