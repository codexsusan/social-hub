import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  fetchCommunityMembers,
  fetchUpdatedCommunityMembers,
} from "@/features/communityusers/communityUser";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { hasProperty } from "@/utils/generalUtils";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from "lucide-react";
import { MemberUser } from "@/types/userTypes";
import SwitchModeratorCard from "./SwitchModeratorCard";

function AddModeratorDialog() {
  const communityData = useAppSelector((state) => state.community.home.info);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const communityMembers = useAppSelector(
    (state) => state.community.members.user
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
      fetchCommunityMembers({
        data: queryData,
        communityId: communityData._id,
      })
    ).then((res) => {
      if (hasProperty(res.payload, "data")) {
        setTotalPages(res.payload.data.totalPages);
        if (res.payload.data.totalPages === 1) {
          setHasMore(false);
        }
      }
    });
  }, [dispatch, communityData._id]);

  const fetchMoreData = () => {
    dispatch(
      fetchUpdatedCommunityMembers({
        data: { page: state.page + 1, limit: state.limit },
        communityId: communityData._id,
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
      <DialogContent className="sm:max-w-[425px] bg-[#09090b] text-white">
        <DialogHeader className="text-lg font-semibold">
          Add Moderator
        </DialogHeader>
        <div className="flex flex-col gap-y-2 max-h-[425px] overflow-auto">
          <InfiniteScroll
            className="mt-0 flex flex-col gap-4"
            dataLength={communityMembers.users.length}
            next={fetchMoreData}
            hasMore={hasMore}
            height={400}
            loader={<Loader className="animate-spin text-white " />}
          >
            <div className="flex flex-col gap-y-2">
              {communityMembers.users.map((user: MemberUser) => {
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
