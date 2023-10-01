import { MultiplePostsInitialState, PostPartial } from "@/types/postTypes";
import { AuthorPartial } from "@/types/userTypes";
import { ResponseData } from "@/utils/httpUtils";
import { getAllPostsByUserIdUtils } from "@/utils/postUtils";
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

export const fetchPostsByUserId = createAsyncThunk(
  "user/get/post/by/id",
  async (id: AuthorPartial["_id"]) => {
    const response = await getAllPostsByUserIdUtils(id, {}).then((res) => res);
    return response;
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    upvoteauthorprofilepostsuccess: (
      state: MultiplePostsInitialState,
      action: PayloadAction<PostPartial["_id"]>
    ) => {
      upvoteSuccessUtils(state, action);
    },
    downvoteauthorprofilepostsuccess: (
      state: MultiplePostsInitialState,
      action: PayloadAction<PostPartial["_id"]>
    ) => {
      downvoteSuccessUtils(state, action);
    },
    switchbookmarkauthorprofilepostsuccess: (
      state: MultiplePostsInitialState,
      action: PayloadAction<PostPartial["_id"]>
    ) => {
      switchbookmarkSuccessUtils(state, action);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchPostsByUserId.pending,
      (state: MultiplePostsInitialState) => {
        state.loading = true;
      }
    );
    builder.addCase(
      fetchPostsByUserId.fulfilled,
      (
        state: MultiplePostsInitialState,
        action: PayloadAction<ResponseData>
      ) => {
        state.loading = false;
        state.posts = [...action.payload.data.data];
      }
    );
    builder.addCase(
      fetchPostsByUserId.rejected,
      (state: MultiplePostsInitialState, action) => {
        state.loading = false;
        state.error = action.error.message! || "Error fetching posts";
      }
    );
  },
});

export default postSlice.reducer;
export const {
  upvoteauthorprofilepostsuccess,
  downvoteauthorprofilepostsuccess,
  switchbookmarkauthorprofilepostsuccess,
} = postSlice.actions;
