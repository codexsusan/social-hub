import { PostPartial } from "@/types/postTypes";
import { request } from "./httpUtils";

// Create post
export const createPostUtils = async (post: PostPartial) => {
  const response = await request("/api/post/create-post", "POST", post);
  return response;
};

// Get single post
export const getPostUtils = async (id: PostPartial["_id"]) => {
  const response = await request(`/api/post/get-post/${id}`, "GET");
  return response;
};

// Get all posts
// TODO: Need to work with query params
export const getAllPostsUtils = async () => {
  const response = await request("/api/post/get-all-posts", "GET");
  return response;
};

// Get latest posts
export const getLatestPostsUtils = async () => {
  const response = await request("/api/post/get-latest-posts", "GET");
  return response;
};

// Get trending posts
export const getTrendingPostsUtils = async () => {
  const response = await request("/api/post/get-trending-posts", "GET");
  return response;
};

// Delete post by id
export const deletePostByIdUtils = async (id: PostPartial["_id"]) => {
  const response = await request(`/api/post/delete-post/${id}`, "DELETE");
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
// TODO: Need to work with query params
export const getAllPostsByUserUtils = async (id: PostPartial["_id"]) => {
  const response = await request(
    `/api/post/get-all-posts-by-user/${id}`,
    "GET"
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
  const response = await request(`/api/post/get-all-posts-by-community`, "GET");
  return response;
};

// TODO: Need to add more post utils
