import { PostandUserId } from "@/types/commentTypes";
import { PostPartial, SinglePostInitialState } from "@/types/postTypes";
import { addBookmarkUtils, removeBookmarkUtils } from "@/utils/bookmarkUtils";
import { ResponseData } from "@/utils/httpUtils";
import {
  deletePostByIdUtils,
  downvotePostUtils,
  getAllPostsByUserUtils,
  getPostUtils,
  reportPostByIdUtils,
  upvotePostUtils,
} from "@/utils/postUtils";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: SinglePostInitialState = {
  error: "",
  loading: false,
  post: {} as PostPartial,
};

/* This function is an async thunk that upvotes a post 
   with the given ID using the upvotePostUtils function.
*/
export const upvotePost = createAsyncThunk(
  "post/upvote",
  async (id: PostPartial["_id"]) => {
    return upvotePostUtils(id).then((res) => res);
  }
);

/* This function is an async thunk that downvotes a post 
   with the given ID using the downvotePostUtils function.
 */
export const downvotePost = createAsyncThunk(
  "post/upvote",
  async (id: PostPartial["_id"]) => {
    return downvotePostUtils(id).then((res) => res);
  }
);

/*
  This function is an async thunk that deletes a post with the given ID using the deletePostByIdUtils function.
*/
export const deletePost = createAsyncThunk(
  "post/delete",
  async (id: PostPartial["_id"]) => {
    return deletePostByIdUtils(id).then((res) => res);
  }
);

/*
  This function is an async thunk that reports a post with the given ID using the reportPostByIdUtils function.
*/
export const reportPost = createAsyncThunk(
  "post/report",
  async (id: PostPartial["_id"]) => {
    return reportPostByIdUtils(id).then((res) => res);
  }
);

/*
  This function is an async thunk that adds a bookmark to a post with the given ID using the addBookmarkUtils function.
*/
export const addBookmarkPost = createAsyncThunk(
  "post/add/bookmark",
  async (id: PostPartial["_id"]) => {
    return addBookmarkUtils(id).then((res) => res);
  }
);

/*
  This function is an async thunk that removes a bookmark from a post with the given ID using the removeBookmarkUtils function.
*/
export const removeBookmarkPost = createAsyncThunk(
  "post/remove/bookmark",
  async (id: PostPartial["_id"]) => {
    return removeBookmarkUtils(id).then((res) => res);
  }
);

export const getUserPosts = createAsyncThunk("post/get/user", async () => {
  return getAllPostsByUserUtils({}).then((res) => res);
});

/*
  This function is an async thunk that gets a post with the given ID using the getPostUtils function.
*/
export const getPost = createAsyncThunk(
  "post/get",
  async (data: PostandUserId) => {
    const postData = await getPostUtils(data.postId);
    const upVoteStatus = postData.data.data.upvotes.includes(data.userId);
    const downVoteStatus = postData.data.data.downvotes.includes(data.userId);
    return {
      ...postData,
      data: {
        ...postData.data,
        data: {
          ...postData.data.data,
          upVoteStatus,
          downVoteStatus,
          comment_status: true,
        },
      },
    };
  }
);

/*
  This code defines a Redux slice for handling post-related actions, including upvoting, downvoting, bookmarking, enabling/disabling comments, and reporting a post. It also includes extra reducers for getting a post and reporting a post
*/

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    upvotesuccess: (state: SinglePostInitialState) => {
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
    downvotesuccess: (state: SinglePostInitialState) => {
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
    addbookmarksuccess: (state: SinglePostInitialState) => {
      state.post.isBookmarked = true;
    },
    removebookmarksuccess: (state: SinglePostInitialState) => {
      state.post.isBookmarked = false;
    },
    switchbookmarksuccess: (state: SinglePostInitialState) => {
      state.post.isBookmarked = !state.post.isBookmarked;
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

export const {
  upvotesuccess,
  downvotesuccess,
  togglecomment,
  addbookmarksuccess,
  removebookmarksuccess,
  switchbookmarksuccess,
} = postSlice.actions;
