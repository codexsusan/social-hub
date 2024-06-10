import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";

function MemberRequestDialog() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(!isOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>View</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] font-inter bg-[#fbfffe]">
        <DialogHeader className="text-lg font-semibold">
          Membership Request
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default MemberRequestDialog;
