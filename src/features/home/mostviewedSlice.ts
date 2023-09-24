import { MostViewedInitialState, PostPartial } from "@/types/postTypes";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMostViewedPostsUtils } from "@/utils/postUtils";
import { ResponseData } from "@/utils/httpUtils";
import {
  downvoteSuccessUtils,
  switchbookmarkSuccessUtils,
  upvoteSuccessUtils,
} from "../utils";

const initialState: MostViewedInitialState = {
  error: "",
  loading: false,
  posts: [] as PostPartial[],
};

export const fetchMostViewedPosts = createAsyncThunk(
  "home/fetch/most-viewed",
  async () => {
    return getMostViewedPostsUtils({});
  }
);

const mostviewedSlice = createSlice({
  name: "mostviewed",
  initialState,
  reducers: {
    upvotemostviewedsuccess: (
      state: MostViewedInitialState,
      action: PayloadAction<PostPartial["_id"]>
    ) => {
      upvoteSuccessUtils(state, action);
    },
    downvotemostviewedsuccess: (
      state: MostViewedInitialState,
      action: PayloadAction<PostPartial["_id"]>
    ) => {
      downvoteSuccessUtils(state, action);
    },
    switchbookmarkmostviewedsuccess: (
      state: MostViewedInitialState,
      action: PayloadAction<PostPartial["_id"]>
    ) => {
      switchbookmarkSuccessUtils(state, action);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchMostViewedPosts.pending,
      (state: MostViewedInitialState) => {
        state.loading = true;
      }
    );
    builder.addCase(
      fetchMostViewedPosts.fulfilled,
      (state: MostViewedInitialState, action: PayloadAction<ResponseData>) => {
        state.loading = false;
        state.posts = [...action.payload.data.data];
      }
    );
    builder.addCase(
      fetchMostViewedPosts.rejected,
      (state: MostViewedInitialState, action) => {
        state.loading = false;
        state.error = action.error.message || "";
      }
    );
  },
});
export default mostviewedSlice.reducer;

export const {
  upvotemostviewedsuccess,
  downvotemostviewedsuccess,
  switchbookmarkmostviewedsuccess,
} = mostviewedSlice.actions;
