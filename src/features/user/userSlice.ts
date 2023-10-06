import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { RegisterUser, User, UserPartial } from "@/types/userTypes";
import {
  deleteUserUtils,
  fetchUserUtils,
  updateUserDetailsUtils,
  updateUserProfileImageUtils,
  userLoginUtils,
  userSignupUtils,
} from "@/utils/userUtils";
import { ResponseData } from "@/utils/httpUtils";

const initialState: User = {
  _id: "",
  firstName: "",
  lastName: "",
  email: "",
  userName: "",
  password: "",
  bio: "",
  profilePic: "",
  phoneNo: "",
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
  return fetchUserUtils().then((response) => response.data);
});

// Register User
export const registerUser = createAsyncThunk(
  "user/register",
  async (user: Partial<RegisterUser>) => {
    return userSignupUtils(user).then((res) => res);
  }
);
// Upload Image
export const uploadUserImage = createAsyncThunk(
  "user/uploadUserImage",
  async (value: string) => {
    return updateUserProfileImageUtils(value).then((res) => res);
  }
);

// Update User Details
export const updateUserDetails = createAsyncThunk(
  "user/update/details",
  async (user: UserPartial) => {
    return updateUserDetailsUtils(user._id!, user).then((res) => res);
  }
);

// Login User
export const loginUser = createAsyncThunk(
  "/user/login",
  async (user: UserPartial) => {
    return userLoginUtils(user).then((res) => res);
  }
);

export const deleteUser = createAsyncThunk("user/delete", async () => {
  return deleteUserUtils().then((res) => res);
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeUserProfileImage: (
      state: User,
      action: PayloadAction<User["profilePic"]>
    ) => {
      state.profilePic = action.payload;
    },
    updateUserFirstName: (state: User, action: PayloadAction<UserPartial>) => {
      state.firstName = action.payload.firstName!;
    },
    updateUserLastName: (state: User, action: PayloadAction<UserPartial>) => {
      state.lastName = action.payload.lastName!;
    },
    updateUserGender: (state: User, action: PayloadAction<UserPartial>) => {
      state.gender = action.payload.gender!;
    },
    updateUserBio: (state: User, action: PayloadAction<UserPartial>) => {
      state.bio = action.payload.bio!;
    },
  },
  extraReducers: (builder) => {
    // User Registration
    builder.addCase(registerUser.pending, (state: User) => {
      state.loading = true;
    });
    builder.addCase(
      registerUser.fulfilled,
      (state: User, action: PayloadAction<ResponseData>) => {
        state.loading = false;
        state.error = "";
        state.token = action.payload.data.token!;
        localStorage.setItem("token", action.payload.data.token);
      }
    );
    builder.addCase(registerUser.rejected, (state: User, action) => {
      state.loading = false;
      state.error = action.error.message!;
    });
    // User Login
    builder.addCase(loginUser.pending, (state: User) => {
      state.loading = true;
    });
    builder.addCase(
      loginUser.fulfilled,
      (state: User, action: PayloadAction<ResponseData>) => {
        state.loading = false;
        state.error = "";
        state.token = action.payload.data.token;
        localStorage.setItem("token", action.payload.data.token);
      }
    );
    builder.addCase(loginUser.rejected, (state: User, action) => {
      state.loading = false;
      state.error = action.error?.message || "Failed to login.";
    });
    // Fetch User Data
    builder.addCase(fetchUserData.pending, (state: User) => {
      state.loading = true;
    });
    builder.addCase(fetchUserData.fulfilled, (state: User, action) => {
      state.loading = false;
      state.error = "";
      state._id = action.payload.data._id;
      state.firstName = action.payload.data.firstName;
      state.lastName = action.payload.data.lastName;
      state.email = action.payload.data.email;
      state.userName = action.payload.data.userName;
      state.bio = action.payload.data.bio;
      state.gender = action.payload.data.gender;
      state.profilePic = action.payload.data.profilePic;
      state.isBanned = action.payload.data.isBanned;
      state.isVerified = action.payload.data.isVerified;
      state.banReason = action.payload.data.banReason;
      state.token = localStorage.getItem("token") || "";
    });
    builder.addCase(fetchUserData.rejected, (state: User) => {
      state.loading = false;
      state.error = "Failed to load user data";
    });
    // Upload Image
    builder.addCase(uploadUserImage.fulfilled, (state: User, action) => {
      state.loading = false;
      state.error = "";
      console.log(action.payload);
      state.profilePic = action.payload.data.profilePic;
    });
  },
});

export default userSlice.reducer;
export const {
  changeUserProfileImage,
  updateUserFirstName,
  updateUserLastName,
  updateUserGender,
  updateUserBio,
} = userSlice.actions;
