import { CommunityHome } from "@/types/communityTypes";
import { getCommunityByIdUtils } from "@/utils/communityUtils";
import { ResponseData } from "@/utils/httpUtils";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: CommunityHome = {
  _id: "",
  name: "",
  displayName: "",
  description: "",
  community_type: "",
  icon_image: "",
  loading: false,
  error: "",
};

export const fetchCommunityById = createAsyncThunk(
  "fetch/community/id",
  async (id: CommunityHome["_id"]) => {
    return getCommunityByIdUtils(id).then((res) => res);
  }
);

const communityInfo = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCommunityById.pending, (state: CommunityHome) => {
      state.loading = true;
    });
    builder.addCase(
      fetchCommunityById.fulfilled,
      (state: CommunityHome, action: PayloadAction<ResponseData>) => {
        state.loading = false;
        const data = action.payload.data.data;
        state._id = data._id;
        state.name = data.name;
        state.displayName = data.displayName;
        state.description = data.description;
        state.icon_image = data.icon_image;
        state.community_type = data.community_type;
      }
    );
    builder.addCase(
      fetchCommunityById.rejected,
      (state: CommunityHome, action) => {
        state.loading = false;
        state.error = action.error.message!;
      }
    );
  },
});

export default communityInfo.reducer;
