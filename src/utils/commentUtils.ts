import {  NestedComment } from "@/types/commentTypes";
import { request } from "./httpUtils";
import { PostPartial } from "@/types/postTypes";

// Create Comment
export const createCommentOnPostUtils = async (
  content: NestedComment["content"],
  postId?: PostPartial["_id"]
) => {
  const response = await request(
    `/api/comment/create-comment/${postId}`,
    "POST",
    {
      content,
      parent_type: "POST",
    }
  );
  return response;
};

// Create Reply on Comment
export const createReplyOnCommentUtils = async (
  content: NestedComment["content"],
  postId: PostPartial["_id"],
  parentId: NestedComment["_id"]
) => {
  const response = await request(
    `/api/comment/create-comment/${postId}`,
    "POST",
    {
      content,
      parent_type: "COMMENT",
      comment_id: parentId,
    }
  );
  return response;
};

// Get Comments
export const getCommentsOnPostUtils = async (id: PostPartial["_id"]) => {
  const response = await request(`/api/comment/get-comments/${id}`, "GET", {});
  return response;
};

// Get Comments Replies
export const getCommentRepliesUtils = async (id: NestedComment["_id"]) => {
  const response = await request(
    `/api/comment/get-comment-replies/${id}`,
    "GET",
    {}
  );
  return response;
};

// Delete Comment by id
export const deleteCommentByIdUtils = async (id: NestedComment["_id"]) => {
  const response = await request(
    `/api/comment/delete-comment/${id}`,
    "DELETE",
    {}
  );
  return response;
};

export const upvoteCommentByIdUtils = async (id: NestedComment["_id"]) => {
  const response = await request(
    `/api/comment/upvote-comment/${id}`,
    "POST",
    {}
  );
  return response;
};

export const downvoteCommentByIdUtils = async (id: NestedComment["_id"]) => {
  const response = await request(
    `/api/comment/downvote-comment/${id}`,
    "POST",
    {}
  );
  return response;
};
