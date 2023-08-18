import { createSlice } from "@reduxjs/toolkit";

import { User } from "@/types/userTypes";

const initialState: User = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  token: "",
  username: "",
  profilePic: "",
  bio: "",
  isVerified: false,
  isBanned: false,
  banReason: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addEmail: (state, action) => {
      state.email = action.payload;
    },
    addPassword: (state, action) => {
      state.password = action.payload;
    },
    clearLogin: (state) => {
      state.email = "";
      state.password = "";
    },
    clearSignup: (state) => {
      state.email = "";
      state.password = "";
      state.username = "";
      state.firstName = "";
      state.lastName = "";
    },
  },
  extraReducers: {},
});

export default userSlice.reducer;
export const { addEmail, addPassword, clearLogin, clearSignup } =
  userSlice.actions;
