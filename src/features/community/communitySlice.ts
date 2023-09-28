import { combineReducers } from "@reduxjs/toolkit";
import createCommunity from "./createCommunity";
import communityHome from "./communityHome";

const communityReducer = combineReducers({
  create: createCommunity,
  home: communityHome,
});

export default communityReducer;
