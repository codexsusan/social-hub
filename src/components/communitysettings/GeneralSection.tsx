import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { InputWithLabel } from "../common/InputWithLabel";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useState } from "react";
import CustomSelect, { optionData } from "../common/CustomSelect";
import { CommunityTypes } from "@/types/communityTypes";

const communityOption: optionData[] = [
  {
    id: "public",
    name: "Public",
  },
  {
    id: "private",
    name: "Private",
  },
];

function GeneralSection() {
  return (
    <div className="flex flex-col gap-10 mt-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h3>Display Name</h3>
        </div>
        <DisplaynameDialog />
      </div>
      <div className="flex items-center justify-between">
        <div className="">
          <h3>Description</h3>
        </div>
        <DescriptionDialog />
      </div>
      <div className="flex items-center justify-between">
        <div className="">
          <h3>Community Type</h3>
        </div>
        <CommunityTypeDialog />
      </div>
    </div>
  );
}

function DisplaynameDialog() {
  const communityData = useAppSelector((state) => state.community.home.info);
  const [community, setCommunity] = useState({
    displayName: communityData.displayName!,
    description: communityData.description!,
    community_type: communityData.community_type!,
  });
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(!isOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]  bg-[#09090b] text-white">
        <DialogHeader className="text-lg font-semibold">
          Update Display Name
        </DialogHeader>
        <div className="">
          <InputWithLabel
            value={community.displayName!}
            onValueChange={(value: string) => {
              setCommunity({ ...community, displayName: value });
            }}
            inputClassName="bg-[#09090B] text-white"
            id="displayname"
            label="Display Name"
            placeholder="Enter your display name"
            type="text"
          />
        </div>
        <DialogFooter>
          <Button onClick={() => {}} variant="secondary" type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function DescriptionDialog() {
  const communityData = useAppSelector((state) => state.community.home.info);
  const [community, setCommunity] = useState({
    displayName: communityData.displayName!,
    description: communityData.description!,
    community_type: communityData.community_type!,
  });
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(!isOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]  bg-[#09090b] text-white">
        <DialogHeader className="text-lg font-semibold">
          Update Description
        </DialogHeader>
        <div className="">
          <InputWithLabel
            value={community.description}
            onValueChange={(value: string) => {
              setCommunity({ ...community, description: value });
            }}
            inputClassName="bg-[#09090B] text-white"
            id="description"
            label="Description"
            placeholder="Enter your description"
            type="text"
          />
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              setIsOpen(false);
            }}
            variant="secondary"
            type="submit"
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function CommunityTypeDialog() {
  const communityData = useAppSelector((state) => state.community.home.info);
  const [community, setCommunity] = useState({
    displayName: communityData.displayName!,
    description: communityData.description!,
    community_type: communityData.community_type!,
  });
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(!isOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]  bg-[#09090b] text-white">
        <DialogHeader className="text-lg font-semibold">
          Update Community Type
        </DialogHeader>
        <div className="">
          <CustomSelect
            onValueChange={(value: CommunityTypes) => {
              setCommunity({ ...community, community_type: value });
            }}
            placeholder="Select community type"
            optionData={communityOption}
          />
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              setIsOpen(false);
            }}
            variant="secondary"
            type="submit"
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default GeneralSection;
