import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  fetchCommunityModerators,
  fetchUpdatedCommunityModerators,
} from "@/features/communityusers/communityModerator";

import { hasProperty } from "@/utils/generalUtils";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import MemberCard from "./MemberCard";
import { MemberUser } from "@/types/userTypes";

function ModeratorSection() {
  const { communityId } = useParams();
  const dispatch = useAppDispatch();

  const communityModerators = useAppSelector(
    (state) => state.community.members.moderators
  );
  const [totalPages, setTotalPages] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [state, setState] = useState({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    const queryData = {
      page: 1,
      limit: 10,
    };
    dispatch(fetchCommunityModerators({ data: queryData, communityId })).then(
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
      fetchUpdatedCommunityModerators({
        data: { page: state.page + 1, limit: state.limit },
        communityId,
      })
    );
    if (state.page + 1 === totalPages) {
      setHasMore(false);
    }
    setState({ ...state, page: state.page + 1 });
  };

  return communityModerators.loading ? (
    <div className="flex justify-center">
      <Loader className=" animate-spin my-4 text-white" />
    </div>
  ) : communityModerators.users.length === 0 ? (
    <div className="flex justify-center">No moderators yet</div>
  ) : (
    <InfiniteScroll
      className="mt-0 flex flex-col gap-4"
      dataLength={communityModerators.users.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<Loader className="animate-spin text-white" />}
    >
      <div className="flex flex-col gap-y-2">
        {communityModerators.users.map((user: MemberUser, index) => {
          return <MemberCard key={`${user._id}${index}`} user={user} />;
        })}
      </div>
    </InfiniteScroll>
  );
}

export default ModeratorSection;

// <div>
//   {communityModerators.users.map((user: MemberUser) => {
//     console.log(user);
//     return <MemberCard key={user._id} user={user} />;
//   })}
// </div>
