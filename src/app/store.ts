import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/user/userSlice";
import submitReducer from "@/features/submit/submitSlice";
import homeReducer from "@/features/home/homeSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    submit: submitReducer,
    home: homeReducer,
    // auth: authReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
