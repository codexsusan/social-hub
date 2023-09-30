import { CommunityLists } from "@/types/communityTypes";
import { getJoinedCommunitiesByUser } from "@/utils/communityUtils";
import { ResponseData } from "@/utils/httpUtils";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { leaveCommunity } from "./communityGeneral";

export const fetchAllCommunityByUser = createAsyncThunk(
  "fetch/all-community/user",
  async () => {
    return getJoinedCommunitiesByUser({}).then((res) => res);
  }
);

const initialState: CommunityLists = {
  loading: false,
  error: "",
  communities: [],
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
      }
    );
    builder.addCase(fetchAllCommunityByUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message!;
    });
    builder.addCase(
      leaveCommunity.fulfilled,
      (state: CommunityLists, action) => {
        console.log(action.payload);
        state.communities = state.communities.filter((community) => {
          return community._id !== action.payload.data.data._id;
        });
      }
    );
  },
});

export default communityLists.reducer;
