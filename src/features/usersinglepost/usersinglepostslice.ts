import { CommentPartial } from "@/types/commentTypes";
import { PostPartial } from "@/types/postTypes";
import { ResponseData } from "@/utils/httpUtils";
import { getPostUtils } from "@/utils/postUtils";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getCommentRepliesById,
  getCommentsOnPostById,
} from "../comment/commentSlice";

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
    upvoteSinglePostCommentSuccess: (
      state: UserSinglePostInitialState,
      action: PayloadAction<CommentPartial["_id"]>
    ) => {
      state.comment.comments = state.comment.comments.map((comment) => {
        if (comment._id === action.payload) {
          if (!comment.upVoteStatus) {
            comment.upvotes_count! = comment.upvotes_count! - 1 + 2;
            comment.upVoteStatus = true;
            if (comment.downVoteStatus) {
              comment.downVoteStatus = false;
              comment.downvotes_count! = comment.downvotes_count! - 1;
            }
          } else {
            comment.upVoteStatus = false;
            comment.upvotes_count! = comment.upvotes_count! - 1;
          }
        }
        return comment;
      });
    },
    switchReplies: (
      state: UserSinglePostInitialState,
      action: PayloadAction<CommentPartial["_id"]>
    ) => {
      state.comment.comments = state.comment.comments.map((comment) => {
        if (comment._id === action.payload) {
          comment.comment_reply_status = !comment.comment_reply_status;
        }
        return comment;
      });
    },
    downvoteSinglePostCommentSuccess: (
      state: UserSinglePostInitialState,
      action: PayloadAction<CommentPartial["_id"]>
    ) => {
      state.comment.comments = state.comment.comments.map((comment) => {
        if (comment._id === action.payload) {
          if (!comment.downVoteStatus) {
            comment.downvotes_count! = comment.downvotes_count! - 1 + 2;
            comment.downVoteStatus = true;
            if (comment.upVoteStatus) {
              comment.upVoteStatus = false;
              comment.upvotes_count = comment.upvotes_count! - 1;
            }
          } else {
            comment.downVoteStatus = false;
            comment.downvotes_count = comment.downvotes_count! - 1;
          }
        }
        return comment;
      });
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
    builder.addCase(
      getCommentRepliesById.fulfilled,
      (
        state: UserSinglePostInitialState,
        action: PayloadAction<ResponseData>
      ) => {
        console.log(action.payload);
        const parentId = action.payload.data.data[0].parent_id;
        state.comment.comments = state.comment.comments.map((comment) => {
          if (comment._id === parentId) {
            comment.comment_reply_status = true;
            comment.comment_reply = [...action.payload.data.data];
          }
          return comment;
        });
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
  upvoteSinglePostCommentSuccess,
  downvoteSinglePostCommentSuccess,
  switchReplies,
} = usersinglepost.actions;
