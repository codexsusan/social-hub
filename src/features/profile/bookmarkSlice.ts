import { PostPartial, MultiplePostsInitialState } from "@/types/postTypes";
import { getBookmarksUtils } from "@/utils/bookmarkUtils";
import { hasProperty } from "@/utils/generalUtils";
import { ResponseData } from "@/utils/httpUtils";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  downvoteSuccessUtils,
  switchbookmarkSuccessUtils,
  upvoteSuccessUtils,
} from "../utils";
import { queryParamsType } from "@/types/generalTypes";

const initialState: MultiplePostsInitialState = {
  error: "",
  loading: false,
  posts: [] as PostPartial[],
};

export const getBookmarks = createAsyncThunk(
  "user/get/bookmarked/post",
  async (data: queryParamsType) => {
    return await getBookmarksUtils(data).then((res) => res);
  }
);

export const getUpdatedBookmarks = createAsyncThunk(
  "user/get/updated/bookmarked/post",
  async (data: queryParamsType) => {
    return await getBookmarksUtils(data).then((res) => res);
  }
);

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    upvoteprofilebookmarkpostsuccess: (
      state: MultiplePostsInitialState,
      action: PayloadAction<PostPartial["_id"]>
    ) => {
      upvoteSuccessUtils(state, action);
    },
    downvoteprofilebookmarkpostsuccess: (
      state: MultiplePostsInitialState,
      action: PayloadAction<PostPartial["_id"]>
    ) => {
      downvoteSuccessUtils(state, action);
    },
    switchbookmarkprofilebookmarkpostsuccess: (
      state: MultiplePostsInitialState,
      action: PayloadAction<PostPartial["_id"]>
    ) => {
      switchbookmarkSuccessUtils(state, action);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getBookmarks.pending,
      (state: MultiplePostsInitialState) => {
        state.loading = true;
      }
    );
    builder.addCase(
      getBookmarks.fulfilled,
      (
        state: MultiplePostsInitialState,
        action: PayloadAction<ResponseData>
      ) => {
        state.loading = false;
        if (action.payload.status === 200) {
          state.posts = [...action.payload.data.data];
        } else {
          if (hasProperty(action.payload, "data")) {
            state.error = action.payload.data.message!;
          }
        }
      }
    );
    builder.addCase(
      getBookmarks.rejected,
      (state: MultiplePostsInitialState, action) => {
        state.loading = false;
        state.error = action.error.message!;
      }
    );
    builder.addCase(
      getUpdatedBookmarks.fulfilled,
      (
        state: MultiplePostsInitialState,
        action: PayloadAction<ResponseData>
      ) => {
        state.loading = false;
        if (state.posts.length > 0) {
          state.posts = state.posts.concat(action.payload.data.data);
          return;
        } else {
          state.posts = [...action.payload.data.data];
        }
      }
    );
  },
});

export default bookmarkSlice.reducer;
export const {
  upvoteprofilebookmarkpostsuccess,
  downvoteprofilebookmarkpostsuccess,
  switchbookmarkprofilebookmarkpostsuccess,
} = bookmarkSlice.actions;
