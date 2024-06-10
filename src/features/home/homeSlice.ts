import { combineReducers } from "@reduxjs/toolkit";

import latestReducer from "@/features/home/latestSlice";
import trendingReducer from "@/features/home/trendingSlice";
import mostviewedReducer from "@/features/home/mostviewedSlice";

const homeReducer = combineReducers({
  latest: latestReducer,
  trending: trendingReducer,
  mostviewed: mostviewedReducer,
});

export default homeReducer;
