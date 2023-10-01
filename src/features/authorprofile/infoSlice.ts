import { AuthorPartial } from "@/types/userTypes";
import { ResponseData } from "@/utils/httpUtils";
import { getUserByIdUtils } from "@/utils/userUtils";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: AuthorPartial = {
  _id: "",
  firstName: "",
  lastName: "",
  userName: "",
  bio: "",
  profilePic: "",
  gender: "",
  isBanned: false,
  banReason: "",
  loading: false,
  error: "",
};

export const fetchAuthorData = createAsyncThunk(
  "author/data/get",
  async (id: AuthorPartial["_id"]) => {
    return getUserByIdUtils(id).then((res) => res);
  }
);

const infoSlice = createSlice({
  name: "info",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAuthorData.pending, (state: AuthorPartial) => {
      state.loading = true;
    });
    builder.addCase(
      fetchAuthorData.fulfilled,
      (state: AuthorPartial, action: PayloadAction<ResponseData>) => {
        state.loading = false;
        const user = action.payload.data.data;
        state._id = user._id;
        state.firstName = user.firstName;
        state.lastName = user.lastName;
        state.gender = user.gender;
        state.userName = user.userName;
        state.profilePic = user.profilePic;
        state.isBanned = user.isBanned;
        state.banReason = user.banReason;
      }
    );
    builder.addCase(fetchAuthorData.rejected, (state: AuthorPartial) => {
      state.loading = true;
    });
  },
});

export default infoSlice.reducer;
