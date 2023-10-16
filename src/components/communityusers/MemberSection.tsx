import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  fetchCommunityMembers,
  fetchUpdatedCommunityMembers,
} from "@/features/communityusers/communityUser";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MemberCard from "./MemberCard";
import { MemberUser } from "@/types/userTypes";
import { Loader } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { hasProperty } from "@/utils/generalUtils";

function MemberSection() {
  const { communityId } = useParams();
  const dispatch = useAppDispatch();
  const communityMembers = useAppSelector(
    (state) => state.community.members.user
  );
  const [totalPages, setTotalPages] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [state, setState] = useState({
    page: 1,
    limit: 12,
  });

  useEffect(() => {
    const queryData = {
      page: 1,
      limit: 12,
    };
    dispatch(fetchCommunityMembers({ data: queryData, communityId })).then(
      (res) => {
        if (hasProperty(res.payload, "data")) {
          setTotalPages(res.payload.data.totalPages);
          if (res.payload.data.totalPages === 1) {
            setHasMore(false);
          }
        }
      }
    );
  }, [dispatch, communityId]);

  const fetchMoreData = () => {
    dispatch(
      fetchUpdatedCommunityMembers({
        data: { page: state.page + 1, limit: state.limit },
        communityId,
      })
    );
    if (state.page + 1 === totalPages) {
      setHasMore(false);
    }
    setState({ ...state, page: state.page + 1 });
  };

  return communityMembers.loading ? (
    <div className="flex justify-center">
      <Loader className=" animate-spin my-4 text-white" />
    </div>
  ) : communityMembers.users.length === 0 ? (
    <div className="flex justify-center">No members yet</div>
  ) : (
    <InfiniteScroll
      className="mt-5 flex flex-col gap-4"
      dataLength={communityMembers.users.length}
      next={fetchMoreData}
      hasMore={hasMore}
      height={820}
      loader={<Loader className="animate-spin text-white" />}
    >
      <div className="flex flex-col gap-y-2">
        {communityMembers.users.map((user: MemberUser, index) => {
          return <MemberCard key={`${user._id}${index}`} user={user} />;
        })}
      </div>
    </InfiniteScroll>
  );
}

export default MemberSection;
