import { PostPartial, MultiplePostsInitialState } from "@/types/postTypes";
import { ResponseData } from "@/utils/httpUtils";
import { getAllPostsByUserUtils } from "@/utils/postUtils";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  downvoteSuccessUtils,
  switchbookmarkSuccessUtils,
  upvoteSuccessUtils,
} from "@/features/utils";
import { queryParamsType } from "@/types/generalTypes";

const initialState: MultiplePostsInitialState = {
  error: "",
  loading: false,
  posts: [] as PostPartial[],
};

export const getPostsByUser = createAsyncThunk(
  "user/get/post",
  async (data: queryParamsType) => {
    return getAllPostsByUserUtils(data).then((res) => res);
  }
);

export const getUpdatedPostsByUser = createAsyncThunk(
  "user/get/updated/post",
  async (data: queryParamsType) => {
    return getAllPostsByUserUtils(data).then((res) => res);
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    upvoteprofilepostsuccess: (
      state: MultiplePostsInitialState,
      action: PayloadAction<PostPartial["_id"]>
    ) => {
      upvoteSuccessUtils(state, action);
    },
    downvoteprofilepostsuccess: (
      state: MultiplePostsInitialState,
      action: PayloadAction<PostPartial["_id"]>
    ) => {
      downvoteSuccessUtils(state, action);
    },
    switchbookmarkprofilepostsuccess: (
      state: MultiplePostsInitialState,
      action: PayloadAction<PostPartial["_id"]>
    ) => {
      switchbookmarkSuccessUtils(state, action);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getPostsByUser.pending,
      (state: MultiplePostsInitialState) => {
        state.loading = true;
      }
    );
    builder.addCase(
      getPostsByUser.fulfilled,
      (
        state: MultiplePostsInitialState,
        action: PayloadAction<ResponseData>
      ) => {
        state.loading = false;
        state.posts = [...action.payload.data.data];
      }
    );
    builder.addCase(
      getPostsByUser.rejected,
      (state: MultiplePostsInitialState, action) => {
        state.loading = false;
        state.error = action.error.message!;
      }
    );
    builder.addCase(
      getUpdatedPostsByUser.fulfilled,
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

export default postSlice.reducer;

export const {
  upvoteprofilepostsuccess,
  downvoteprofilepostsuccess,
  switchbookmarkprofilepostsuccess,
} = postSlice.actions;
