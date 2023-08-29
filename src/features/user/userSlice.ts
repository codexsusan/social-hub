import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { User, UserPartial } from "@/types/userTypes";
import { fetchUser, userLogin, userSignup } from "@/utils/userUtils";
import { ResponseData } from "@/utils/httpUtils";
import { toast } from "@/components/ui/use-toast";

const initialState: User = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  userName: "",
  password: "",
  bio: "",
  profilePic: "",
  gender: "",
  isBanned: false,
  isVerified: false,
  banReason: "",
  token: "",
  loading: false,
  error: "",
};

// Fetch User Data
export const fetchUserData = createAsyncThunk("user/fetch", async () => {
  return fetchUser().then((response) => response.data);
});

// Register User
export const registerUser = createAsyncThunk(
  "user/register",
  async (user: UserPartial) => {
    return userSignup(user).then((res) => res);
  }
);

// Login User
export const loginUser = createAsyncThunk(
  "/user/login",
  async (user: UserPartial) => {
    return userLogin(user).then((res) => res);
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clear: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    // User Registration
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      registerUser.fulfilled,
      (state, action: PayloadAction<ResponseData>) => {
        state.loading = false;
        state.error = "";
        state.token = action.payload.data.token;
        localStorage.setItem("token", action.payload.data.token);
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          className: "bg-[#09090B] text-[#e2e2e2] border-none ",
          duration: 2000,
        });
      }
    );
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message!;
      toast({
        title: "Account created.",
        description: action.error.message!,
        duration: 2000,
      });
    });
    // User Login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<ResponseData>) => {
        state.loading = false;
        state.error = "";
        state.token = action.payload.data.token;
        localStorage.setItem("token", action.payload.data.token);
        toast({
          title: "Welcome back.",
          description: "We've logged you in.",
          className: "bg-[#09090B] text-[#e2e2e2] border-none ",
          duration: 2000,
        });
      }
    );
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error?.message || "Failed to login.";
      toast({
        title: "Login failed.",
        description: action.error.message!,
        duration: 2000,
      });
    });
    // Fetch User Data
    builder.addCase(fetchUserData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      // console.log(action.payload.user);
      state.loading = false;
      state.error = "";
      state.id = action.payload.user._id;
      state.firstName = action.payload.user.firstName;
      state.lastName = action.payload.user.lastName;
      state.email = action.payload.user.email;
      state.userName = action.payload.user.userName;
      state.bio = action.payload.user.bio;
      state.gender = action.payload.user.gender;
      state.profilePic = action.payload.user.profilePic;
      state.isBanned = action.payload.user.isBanned;
      state.isVerified = action.payload.user.isVerified;
      state.banReason = action.payload.user.banReason;
      state.token = localStorage.getItem("token") || "";
    });
    builder.addCase(fetchUserData.rejected, (state) => {
      state.loading = false;
      state.error = "Failed to load user data";
      // localStorage.removeItem("token");
      // window.location.href = "/auth/login";
    });
  },
});

export default userSlice.reducer;
export const { clear } = userSlice.actions;
