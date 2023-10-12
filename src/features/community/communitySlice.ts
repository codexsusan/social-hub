import { combineReducers } from "@reduxjs/toolkit";
import createCommunity from "./createCommunity";
import communityHome from "./communityHome";
import communityLists from "./communityLists";
import exploreReducer from "../explore-community/exploreSlice";
import membersReducer from "../communityusers/communityUser"

const communityReducer = combineReducers({
  create: createCommunity,
  home: communityHome,
  lists: communityLists,
  explore: exploreReducer,
  members: membersReducer
});

export default communityReducer;
