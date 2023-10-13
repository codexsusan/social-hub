import { useAppDispatch } from "@/app/hooks";
import { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "@/components/ui/textarea"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "../ui/dialog";

function GuidelineDialog() {
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
        <Button onClick={() => setIsOpen(true)}>Add</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#09090b] text-white">
        <DialogHeader className="text-lg font-semibold">
          Community Guidelines
        </DialogHeader>
        <div className="flex flex-col gap-y-2 max-h-[425px] overflow-auto">
          <Textarea className=" border border-gray-500/30 overflow-hidden bg-[#09090B] text-white " />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default GuidelineDialog;
