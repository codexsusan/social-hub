import { combineReducers } from "@reduxjs/toolkit";
import postReducer from "@/features/post/postSlice";
import commentReducer from "@/features/comment/commentSlice";

const singlepostReducer = combineReducers({
  post: postReducer,
  comment: commentReducer,
});

export default singlepostReducer;
