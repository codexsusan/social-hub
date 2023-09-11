import { PostandUserId } from "@/types/commentTypes";
import { PostPartial, SinglePostDetailType, SinglePostInitialState } from "@/types/postTypes";
import { ResponseData } from "@/utils/httpUtils";
import {
  deletePostByIdUtils,
  downvotePostUtils,
  getPostUtils,
  reportPostByIdUtils,
  upvotePostUtils,
} from "@/utils/postUtils";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: SinglePostInitialState = {
  error: "",
  loading: false,
  post: {} as SinglePostDetailType,
};

export const upvotePost = createAsyncThunk(
  "post/upvote",
  async (id: PostPartial["_id"]) => {
    return upvotePostUtils(id).then((res) => res);
  }
);

export const downvotePost = createAsyncThunk(
  "post/upvote",
  async (id: PostPartial["_id"]) => {
    return downvotePostUtils(id).then((res) => res);
  }
);

export const deletePost = createAsyncThunk(
  "post/delete",
  async (id: PostPartial["_id"]) => {
    return deletePostByIdUtils(id).then((res) => res);
  }
);

export const reportPost = createAsyncThunk(
  "post/report",
  async (id: PostPartial["_id"]) => {
    return reportPostByIdUtils(id).then((res) => res);
  }
);

export const getPost = createAsyncThunk(
  "post/get",
  async (data: PostandUserId) => {
    const postData = await getPostUtils(data.postId);
    const upvote_status = postData.data.data.upvotes.includes(data.userId);
    const downvote_status = postData.data.data.downvotes.includes(data.userId);
    return {
      ...postData,
      data: {
        ...postData.data,
        data: {
          ...postData.data.data,
          upvote_status,
          downvote_status,
          comment_status: true,
        },
      },
    };
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    upvotesuccess: (state: SinglePostInitialState) => {
      if (!state.post.upvote_status) {
        state.post.upvotes_count! = state.post.upvotes_count! - 1 + 2;
        state.post.upvote_status = true;
        if (state.post.downvote_status) {
          state.post.downvote_status = false;
          state.post.downvotes_count! = state.post.downvotes_count! - 1;
        }
      } else {
        state.post.upvote_status = false;
        state.post.upvotes_count! = state.post.upvotes_count! - 1;
      }
    },
    downvotesuccess: (state: SinglePostInitialState) => {
      if (!state.post.downvote_status) {
        state.post.downvotes_count! = state.post.downvotes_count! - 1 + 2;
        state.post.downvote_status = true;
        if (state.post.upvote_status) {
          state.post.upvote_status = false;
          state.post.upvotes_count = state.post.upvotes_count! - 1;
        }
      } else {
        state.post.downvote_status = false;
        state.post.downvotes_count = state.post.downvotes_count! - 1;
      }
    },
    enablecomment: (state: SinglePostInitialState) => {
      state.post.comment_status = true;
    },
    disablecomment: (state: SinglePostInitialState) => {
      state.post.comment_status = false;
    },
    togglecomment: (state: SinglePostInitialState) => {
      state.post.comment_status = !state.post.comment_status;
    },

  },
  extraReducers: (builder) => {
    // Get Post
    builder.addCase(getPost.pending, (state: SinglePostInitialState) => {
      state.loading = true;
    });
    builder.addCase(
      getPost.fulfilled,
      (state: SinglePostInitialState, action: PayloadAction<ResponseData>) => {
        state.loading = false;
        state.post = action.payload.data.data;
      }
    );
    builder.addCase(getPost.rejected, (state: SinglePostInitialState) => {
      state.loading = false;
    });
    // Report post
    builder.addCase(reportPost.fulfilled, (state: SinglePostInitialState) => {
      state.post.report_count! += 1;
    });
  },
});

export default postSlice.reducer;

export const { upvotesuccess, downvotesuccess, togglecomment } =
  postSlice.actions;
