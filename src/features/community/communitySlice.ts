import { combineReducers } from "@reduxjs/toolkit";
import createCommunity from "./createCommunity";
import communityHome from "./communityHome";
import communityLists from "./communityLists";
import exploreReducer from "../explore-community/exploreSlice";

const communityReducer = combineReducers({
  create: createCommunity,
  home: communityHome,
  lists: communityLists,
  explore: exploreReducer,
});

export default communityReducer;
