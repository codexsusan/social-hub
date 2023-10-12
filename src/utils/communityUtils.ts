import { CreateCommunity, PartialCommunity } from "@/types/communityTypes";
import { request } from "./httpUtils";
import { queryParamsType } from "@/types/generalTypes";

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
export const getAllCommunityUtils = async () => {
  const response = await request(
    "/api/community/get-all-communities",
    "GET",
    {}
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

// Get joined members by community
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

// Promote User To Moderator
export const promoteUserToModeratorUtils = async (
  communityId: PartialCommunity["_id"]
) => {
  const response = await request(
    `/api/community/promote-to-moderator/${communityId}`,
    "POST",
    {}
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
