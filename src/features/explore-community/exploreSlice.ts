import { PartialCommunity } from "@/types/communityTypes";
import { queryParamsType } from "@/types/generalTypes";
import { getAllCommunityUtils } from "@/utils/communityUtils";
import { ResponseData } from "@/utils/httpUtils";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface ExplorePageState {
  loading: boolean;
  error: string | null;
  communities: PartialCommunity[];
}

const initialState: ExplorePageState = {
  loading: false,
  error: null,
  communities: [],
};

export const fetchExploreCommunities = createAsyncThunk(
  "explore/fetch/communities",
  async (data: queryParamsType) => {
    return getAllCommunityUtils(data).then((res) => res);
  }
);

export const fetchUpdatedExploreCommunities = createAsyncThunk(
  "updated/fetch/communities",
  async (data: queryParamsType) => {
    return getAllCommunityUtils(data).then((res) => res);
  }
);

const exploreSlice = createSlice({
  name: "explore",
  initialState,
  reducers: {},
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
      }
    );
  },
});

export default exploreSlice.reducer;
