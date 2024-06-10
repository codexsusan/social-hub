import { CreateCommunity, PartialCommunity } from "@/types/communityTypes";
import { request } from "./httpUtils";
import { queryParamsType } from "@/types/generalTypes";
import { UserPartial } from "@/types/userTypes";

// Create Community
export const createCommunityUtils = async (community: CreateCommunity) => {
  const response = await request("/api/community/create", "POST", community);
  return response;
};

// Update Community Details
export const updateCommunityDetailsUtils = async (
  community: PartialCommunity,
  communityId: PartialCommunity["_id"]
) => {
  const response = await request(
    `/api/community/update-community/${communityId}`,
    "PUT",
    community
  );
  return response;
};

// Get All Community
export const getAllCommunityUtils = async (data: queryParamsType) => {
  const response = await request(
    "/api/community/get-all-communities",
    "GET",
    data
  );
  return response;
};

// Get Most Followed Communities
export const getMostFollowedCommunitiesUtils = async (
  data: queryParamsType
) => {
  const response = await request(
    "/api/community/get-most-followed-communities",
    "GET",
    data
  );
  return response;
};

// Get Community By Id
export const getCommunityByIdUtils = async (
  communityId: PartialCommunity["_id"]
) => {
  const response = await request(
    `/api/community/get-community/${communityId}`,
    "GET",
    {}
  );
  return response;
};

// Get all posts by community
export const getAllPostByCommunity = async (
  communityId: PartialCommunity["_id"],
  data: queryParamsType
) => {
  const response = await request(
    `/api/post/get-all-posts-by-community/${communityId!}`,
    "GET",
    data
  );
  return response;
};

// Get joined communities by user
export const getJoinedCommunitiesByUser = async (data: queryParamsType) => {
  const response = await request(
    `/api/community/get-joined-communities`,
    "GET",
    data
  );
  return response;
};

// Get joined members by community id
export const getJoinedMembersByCommunityIdUtils = async (
  data: queryParamsType,
  communityId: PartialCommunity["_id"]
) => {
  const response = await request(
    `/api/community/get-joined-members/${communityId}`,
    "GET",
    data
  );
  return response;
};

// Get moderators by community id
export const getModeratorsByCommunityIdUtils = async (
  data: queryParamsType,
  communityId: PartialCommunity["_id"]
) => {
  const response = await request(
    `/api/community/get-moderators/${communityId}`,
    "GET",
    data
  );
  return response;
};

// Get community join requests
export const getCommunityJoinRequestsUtils = async (
  data: queryParamsType,
  communityId: PartialCommunity["_id"]
) => {
  const response = await request(
    `/api/community/get-join-requests/${communityId}`,
    "GET",
    data
  );
  return response;
};

// Alert: Might have issue in this endpoint (Because body has no data)
// Accept Community Join Request
export const acceptCommunityJoinRequestUtils = async () => {
  const response = await request(
    "/api/community/accept-join-request/",
    "POST",
    {}
  );
  return response;
};

// Join Community
export const joinCommunityUtils = async (
  communityId: PartialCommunity["_id"]
) => {
  const response = await request(
    `/api/community/join-community/${communityId}`,
    "POST",
    {}
  );
  return response;
};

// Add community guidelines
export const addCommunityGuidelinesUtils = async (
  community_guidelines: PartialCommunity["community_guidelines"],
  communityId: PartialCommunity["_id"]
) => {
  const response = await request(
    `/api/community/add-community-guidelines/${communityId}`,
    "POST",
    { community_guidelines }
  );
  return response;
};

// Update Community Guidelines
export const updateCommunityGuidelinesUtils = async (
  community_guidelines: PartialCommunity["community_guidelines"],
  communityId: PartialCommunity["_id"]
) => {
  const response = await request(
    `/api/community/edit-community-guidelines/${communityId}`,
    "PUT",
    { community_guidelines }
  );
  return response;
};

// Get Community Guidelines
export const getCommunityGuidelinesUtils = async (
  communityId: PartialCommunity["_id"]
) => {
  const response = await request(
    `/api/community/get-community-guidelines/${communityId}`,
    "GET",
    {}
  );
  return response;
};

// Delete Community Guidelines
export const deleteCommunityGuidelinesUtils = async (
  communityId: PartialCommunity["_id"]
) => {
  const response = await request(
    `/api/community/delete-community-guidelines/${communityId}`,
    "DELETE",
    {}
  );
  return response;
};

// Alert: Body need to be sent in this endpoint
// Transfer Ownership
export const transferCommunityOwnershipUtils = async (
  communityId: PartialCommunity["_id"]
) => {
  const response = request(
    `/api/community/transfer-ownership/${communityId}`,
    "POST",
    {}
  );
  return response;
};

// Leave Community
export const leaveCommunityUtils = async (
  communityId: PartialCommunity["_id"]
) => {
  const response = await request(
    `/api/community/leave-community/${communityId}`,
    "POST",
    {}
  );
  return response;
};

// Delete Community By Id
export const deleteCommunityUtils = async (
  communityId: PartialCommunity["_id"]
) => {
  const response = await request(
    `/api/community/delete-community/${communityId}`,
    "DELETE",
    {}
  );
  return response;
};

// Promote User To Moderator
export const promoteUserToModeratorUtils = async (
  communityId: PartialCommunity["_id"],
  userId: UserPartial["_id"]
) => {
  const response = await request(
    `/api/community/promote-to-moderator/${communityId}`,
    "POST",
    { userId }
  );
  return response;
};

export const demoteModeratorToUserUtils = async (
  communityId: PartialCommunity["_id"],
  userId: UserPartial["_id"]
) => {
  const response = await request(
    `/api/community/demote-moderator/${communityId}`,
    "POST",
    { moderatorId: userId }
  );
  return response;
};

// Update Community Profile Picture
export const updateCommunityProfileIconUtils = async (
  imageLink: string,
  communityId: PartialCommunity["_id"]
) => {
  const response = request("/api/uploads/update-profile-image", "PUT", {
    imageLink,
    type: "community",
    communityId,
  });
  return response;
};

export const searchCommunityQueryUtils = async (data: { query: string }) => {
  const response = await request(
    `/api/community/search-community`,
    "GET",
    data
  );
  return response;
};
