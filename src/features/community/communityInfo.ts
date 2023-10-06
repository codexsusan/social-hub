import { CommunityHome, PartialCommunity } from "@/types/communityTypes";
import {
  getCommunityByIdUtils,
  joinCommunityUtils,
  leaveCommunityUtils,
} from "@/utils/communityUtils";
import { ResponseData } from "@/utils/httpUtils";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: CommunityHome = {
  _id: "",
  name: "",
  displayName: "",
  description: "",
  community_type: "private",
  isAdmin: false,
  icon_image: "",
  loading: false,
  isMember: false,
  error: "",
};

export const fetchCommunityById = createAsyncThunk(
  "fetch/community/id",
  async (id: CommunityHome["_id"]) => {
    return getCommunityByIdUtils(id).then((res) => res);
  }
);

export const joinCommunity = createAsyncThunk(
  "join/community",
  async (id: PartialCommunity["_id"]) => {
    return joinCommunityUtils(id).then((res) => res);
  }
);

export const leaveCommunity = createAsyncThunk(
  "leave/community",
  async (communityId: PartialCommunity["_id"]) => {
    return leaveCommunityUtils(communityId).then((res) => res);
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
        state.isMember = data.isMember;
        state.member_count = data.member_count;
        state.community_type = data.community_type;
        state.created_at = data.createdAt;
      }
    );
    builder.addCase(
      fetchCommunityById.rejected,
      (state: CommunityHome, action) => {
        state.loading = false;
        state.error = action.error.message!;
      }
    );
    builder.addCase(leaveCommunity.fulfilled, (state: CommunityHome) => {
      state.isMember = false;
    });
    builder.addCase(
      joinCommunity.fulfilled,
      (state: CommunityHome, action: PayloadAction<ResponseData>) => {
        console.log(action.payload);
        if (state.community_type === "public") {
          state.isMember = true;
        } else if (state.community_type === "private") {
          state.isMember = false;
        }
      }
    );
  },
});

export default communityInfo.reducer;
