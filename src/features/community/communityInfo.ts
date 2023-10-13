import { CommunityHome, PartialCommunity } from "@/types/communityTypes";
import {
  getCommunityByIdUtils,
  joinCommunityUtils,
  leaveCommunityUtils,
  updateCommunityDetailsUtils,
  updateCommunityProfileIconUtils,
} from "@/utils/communityUtils";
import { ResponseData } from "@/utils/httpUtils";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: CommunityHome = {
  _id: "",
  name: "",
  displayName: "",
  description: "",
  community_type: "",
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

export const uploadCommunityIcon = createAsyncThunk(
  "upload/community/icon",
  async (data: { imageLink: string; communityId: PartialCommunity["_id"] }) => {
    return updateCommunityProfileIconUtils(
      data.imageLink,
      data.communityId
    ).then((res) => res);
  }
);

export const leaveCommunity = createAsyncThunk(
  "leave/community",
  async (communityId: PartialCommunity["_id"]) => {
    return leaveCommunityUtils(communityId).then((res) => res);
  }
);

export const updateCommunityDetails = createAsyncThunk(
  "/update/community/details",
  async (data: {
    community: PartialCommunity;
    communityId: PartialCommunity["_id"];
  }) => {
    return updateCommunityDetailsUtils(data.community, data.communityId).then(
      (res) => res
    );
  }
);

const communityInfo = createSlice({
  name: "home",
  initialState,
  reducers: {
    updateDisplayName: (
      state: CommunityHome,
      action: PayloadAction<PartialCommunity>
    ) => {
      state.displayName = action.payload.displayName;
    },
    updateDescription: (
      state: CommunityHome,
      action: PayloadAction<PartialCommunity>
    ) => {
      state.description = action.payload.description;
    },
    updateType: (
      state: CommunityHome,
      action: PayloadAction<PartialCommunity>
    ) => {
      state.community_type = action.payload.community_type;
    },
    changeCommunityIcon: (
      state: CommunityHome,
      action: PayloadAction<PartialCommunity["icon_image"]>
    ) => {
      state.icon_image = action.payload;
    },
  },
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
        // Alert: Dummy data for isAdmin
        state.isAdmin = true;
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
    builder.addCase(joinCommunity.fulfilled, (state: CommunityHome) => {
      if (state.community_type === "public") {
        state.isMember = true;
      } else if (state.community_type === "private") {
        state.isMember = false;
      }
    });
  },
});

export default communityInfo.reducer;

export const {
  updateDisplayName,
  updateDescription,
  updateType,
  changeCommunityIcon,
} = communityInfo.actions;
