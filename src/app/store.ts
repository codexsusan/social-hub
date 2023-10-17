import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/user/userSlice";
import submitReducer from "@/features/submit/submitSlice";
import profileReducer from "@/features/profile/profileSlice";
import authorReducer from "@/features/authorprofile/authorSlice";
import homeReducer from "@/features/home/homeSlice";
import singlepostReducer from "@/features/general/singlePostSlice";
import communityReducer from "@/features/community/communitySlice";
import userSinglePostReducer from "@/features/usersinglepost/usersinglepostslice";
import exploreReducer from "@/features/explore-community/exploreSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    author: authorReducer,
    submit: submitReducer,
    home: homeReducer,
    singlepage: singlepostReducer,
    usersinglepost: userSinglePostReducer,
    profile: profileReducer,
    community: communityReducer,
    explore: exploreReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
