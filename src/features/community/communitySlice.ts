import { combineReducers } from "@reduxjs/toolkit";
import createCommunity from "./createCommunity";
import communityHome from "./communityHome";
import communityLists from "./communityLists";

const communityReducer = combineReducers({
  create: createCommunity,
  home: communityHome,
  lists: communityLists,
});

export default communityReducer;
