import { MultiplePostsInitialState, PostPartial } from "@/types/postTypes";
import { ResponseData } from "@/utils/httpUtils";
import { getLatestPostsUtils } from "@/utils/postUtils";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  downvoteSuccessUtils,
  switchbookmarkSuccessUtils,
  upvoteSuccessUtils,
} from "../utils";

const initialState: MultiplePostsInitialState = {
  error: "",
  loading: false,
  posts: [] as PostPartial[],
};

export const fetchLatestPosts = createAsyncThunk(
  "home/fetch/latest",
  async () => {
    return getLatestPostsUtils({});
  }
);

const latestSlice = createSlice({
  name: "latestpost",
  initialState,
  reducers: {
    upvotelatestsuccess: (
      state: MultiplePostsInitialState,
      action: PayloadAction<PostPartial["_id"]>
    ) => {
      upvoteSuccessUtils(state, action);
    },
    downvotelatestsuccess: (
      state: MultiplePostsInitialState,
      action: PayloadAction<PostPartial["_id"]>
    ) => {
      downvoteSuccessUtils(state, action);
    },
    switchbookmarklatestsuccess: (
      state: MultiplePostsInitialState,
      action: PayloadAction<PostPartial["_id"]>
    ) => {
      switchbookmarkSuccessUtils(state, action);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchLatestPosts.pending,
      (state: MultiplePostsInitialState) => {
        state.loading = true;
      }
    );
    builder.addCase(
      fetchLatestPosts.fulfilled,
      (
        state: MultiplePostsInitialState,
        action: PayloadAction<ResponseData>
      ) => {
        state.loading = false;
        state.posts = [...action.payload.data.data];
      }
    );
    builder.addCase(
      fetchLatestPosts.rejected,
      (state: MultiplePostsInitialState, action) => {
        state.loading = false;
        state.error = action.error.message || "";
      }
    );
  },
});

export default latestSlice.reducer;

export const {
  upvotelatestsuccess,
  downvotelatestsuccess,
  switchbookmarklatestsuccess,
} = latestSlice.actions;
