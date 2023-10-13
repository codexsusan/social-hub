import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { MouseEventHandler, useEffect, useState } from "react";
import { Button } from "../ui/button";

import Editor from "../common/Editor";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import {
  fetchCommunityGuideLines,
  updateCommunityGuideLines,
  updateCommunityGuidelinesSuccess,
} from "@/features/communitysettings/manageSlice";
import { useParams } from "react-router-dom";
import { hasProperty } from "@/utils/generalUtils";
import { toast } from "../ui/use-toast";
import { Loader } from "lucide-react";

function GuidelineDialog() {
  const dispatch = useAppDispatch();
  const { communityId } = useParams();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const changeContent = (content: string) => {
    setGuideline(content);
  };

  const manageData = useAppSelector((state) => state.community.settings.manage);
  const [guideline, setGuideline] = useState<string>(
    manageData.guidelines.community_guidelines!
  );

  useEffect(() => {
    dispatch(fetchCommunityGuideLines(communityId)).then((res) => {
      if (hasProperty(res.payload, "data")) {
        if (res.payload.status === 200) {
          setGuideline(res.payload.data.data.community_guidelines);
        }
      }
    });
  }, [dispatch, communityId]);

  const handleUpdateGuideline: MouseEventHandler = (e) => {
    e.preventDefault();
    if (guideline === manageData.guidelines.community_guidelines) {
      setIsOpen(false);
      toast({
        description: "No changes in community guidelines",
        className: "bg-[#09090B] text-[#e2e2e2] border-[#e2e2e2]/20",
        duration: 1000,
      });
      return;
    }
    dispatch(
      updateCommunityGuideLines({
        community_guidelines: guideline,
        communityId,
      })
    ).then((res) => {
      setIsOpen(false);
      setGuideline(manageData.guidelines.community_guidelines!);
      if (hasProperty(res.payload, "data")) {
        if (res.payload.status === 200) {
          dispatch(updateCommunityGuidelinesSuccess(guideline));
          toast({
            title: "Guidelines updated successfully",
            className: "bg-[#09090B] text-[#e2e2e2] border-none ",
            duration: 2000,
          });
        }
      }
    });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(!isOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Update</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-[#09090b] text-white">
        <DialogHeader className="text-lg font-semibold">
          Community Guidelines
        </DialogHeader>
        {manageData.guidelines.loading ? (
          <Loader className="animate-spin h-4 w-4 text-center" />
        ) : (
          <>
            <Editor
              value={guideline.length > 0 ? JSON.parse(guideline) : null}
              changeContentCB={changeContent}
            />
            <Button onClick={handleUpdateGuideline} variant={"secondary"}>
              Update
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default GuidelineDialog;
