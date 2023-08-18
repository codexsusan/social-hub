import { createSlice } from "@reduxjs/toolkit";

import { User } from "@/types/userTypes";

const initialState: User = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  userName: "",
  profilePic: "",
  bio: "",
  gender: "",
  isVerified: false,
  isBanned: false,
  banReason: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clear: (state) => {
      state.id = "";
      state.firstName = "";
      state.lastName = "";
      state.userName = "";
      state.email = "";
      state.password = "";
      state.profilePic = "";
      state.bio = "";
      state.isVerified = false;
      state.isBanned = false;
      state.banReason = "";
    },
  },
  extraReducers: {},
});

export default userSlice.reducer;
export const { clear } = userSlice.actions;
