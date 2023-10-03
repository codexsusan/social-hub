import { PartialCommunity } from "@/types/communityTypes";
import { getAllCommunityUtils } from "@/utils/communityUtils";
import { ResponseData } from "@/utils/httpUtils";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface ExploreState {
  loading: boolean;
  error: string | null;
  communities: PartialCommunity[];
}

const initialState: ExploreState = {
  loading: false,
  error: null,
  communities: [],
};

export const fetchExploreCommunities = createAsyncThunk(
  "explore/fetch/communities",
  async () => {
    return getAllCommunityUtils().then((res) => res);
  }
);

const exploreSlice = createSlice({
  name: "explore",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchExploreCommunities.pending, (state: ExploreState) => {
      state.loading = true;
    });
    builder.addCase(
      fetchExploreCommunities.fulfilled,
      (state: ExploreState, action: PayloadAction<ResponseData>) => {
        state.loading = false;
        state.communities = action.payload.data.data;
      }
    );
    builder.addCase(
      fetchExploreCommunities.rejected,
      (state: ExploreState, action) => {
        state.loading = false;
        state.error = action.error.message! || "Failed to load data";
      }
    );
  },
});

export default exploreSlice.reducer;
