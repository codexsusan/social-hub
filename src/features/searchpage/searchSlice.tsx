import { combineReducers } from "@reduxjs/toolkit";

import searchPostReducer from "./searchPostSlice";
import searchInfoReducer from "./searchInfoSlice";
import searchCommunityReducer from "./searchCommunitySlice";

const searchSlice = combineReducers({
  searchInfo: searchInfoReducer,
  searchPost: searchPostReducer,
  searchCommunity: searchCommunityReducer,
});

export default searchSlice;
