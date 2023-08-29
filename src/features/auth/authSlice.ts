// import { User } from "@/types/userTypes";
// import { ResponseData } from "@/utils/httpUtils";
// import { userSignup } from "@/utils/userUtils";
// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import { error } from "console";

// const initialState = {
//   msg: "",
//   user: "",
//   isAuthenticated: false,
//   loading: false,
//   error: {},
// };

// const registerUser = createAsyncThunk(
//   "register",
//   async (user: Partial<User>) => {
//     userSignup(user).then((res) => res);
//   }
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(registerUser.pending, (state, action) => {
//         state.loading = true;
//     });
//     builder.addCase(registerUser.fulfilled, (state, action: PayloadAction<ResponseData>) => {
        
//     });
//   },
// });

// export default authSlice.reducer;

// export const {} = authSlice.actions;
