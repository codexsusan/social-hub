import { combineReducers } from "@reduxjs/toolkit";
import communityInfo from "./communityInfo";
import communityPost from "./communityPost";

const communityHome = combineReducers({
  info: communityInfo,
  posts: communityPost,
});

export default communityHome;
