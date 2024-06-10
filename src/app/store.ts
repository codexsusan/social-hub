import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/user/userSlice";
import submitReducer from "@/features/submit/submitSlice";
import profileReducer from "@/features/profile/profileSlice";
import authorReducer from "@/features/authorprofile/authorSlice";
import homeReducer from "@/features/home/homeSlice";
import singlepostReducer from "@/features/general/singlePostSlice";
import communityReducer from "@/features/community/communitySlice";
import userSinglePostReducer from "@/features/usersinglepost/usersinglepostslice";
import communitySinglePOstReducer from "@/features/communitysinglepost/communitysinglepostslice";
import exploreReducer from "@/features/explore-community/exploreSlice";
import searchReducer from "@/features/searchpage/searchSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    author: authorReducer,
    submit: submitReducer,
    home: homeReducer,
    singlepage: singlepostReducer,
    usersinglepost: userSinglePostReducer,
    communitysinglepost: communitySinglePOstReducer,
    profile: profileReducer,
    community: communityReducer,
    explore: exploreReducer,
    search: searchReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
