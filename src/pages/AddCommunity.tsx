import CustomSelect from "@/components/common/CustomSelect";
import FileUploadButton from "@/components/common/FileUploadButton";
import { InputWithLabel } from "@/components/common/InputWithLabel";
import ProfileUploadButton from "@/components/common/ProfileUploadButton";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import React from "react";

function AddCommunity() {
  const [state, setState] = React.useState(1);
  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    setState(state + 1);
  };
  const handlePrevious = (e: React.MouseEvent) => {
    e.preventDefault();
    setState(state - 1);
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
  };
  return (
    <div className="w-full flex flex-col flex-1 items-center p-4 gap-y-2 overflow-auto text-white">
      <div className="xl:w-2/5 lg:w-3/5 md:w-4/5 w-full p-2 rounded-sm border-slate-600 flex flex-col gap-6">
        <div className="text-xl font-medium flex  w-full items-baseline">
          <div>Create a community</div>
        </div>
        <Separator className="bg-gray-700" orientation="horizontal" />
        <div className="w-full flex justify-center bg-[#27272a] p-4 rounded-sm ">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="w-full flex flex-col gap-y-6"
          >
            {state === 1 ? <FieldAreaA /> : <FieldAreaB />}
            <div className="flex justify-between gap-x-4">
              <Button
                className={`${state === 1 ? "invisible" : ""}`}
                onClick={handlePrevious}
              >
                Previous
              </Button>
              <Button
                className={`${state === 2 ? "hidden" : ""}`}
                onClick={handleNext}
              >
                Next
              </Button>
              <Button
                className={`${state === 2 ? "visible" : "hidden"}`}
                onClick={handleSubmit}
              >
                Create
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function FieldAreaA() {
  return (
    <>
      <InputWithLabel
        inputClassName="bg-[#09090B] text-white"
        onValueChange={() => {}}
        id="communityname"
        label="Community Name"
        placeholder="Enter Community name"
        type="text"
      />
      <InputWithLabel
        inputClassName="bg-[#09090B] text-white"
        onValueChange={() => {}}
        id="communitydisplayname"
        label="Community Display Name"
        placeholder="Enter Community display name"
        type="text"
      />
      <InputWithLabel
        inputClassName="bg-[#09090B] text-white"
        onValueChange={() => {}}
        id="description"
        label="Description"
        placeholder="Enter description"
        type="text"
      />
      <div className="w-full flex flex-col gap-y-2">
        <Label className="text-slate-200" htmlFor="email">
          Community Type
        </Label>
        <CustomSelect
          onValueChange={() => {}}
          options={["Public", "Private"]}
          placeholder="Select Community Type"
        />
      </div>
    </>
  );
}

function FieldAreaB() {
  return (
    <div className="flex flex-col gap-y-2 ">
      <Label className="text-base">Community Icon</Label>
      <div className="flex justify-center ">
        <ProfileUploadButton />
      </div>
    </div>
  );
}

export default AddCommunity;
