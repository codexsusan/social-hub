import { CommunityLists } from "@/types/communityTypes";
import { getJoinedCommunitiesByUser } from "@/utils/communityUtils";
import { ResponseData } from "@/utils/httpUtils";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { leaveCommunity } from "./communityGeneral";
import { queryParamsType } from "@/types/generalTypes";

export const fetchAllCommunityByUser = createAsyncThunk(
  "fetch/all-community/user",
  async (data: queryParamsType) => {
    return getJoinedCommunitiesByUser(data).then((res) => res);
  }
);

export const fetchUpdatedAllCommunityByUser = createAsyncThunk(
  "fetch/updated-all-community/user",
  async (data: queryParamsType) => {
    return getJoinedCommunitiesByUser(data).then((res) => res);
  }
);

const initialState: CommunityLists = {
  loading: false,
  error: "",
  communities: [],
  totalPages: 0,
};

const communityLists = createSlice({
  name: "lists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllCommunityByUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchAllCommunityByUser.fulfilled,
      (state, action: PayloadAction<ResponseData>) => {
        state.loading = false;
        state.communities = [...action.payload.data.data];
        state.totalPages = action.payload.data.totalPages;
      }
    );
    builder.addCase(fetchAllCommunityByUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message!;
    });
    builder.addCase(
      leaveCommunity.fulfilled,
      (state: CommunityLists, action: PayloadAction<ResponseData>) => {
        state.communities = state.communities.filter((community) => {
          return community._id !== action.payload.data.data._id;
        });
      }
    );
    builder.addCase(
      fetchUpdatedAllCommunityByUser.fulfilled,
      (state: CommunityLists, action: PayloadAction<ResponseData>) => {
        state.communities = state.communities.concat(action.payload.data.data);
        state.totalPages = action.payload.data.totalPages;
      }
    );
  },
});

export default communityLists.reducer;
