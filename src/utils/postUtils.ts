import { PostPartial } from "@/types/postTypes";
import { ResponseData, request } from "./httpUtils";
import { queryParamsType } from "@/types/generalTypes";
import { AuthorPartial } from "@/types/userTypes";

// Create post
export const createPostUtils = async (post: PostPartial) => {
  const response = await request("/api/post/create-post", "POST", post);
  return response;
};

// Get single post
export const getPostUtils = async (id: PostPartial["_id"]) => {
  const response = await request(`/api/post/get-post/${id}`, "GET", {});
  return response;
};

// Get all posts
// TODO: Need to work with query params
export const getAllPostsUtils = async () => {
  const response = await request("/api/post/get-all-posts", "GET", {});
  return response;
};

// Get latest posts
export const getLatestPostsUtils = async (data: queryParamsType) => {
  const response = await request("/api/post/get-latest-posts", "GET", data);
  return response;
};

// Get trending posts
export const getTrendingPostsUtils = async (data: queryParamsType) => {
  const response = await request("/api/post/get-trending-posts", "GET", data);
  return response;
};

// Get most viewed posts
export const getMostViewedPostsUtils = async (data: queryParamsType) => {
  const response = await request(
    "/api/post/get-most-viewed-posts",
    "GET",
    data
  );
  return response;
};

// Delete post by id
export const deletePostByIdUtils = async (id: PostPartial["_id"]) => {
  const response = await request(`/api/post/delete-post/${id}`, "DELETE", {});
  return response;
};

// Edit post by id
export const editPostByIdUtils = async (
  id: PostPartial["_id"],
  post: PostPartial
) => {
  const response = await request(`/api/post/update-post/${id}`, "PUT", post);
  return response;
};

// Get all post by user
export const getAllPostsByUserUtils = async (data: queryParamsType) => {
  const response = await request(
    "/api/post/get-all-posts-by-user",
    "GET",
    data
  );
  return response;
};

// Get all post by user id
// TODO: End point not made
export const getAllPostsByUserIdUtils = async (
  id: AuthorPartial["_id"],
  data: queryParamsType
) => {
  const response = await request(
    `/api/post/get-all-posts-by-user/${id}`,
    "GET",
    data
  );
  return response;
};

// Upvote Post by id
export const upvotePostUtils = async (id: PostPartial["_id"]) => {
  const response = await request(`/api/post/upvote-post/${id}`, "POST", {});
  return response;
};

// Downvote Post by id
export const downvotePostUtils = async (id: PostPartial["_id"]) => {
  const response = await request(`/api/post/downvote-post/${id}`, "POST", {});
  return response;
};

// Get all posts by community
// TODO: Need to work with query params
export const getAllPostsByCommunityUtils = async () => {
  const response = await request(
    `/api/post/get-all-posts-by-community`,
    "GET",
    {}
  );
  return response;
};

// Get all blocked posts
export const getAllBlockedPostsUtils = async () => {
  const response = await request(`/api/post/get-blocked-posts`, "GET", {});
  return response;
};

// Unblock post
export const unblockPostUtils = async (id: PostPartial["_id"]) => {
  const response = await request(`/api/post/unblock-post/${id}`, "POST", {});
  return response;
};

// Report post
export const reportPostByIdUtils: (
  id: PostPartial["_id"]
) => Promise<ResponseData> = async (id) => {
  const response = await request(`/api/post/report-post/${id}`, "POST", {});
  return response;
};

// Unreport post
export const unreportPostUtils = async (id: PostPartial["_id"]) => {
  const response = await request(`/api/post/unreport-post/${id}`, "POST", {});
  return response;
};
