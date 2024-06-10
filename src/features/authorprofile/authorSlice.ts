import { combineReducers } from "@reduxjs/toolkit";
import infoReducer from "@/features/authorprofile/infoSlice";
import postReducer from "@/features/authorprofile/postSlice";

const authorSlice = combineReducers({
  info: infoReducer,
  post: postReducer,
});

export default authorSlice;
