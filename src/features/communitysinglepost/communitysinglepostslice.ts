import { CommentPartial, NestedComment } from "@/types/commentTypes";
import { PostPartial } from "@/types/postTypes";
import { ResponseData } from "@/utils/httpUtils";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchSinglePost } from "../usersinglepost/usersinglepostslice";
import {
  getCommentRepliesById,
  getCommentsOnPostById,
} from "../comment/commentSlice";

interface SinglePostInitialState extends PostPartial {
  loading: boolean;
  error: string;
}

export interface CommentSectionInitialState {
  loading: boolean;
  error: string;
  comments: CommentPartial[];
}

type CommunitySinglePostInitialState = {
  error: string;
  loading: boolean;
  post: SinglePostInitialState;
  comment: CommentSectionInitialState;
};

const initialState: CommunitySinglePostInitialState = {
  error: "",
  loading: true,
  post: {
    loading: false,
    content: "",
  } as SinglePostInitialState,
  comment: {
    loading: false,
  } as CommentSectionInitialState,
};

const communitysinglepostslice = createSlice({
  name: "communitysinglepost",
  initialState,
  reducers: {
    upvoteCommunitySinglePostSuccess: (
      state: CommunitySinglePostInitialState
    ) => {
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
    downvoteCommunitySinglePostSuccess: (
      state: CommunitySinglePostInitialState
    ) => {
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
    switchCommunitySinglePostBookmarkSuccess: (
      state: CommunitySinglePostInitialState
    ) => {
      state.post.isBookmarked = !state.post.isBookmarked;
    },
    addcommentCommunitySinglePostSuccess: (
      state: CommunitySinglePostInitialState,
      action: PayloadAction<CommentPartial>
    ) => {
      state.comment.comments.unshift(action.payload);
    },
    upvoteCommunitySinglePostCommentSuccess: (
      state: CommunitySinglePostInitialState,
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
    switchRepliesCommunity: (
      state: CommunitySinglePostInitialState,
      action: PayloadAction<CommentPartial["_id"]>
    ) => {
      state.comment.comments = state.comment.comments.map((comment) => {
        if (comment._id === action.payload) {
          comment.comment_reply_status = !comment.comment_reply_status;
        }
        return comment;
      });
    },
    downvoteCommunitySinglePostCommentSuccess: (
      state: CommunitySinglePostInitialState,
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
    addRepliesCommunitySuccess: (
      state: CommunitySinglePostInitialState,
      action: PayloadAction<NestedComment>
    ) => {
      state.comment.comments = state.comment.comments.map((comment) => {
        if (comment._id === action.payload.parent_id) {
          comment.replies_count = comment.replies_count! - 1 + 2;
          comment.comment_reply?.unshift(action.payload);
        }
        return comment;
      });
    },
    upvoteRepliesCommunity: (
      state: CommunitySinglePostInitialState,
      action
    ) => {
      state.comment.comments = state.comment.comments.map((comment) => {
        if (comment._id === action.payload.parent_id) {
          comment.comment_reply = comment.comment_reply!.map((reply) => {
            if (reply._id === action.payload._id) {
              if (!reply.upVoteStatus) {
                reply.upvotes_count! = reply.upvotes_count! - 1 + 2;
                reply.upVoteStatus = true;
                if (reply.downVoteStatus) {
                  reply.downVoteStatus = false;
                  reply.downvotes_count! = reply.downvotes_count! - 1;
                }
              } else {
                reply.upVoteStatus = false;
                reply.upvotes_count! = reply.upvotes_count! - 1;
              }
            }
            return reply;
          });
        }
        return comment;
      });
    },
    downvoteRepliesCommunity: (
      state: CommunitySinglePostInitialState,
      action
    ) => {
      state.comment.comments = state.comment.comments.map((comment) => {
        if (comment._id === action.payload.parent_id) {
          comment.comment_reply = comment.comment_reply!.map((reply) => {
            if (reply._id === action.payload._id) {
              if (!reply.downVoteStatus) {
                reply.downvotes_count! = reply.downvotes_count! - 1 + 2;
                reply.downVoteStatus = true;
                if (reply.upVoteStatus) {
                  reply.upVoteStatus = false;
                  reply.upvotes_count = reply.upvotes_count! - 1;
                }
              } else {
                reply.downVoteStatus = false;
                reply.downvotes_count = reply.downvotes_count! - 1;
              }
            }
            return reply;
          });
        }
        return comment;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchSinglePost.pending,
      (state: CommunitySinglePostInitialState) => {
        state.loading = true;
        state.post.loading = true;
        state.post.error = "";
      }
    );
    builder.addCase(
      fetchSinglePost.fulfilled,
      (
        state: CommunitySinglePostInitialState,
        action: PayloadAction<ResponseData>
      ) => {
        state.loading = false;
        state.post = { ...action.payload.data.data, loading: false, error: "" };
      }
    );
    builder.addCase(
      fetchSinglePost.rejected,
      (state: CommunitySinglePostInitialState, action) => {
        state.loading = false;
        state.post.loading = false;
        state.post.error = action.error.message!;
      }
    );
    builder.addCase(
      getCommentsOnPostById.pending,
      (state: CommunitySinglePostInitialState) => {
        state.comment.loading = true;
        state.comment.error = "";
      }
    );
    builder.addCase(
      getCommentsOnPostById.fulfilled,
      (
        state: CommunitySinglePostInitialState,
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
      (state: CommunitySinglePostInitialState) => {
        state.comment.loading = false;
        state.comment.error = "Something went wrong";
      }
    );
    builder.addCase(
      getCommentRepliesById.fulfilled,
      (
        state: CommunitySinglePostInitialState,
        action: PayloadAction<ResponseData>
      ) => {
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

export default communitysinglepostslice.reducer;

export const {
  upvoteCommunitySinglePostSuccess,
  downvoteCommunitySinglePostSuccess,
  switchCommunitySinglePostBookmarkSuccess,
  addcommentCommunitySinglePostSuccess,
  upvoteCommunitySinglePostCommentSuccess,
  downvoteCommunitySinglePostCommentSuccess,
  switchRepliesCommunity,
  addRepliesCommunitySuccess,
  upvoteRepliesCommunity,
  downvoteRepliesCommunity,
} = communitysinglepostslice.actions;
