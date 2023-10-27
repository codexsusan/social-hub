import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchCommunityUserForMod } from "@/features/communitysettings/manageSlice";
import { hasProperty } from "@/utils/generalUtils";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import SwitchModeratorCard from "./SwitchModeratorCard";
import { useParams } from "react-router-dom";
import { SuperUser } from "@/types/userTypes";

function AddModeratorDialog() {
  const { communityId } = useParams();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const moderator = useAppSelector(
    (state) => state.community.settings.manage.moderators
  );
  const [state, setState] = useState({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    const queryData = {
      page: 1,
      limit: 10,
    };
    dispatch(
      fetchCommunityUserForMod({
        data: queryData,
        communityId,
      })
    ).then((res) => {
      if (hasProperty(res.payload, "data")) {
        setTotalPages(res.payload.data.totalPages);
        if (res.payload.data.totalPages === 1) {
          setHasMore(false);
        }
      }
    });
  }, [dispatch, communityId]);

  const fetchMoreData = () => {
    dispatch(
      fetchCommunityUserForMod({
        data: { page: state.page + 1, limit: state.limit },
        communityId,
      })
    );
    if (state.page + 1 === totalPages) {
      setHasMore(false);
    }
    setState({ ...state, page: state.page + 1 });
  };
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
      <DialogContent className="sm:max-w-[425px] font-inter bg-[#fbfffe]">
        <DialogHeader className="text-lg font-semibold">
          Add Moderator
        </DialogHeader>
        <div className="flex flex-col gap-y-2 max-h-[425px] overflow-auto">
          <InfiniteScroll
            className="mt-0 flex flex-col gap-4"
            dataLength={moderator.users.length}
            next={fetchMoreData}
            hasMore={hasMore}
            height={400}
            loader={<Loader className="animate-spin text-white " />}
          >
            <div className="flex flex-col gap-y-2">
              {moderator.users.map((user: SuperUser) => {
                return <SwitchModeratorCard key={`${user._id}`} user={user} />;
              })}
            </div>
          </InfiniteScroll>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddModeratorDialog;
