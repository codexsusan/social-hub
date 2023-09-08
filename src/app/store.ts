import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/user/userSlice";
import submitReducer from "@/features/submit/submitSlice";
import latestReducer from "@/features/home/latestSlice";
import trendingReducer from "@/features/home/trendingSlice";
import postReducer from "@/features/post/postSlice";
import commentReducer from "@/features/comment/commentSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    submit: submitReducer,
    latestpost: latestReducer,
    trendingpost: trendingReducer,
    currentpost: postReducer,
    currentcomment: commentReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
