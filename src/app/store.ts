import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/user/userSlice";
import submitReducer from "@/features/submit/submitSlice";
import homeReducer from "@/features/home/homeSlice";
import latestReducer from "@/features/home/latestSlice";
import trendingReducer from "@/features/home/trendingSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    submit: submitReducer,
    home: homeReducer,
    latestpost: latestReducer,
    trendingpost: trendingReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
