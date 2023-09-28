import { CreateCommunity, PartialCommunity } from "@/types/communityTypes";
import { request } from "./httpUtils";

// Create Community
export const createCommunityUtils = (community: CreateCommunity) => {
  const response = request("/api/community/create", "POST", community);
  return response;
};

// Get All Community
export const getAllCommunityUtils = () => {
  const response = request("/api/community/get-all-communities", "GET", {});
  return response;
};

// Get Community By Id
export const getCommunityByIdUtils = (communityId: PartialCommunity["_id"]) => {
  const response = request(
    `/api/community/get-community/${communityId}`,
    "GET",
    {}
  );
  return response;
};

// Join Community
export const joinCommunityUtils = (communityId: PartialCommunity["_id"]) => {
  const response = request(
    `/api/community/join-community/${communityId}`,
    "POST",
    {}
  );
  return response;
};

export const promoteUserToModeratorUtils = (
  communityId: PartialCommunity["_id"]
) => {
  const response = request(
    `/api/community/promote-to-moderator/${communityId}`,
    "POST",
    {}
  );
  return response;
};

// TODO: Leave Community
