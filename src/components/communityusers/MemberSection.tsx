import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchCommunityMembers } from "@/features/communityusers/communityUser";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import MemberCard from "./MemberCard";
import { MemberUser } from "@/types/userTypes";

function MemberSection() {
  const { communityId } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const queryData = {
      page: 1,
      limit: 10,
    };
    dispatch(fetchCommunityMembers({ data: queryData, communityId }));
  }, [dispatch, communityId]);

  const communityMembers = useAppSelector((state) => state.community.members);
  return (
    <div>
      {communityMembers.users.map((user:MemberUser) => {
        return <MemberCard key={user._id} user={user} />;
      })}
    </div>
  );
}

export default MemberSection;
