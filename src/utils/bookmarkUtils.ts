import { PostPartial } from "@/types/postTypes";
import { request } from "./httpUtils";

// Add Bookmark
export const addBookmarkUtils = (postId: PostPartial["_id"]) => {
  const response = request(`/api/bookmarks/add-bookmark/${postId}`, "POST", {});
  return response;
};

// Get Bookmarks
export const getBookmarksUtils = () => {
  const response = request("/api/bookmarks/get-bookmarks", "GET", {});
  return response;
};

// Remove Bookmark
export const removeBookmarkUtils = (postId: PostPartial["_id"]) => {
  const response = request(
    `/api/bookmarks/remove-bookmark/${postId}`,
    "DELETE",
    {}
  );
  return response;
};
