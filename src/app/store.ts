import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/user/userSlice";
import submitReducer from "@/features/submit/submitSlice";
import profileReducer from "@/features/profile/profileSlice";
import authorReducer from "@/features/profile/authorSlice";
import homeReducer from "@/features/home/homeSlice";
import singlepostReducer from "@/features/general/singlePostSlice";
import communityReducer from "@/features/community/communitySlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    author: authorReducer,
    submit: submitReducer,
    home: homeReducer,
    singlepage: singlepostReducer,
    profile: profileReducer,
    community: communityReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
