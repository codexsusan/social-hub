import { combineReducers } from "@reduxjs/toolkit";
import postReducers from "@/features/profile/postSlice";
import bookmarkReducers from "@/features/profile/bookmarkSlice";

const profileReducer = combineReducers({
  posts: postReducers,
  bookmarks: bookmarkReducers,
});

export default profileReducer;
