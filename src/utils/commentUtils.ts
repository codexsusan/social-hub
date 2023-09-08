import { CommentPartial } from "@/types/commentTypes";
import { request } from "./httpUtils";
import { PostPartial } from "@/types/postTypes";

// Create Comment
export const createCommentOnPostUtils = async (
  comment: CommentPartial,
  postId?: PostPartial["_id"]
) => {
  const response = await request(
    `/api/comment/create-comment/${postId}`,
    "POST",
    comment
  );
  return response;
};

// Get Comments
export const getCommentsOnPostUtils = async (id: PostPartial["_id"]) => {
  const response = await request(`/api/comment/get-comments/${id}`, "GET");
  return response;
};

// Get Comments Replies
export const getCommentRepliesUtils = async (id: CommentPartial["_id"]) => {
  const response = await request(
    `/api/comment/get-comment-replies/${id}`,
    "GET"
  );
  return response;
};

// Delete Comment by id
export const deleteCommentByIdUtils = async (id: CommentPartial["_id"]) => {
  const response = await request(`/api/comment/delete-comment/${id}`, "DELETE");
  return response;
};
