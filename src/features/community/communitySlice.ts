import { combineReducers } from "@reduxjs/toolkit";
import createCommunity from "./createCommunity";
import communityHome from "./communityHome";
import communityLists from "./communityLists";
import exploreReducer from "../explore-community/exploreSlice";
import membersReducer from "../communityusers/communityMembers"
import communitySettings from "../communitysettings/communitysetting";

const communityReducer = combineReducers({
  create: createCommunity,
  home: communityHome,
  lists: communityLists,
  explore: exploreReducer,
  members: membersReducer,
  settings: communitySettings,
});

export default communityReducer;
