import { MultiplePostsInitialState, PostPartial } from "@/types/postTypes";
import { UserPartial } from "@/types/userTypes";
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
  async (id: UserPartial["_id"]) => {
    const latestPost = await getLatestPostsUtils({ page: 1, limit: 10 });
    const updatedData = latestPost.data!.data.map((post: PostPartial) => {
      const upvote_status = post.upvotes!.includes(id!);
      const downvote_status = post.downvotes!.includes(id!);
      return {
        ...post,
        upvote_status,
        downvote_status,
      };
    });
    return {
      ...latestPost,
      data: { ...latestPost.data, data: [...updatedData] },
    };
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
