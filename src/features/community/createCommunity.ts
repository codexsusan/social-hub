import { CreateCommunity } from "@/types/communityTypes";
import { createCommunityUtils } from "@/utils/communityUtils";
import { ResponseData } from "@/utils/httpUtils";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: CreateCommunity = {
  _id: "",
  name: "",
  displayName: "",
  description: "",
  community_type: "",
  icon_image: "",
  loading: false,
  error: "",
};

export const createCommunity = createAsyncThunk(
  "community/create",
  async (community: CreateCommunity) => {
    return createCommunityUtils(community).then((res) => res);
  }
);

const createCommunitySlice = createSlice({
  name: "create",
  initialState,
  reducers: {
    changeName: (state: CreateCommunity, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    changeDisplayName: (
      state: CreateCommunity,
      action: PayloadAction<string>
    ) => {
      state.displayName = action.payload;
    },
    changeDescription: (
      state: CreateCommunity,
      action: PayloadAction<string>
    ) => {
      state.description = action.payload;
    },
    changeType: (state: CreateCommunity, action: PayloadAction<string>) => {
      state.community_type = action.payload;
    },
    changeCommunityProfileImage: (
      state: CreateCommunity,
      action: PayloadAction<string>
    ) => {
      state.icon_image = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createCommunity.pending, (state: CreateCommunity) => {
      state.loading = true;
    });
    builder.addCase(
      createCommunity.fulfilled,
      (state: CreateCommunity, action: PayloadAction<ResponseData>) => {
        state.loading = false;
        state._id = action.payload.data._id;
      }
    );
    builder.addCase(
      createCommunity.rejected,
      (state: CreateCommunity, action) => {
        state.loading = false;
        state.error = action.error.message!;
      }
    );
  },
});

export default createCommunitySlice.reducer;
export const {
  changeName,
  changeDisplayName,
  changeDescription,
  changeType,
  changeCommunityProfileImage,
} = createCommunitySlice.actions;
