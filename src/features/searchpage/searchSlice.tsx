import { combineReducers } from "@reduxjs/toolkit";

import searchPostReducer from "./searchPostSlice";
import searchInfoReducer from "./searchInfoSlice";

const searchSlice = combineReducers({
  searchInfo: searchInfoReducer,
  searchPost: searchPostReducer,
});

export default searchSlice;
