import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/user/userSlice";
import submitReducer from "@/features/submit/submitSlice";
import latestReducer from "@/features/home/latestSlice";
import trendingReducer from "@/features/home/trendingSlice";
import postReducer from "@/features/post/postSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    submit: submitReducer,
    latestpost: latestReducer,
    trendingpost: trendingReducer,
    singlepost: postReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
