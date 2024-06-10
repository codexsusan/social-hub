import { PostPartial } from "@/types/postTypes";
import { request } from "./httpUtils";
import { queryParamsType } from "@/types/generalTypes";

// Add Bookmark
export const addBookmarkUtils = (postId: PostPartial["_id"]) => {
  const response = request(`/api/bookmarks/add-bookmark/${postId}`, "POST", {});
  return response;
};

// Get Bookmarks
export const getBookmarksUtils = (data: queryParamsType) => {
  const response = request("/api/bookmarks/get-bookmarks", "GET", data);
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
