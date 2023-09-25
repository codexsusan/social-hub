import { PostPartial } from "@/types/postTypes";
import { request } from "./httpUtils";
import { queryParamsType } from "@/types/generalTypes";

// Add Bookmark
export const addBookmarkUtils = async (postId: PostPartial["_id"]) => {
  const response = await request(
    `/api/bookmarks/add-bookmark/${postId}`,
    "POST",
    {}
  );
  return response;
};

// Get Bookmarks
export const getBookmarksUtils = async (data: queryParamsType) => {
  const response = await request("/api/bookmarks/get-bookmarks", "GET", data);
  return response;
};

// Remove Bookmark
export const removeBookmarkUtils = async (postId: PostPartial["_id"]) => {
  const response = await request(
    `/api/bookmarks/remove-bookmark/${postId}`,
    "DELETE",
    {}
  );
  return response;
};
