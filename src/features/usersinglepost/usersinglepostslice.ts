import { CommentPartial } from "@/types/commentTypes";
import { PostPartial } from "@/types/postTypes";
import { ResponseData } from "@/utils/httpUtils";
import { getPostUtils } from "@/utils/postUtils";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCommentsOnPostById } from "../comment/commentSlice";

export const fetchSinglePost = createAsyncThunk(
  "usersinglepost/fetch",
  async (postId: PostPartial["_id"]) => {
    return getPostUtils(postId).then((res) => res);
  }
);

interface SinglePostInitialState extends PostPartial {
  loading: boolean;
  error: string;
}

interface CommentSectionInitialState {
  loading: boolean;
  error: string;
  comments: CommentPartial[];
}

type UserSinglePostInitialState = {
  error: string;
  loading: boolean;
  post: SinglePostInitialState;
  comment: CommentSectionInitialState;
};

const initialState: UserSinglePostInitialState = {
  error: "",
  loading: true,
  post: {
    loading: false,
    content:
      '{"time":1697208637870,"blocks":[{"id":"FuZcoTwXqM","type":"paragraph","data":{"text":""}}],"version":"2.28.0"}',
  } as SinglePostInitialState,
  comment: {
    loading: false,
  } as CommentSectionInitialState,
};

const usersinglepost = createSlice({
  name: "usersinglepost",
  initialState,
  reducers: {
    upvoteSinglePostSuccess: (state: UserSinglePostInitialState) => {
      if (!state.post.upVoteStatus) {
        state.post.upvotes_count! = state.post.upvotes_count! - 1 + 2;
        state.post.upVoteStatus = true;
        if (state.post.downVoteStatus) {
          state.post.downVoteStatus = false;
          state.post.downvotes_count! = state.post.downvotes_count! - 1;
        }
      } else {
        state.post.upVoteStatus = false;
        state.post.upvotes_count! = state.post.upvotes_count! - 1;
      }
    },
    downvoteSinglePostSuccess: (state: UserSinglePostInitialState) => {
      if (!state.post.downVoteStatus) {
        state.post.downvotes_count! = state.post.downvotes_count! - 1 + 2;
        state.post.downVoteStatus = true;
        if (state.post.upVoteStatus) {
          state.post.upVoteStatus = false;
          state.post.upvotes_count = state.post.upvotes_count! - 1;
        }
      } else {
        state.post.downVoteStatus = false;
        state.post.downvotes_count = state.post.downvotes_count! - 1;
      }
    },
    switchSinglePostBookmarkSuccess: (state: UserSinglePostInitialState) => {
      state.post.isBookmarked = !state.post.isBookmarked;
    },
    addcommentSinglePostSuccess: (
      state: UserSinglePostInitialState,
      action: PayloadAction<CommentPartial>
    ) => {
      state.comment.comments.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchSinglePost.pending,
      (state: UserSinglePostInitialState) => {
        state.loading = true;
        state.post.loading = true;
        state.post.error = "";
      }
    );
    builder.addCase(
      fetchSinglePost.fulfilled,
      (
        state: UserSinglePostInitialState,
        action: PayloadAction<ResponseData>
      ) => {
        state.loading = false;
        state.post = { ...action.payload.data.data, loading: false, error: "" };
      }
    );
    builder.addCase(
      fetchSinglePost.rejected,
      (state: UserSinglePostInitialState, action) => {
        state.loading = false;
        state.post.loading = false;
        state.post.error = action.error.message!;
      }
    );
    builder.addCase(
      getCommentsOnPostById.pending,
      (state: UserSinglePostInitialState) => {
        state.comment.loading = true;
        state.comment.error = "";
      }
    );
    builder.addCase(
      getCommentsOnPostById.fulfilled,
      (
        state: UserSinglePostInitialState,
        action: PayloadAction<ResponseData>
      ) => {
        state.comment.loading = false;
        if (action.payload.data.data.length !== 0) {
          state.comment.comments = action.payload.data.data;
        } else {
          state.comment.comments = [];
        }
      }
    );
    builder.addCase(
      getCommentsOnPostById.rejected,
      (state: UserSinglePostInitialState) => {
        state.comment.loading = false;
        state.comment.error = "Something went wrong";
      }
    );
  },
});

export default usersinglepost.reducer;

export const {
  upvoteSinglePostSuccess,
  downvoteSinglePostSuccess,
  switchSinglePostBookmarkSuccess,
  addcommentSinglePostSuccess,
} = usersinglepost.actions;
