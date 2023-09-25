import { PostPartial, MultiplePostsInitialState } from "@/types/postTypes";
import { ResponseData } from "@/utils/httpUtils";
import { getAllPostsByUserUtils } from "@/utils/postUtils";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  downvoteSuccessUtils,
  switchbookmarkSuccessUtils,
  upvoteSuccessUtils,
} from "@/features/utils";

const initialState: MultiplePostsInitialState = {
  error: "",
  loading: false,
  posts: [] as PostPartial[],
};

export const getPostsByUser = createAsyncThunk("user/get/post", async () => {
  const userposts = await getAllPostsByUserUtils({}).then((res) => res);
  return userposts;
});

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
  },
});

export default postSlice.reducer;

export const {
  upvoteprofilepostsuccess,
  downvoteprofilepostsuccess,
  switchbookmarkprofilepostsuccess,
} = postSlice.actions;
