import { useAppDispatch, useAppSelector } from "@/app/hooks";
import AddCommunityForm from "@/components/addcommunity/AddCommunityForm";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { clear, createCommunity } from "@/features/community/createCommunity";
import { hasProperty } from "@/utils/generalUtils";
import React from "react";
import { useNavigate } from "react-router-dom";

function AddCommunity() {
  const dispatch = useAppDispatch();
  const [page, setPage] = React.useState(1);
  const navigate = useNavigate();

  const community = useAppSelector((state) => state.community.create);
  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    setPage(page + 1);
  };

  const handlePrevious = (e: React.MouseEvent) => {
    e.preventDefault();
    setPage(page - 1);
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    const check =
      community.displayName?.length !== 0 &&
      community.name?.length !== 0 &&
      community.description?.length !== 0;
    if (check) {
      dispatch(createCommunity(community)).then((res) => {
        if (
          hasProperty(res.payload, "data") &&
          res.meta.requestStatus === "fulfilled"
        ) {
          toast({
            title: res.payload.data.message,
            className: "bg-[#09090B] text-[#e2e2e2] border-none ",
            duration: 2000,
          });
          if (res.payload.status === 201) {
            navigate(`/c/${res.payload.data._id}`);
            dispatch(clear());
          }
        }
      });
    } else {
      toast({
        title: "Please fill all field properly.",
        className: "bg-[#09090B] text-[#e2e2e2] border-none ",
        duration: 2000,
      });
      setPage(1);
    }
  };
  return (
    <div className="w-full flex flex-col flex-1 items-center p-4 gap-y-2 overflow-auto">
      <div className="xl:w-2/5 lg:w-3/5 md:w-4/5 w-full p-2 rounded-sm border-slate-600 flex flex-col gap-4">
        <div className="text-2xl font-semibold flex  w-full items-baseline">
          <div>Create a community</div>
        </div>
        <Separator className="bg-[#eef2f3] " orientation="horizontal" />
        <div className="w-full flex justify-center bg-[#eef2f3] p-4 rounded-sm ">
          <form className="w-full flex flex-col gap-y-4">
            <AddCommunityForm page={page} />
            <div className="flex justify-between gap-x-4">
              <Button
                className={`${page === 1 ? "invisible" : ""}`}
                onClick={handlePrevious}
              >
                Previous
              </Button>
              <Button
                className={`${page === 2 ? "hidden" : ""}`}
                onClick={handleNext}
              >
                Next
              </Button>
              <Button
                className={`${page === 2 ? "visible" : "hidden"}`}
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

export default AddCommunity;
