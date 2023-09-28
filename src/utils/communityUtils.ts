import { CreateCommunity, PartialCommunity } from "@/types/communityTypes";
import { request } from "./httpUtils";

// Create Community
export const createCommunityUtils = async (community: CreateCommunity) => {
  const response = await request("/api/community/create", "POST", community);
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
  communityId: PartialCommunity["_id"]
) => {
  const response = await request(
    `/api/post/get-all-posts-by-community/${communityId}`,
    "GET",
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

// TODO: Leave Community
