import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/user/userSlice";
import submitReducer from "@/features/submit/submitSlice";
import latestReducer from "@/features/home/latestSlice";
import trendingReducer from "@/features/home/trendingSlice";
import postReducer from "@/features/post/postSlice";
import commentReducer from "@/features/comment/commentSlice";
import mostviewedReducer from "@/features/home/mostviewedSlice";
import profileReducer from "@/features/profile/profileSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    submit: submitReducer,
    latestpost: latestReducer,
    trendingpost: trendingReducer,
    mostviewedpost: mostviewedReducer,
    currentpost: postReducer,
    currentcomment: commentReducer,
    profile: profileReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
