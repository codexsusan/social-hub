import { CommunityJoinStatus, PartialCommunity } from "@/types/communityTypes";
import { queryParamsType } from "@/types/generalTypes";
import { getAllCommunityUtils } from "@/utils/communityUtils";
import { ResponseData } from "@/utils/httpUtils";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface ExplorePageState {
  loading: boolean;
  error: string | null;
  communities: PartialCommunity[];
  totalPages?: number;
}

const initialState: ExplorePageState = {
  loading: false,
  error: null,
  communities: [],
  totalPages: 0,
};

export const fetchExploreCommunities = createAsyncThunk(
  "explore/fetch/communities",
  async (data: queryParamsType) => {
    return getAllCommunityUtils(data).then((res) => {
      const communityData = res.data.data;
      communityData.forEach((community: PartialCommunity) => {
        if (community.isMember) {
          community.joinStatus = CommunityJoinStatus.JOINED;
        } else {
          community.joinStatus = CommunityJoinStatus.NOTJOINED;
        }
      });
      return {
        ...res,
        data: {
          ...res.data,
          data: communityData,
        },
      };
    });
  }
);

export const fetchUpdatedExploreCommunities = createAsyncThunk(
  "updated/fetch/communities",
  async (data: queryParamsType) => {
    return getAllCommunityUtils(data).then((res) => {
      const communityData = res.data.data;
      communityData.forEach((community: PartialCommunity) => {
        if (community.isMember) {
          community.joinStatus = CommunityJoinStatus.JOINED;
        } else {
          community.joinStatus = CommunityJoinStatus.NOTJOINED;
        }
      });
      return {
        ...res,
        data: {
          ...res.data,
          data: communityData,
        },
      };
    });
  }
);

const exploreSlice = createSlice({
  name: "explore",
  initialState,
  reducers: {
    joinCommunitySuccess(
      state: ExplorePageState,
      action: PayloadAction<PartialCommunity["_id"]>
    ) {
      state.communities = state.communities.map((community) => {
        if (
          community._id === action.payload &&
          community.community_type === "public"
        ) {
          community.isMember = true;
          community.joinStatus = CommunityJoinStatus.JOINED;
        } else if (
          community._id === action.payload &&
          community.community_type === "private"
        ) {
          community.isMember = false;
          community.joinStatus = CommunityJoinStatus.REQUESTED;
        }
        return community;
      });
    },
    leaveCommunitySuccess(
      state: ExplorePageState,
      action: PayloadAction<PartialCommunity["_id"]>
    ) {
      state.communities = state.communities.map((community) => {
        if (community._id === action.payload) {
          community.isMember = false;
          community.joinStatus = CommunityJoinStatus.NOTJOINED;
        }
        return community;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchExploreCommunities.pending,
      (state: ExplorePageState) => {
        state.loading = true;
      }
    );
    builder.addCase(
      fetchExploreCommunities.fulfilled,
      (state: ExplorePageState, action: PayloadAction<ResponseData>) => {
        state.loading = false;
        state.communities = action.payload.data.data;
        state.totalPages = action.payload.data.totalPages;
      }
    );
    builder.addCase(
      fetchExploreCommunities.rejected,
      (state: ExplorePageState, action) => {
        state.loading = false;
        state.error = action.error.message! || "Failed to load data";
      }
    );
    builder.addCase(
      fetchUpdatedExploreCommunities.fulfilled,
      (state: ExplorePageState, action: PayloadAction<ResponseData>) => {
        state.communities = state.communities.concat(action.payload.data.data);
        state.totalPages = action.payload.data.totalPages;
      }
    );
  },
});

export default exploreSlice.reducer;

export const { joinCommunitySuccess, leaveCommunitySuccess } =
  exploreSlice.actions;
