import { PostPartial } from "@/types/postTypes";
import { UserPartial } from "@/types/userTypes";
import { ResponseData } from "@/utils/httpUtils";
import {
  downvotePostUtils,
  getPostUtils,
  upvotePostUtils,
} from "@/utils/postUtils";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type SinglePageState = {
  error: string;
  loading: boolean;
  post: PostPartial;
};

const initialState: SinglePageState = {
  error: "",
  loading: false,
  post: {} as PostPartial,
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
type Data = {
  postId: PostPartial["_id"];
  userId: UserPartial["_id"];
};

export const getPost = createAsyncThunk("post/get", async (data: Data) => {
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
});

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    upvotesuccess: (state: SinglePageState) => {
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
    downvotesuccess: (state: SinglePageState) => {
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
    enablecomment: (state: SinglePageState) => {
      state.post.comment_status = true;
    },
    disablecomment: (state: SinglePageState) => {
      state.post.comment_status = false;
    },
    togglecomment: (state: SinglePageState) => {
      state.post.comment_status = !state.post.comment_status;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPost.pending, (state: SinglePageState) => {
      state.loading = true;
    });
    builder.addCase(
      getPost.fulfilled,
      (state: SinglePageState, action: PayloadAction<ResponseData>) => {
        state.loading = false;
        state.post = action.payload.data.data;
      }
    );
    builder.addCase(getPost.rejected, (state: SinglePageState) => {
      state.loading = false;
    });
  },
});

export default postSlice.reducer;

export const { upvotesuccess, downvotesuccess, togglecomment } =
  postSlice.actions;
