import {
  CommentInitialState,
  NestedComment,
  PostandUserId,
} from "@/types/commentTypes";
import { PostPartial } from "@/types/postTypes";
import { UserPartial } from "@/types/userTypes";
import {
  createCommentOnPostUtils,
  createReplyOnCommentUtils,
  downvoteCommentByIdUtils,
  getCommentRepliesUtils,
  getCommentsOnPostUtils,
  upvoteCommentByIdUtils,
} from "@/utils/commentUtils";
import { ResponseData } from "@/utils/httpUtils";
import { getUserByIdUtils } from "@/utils/userUtils";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: CommentInitialState = {
  error: "",
  loading: false,
  current_comment: "",
  current_comment_loading: false,
  comments: [] as NestedComment[],
};

type ReplyData = {
  content: NestedComment["content"];
  postId: PostPartial["_id"];
  parentId: NestedComment["_id"];
};

type CommentandUserId = {
  commentId: NestedComment["_id"];
  userId: UserPartial["_id"];
};

type ReplyPayloadAction = PayloadAction<{
  parentId: NestedComment["_id"];
  replyId: NestedComment["_id"];
}>;

// Get Post Comment
export const getCommentsOnPost = createAsyncThunk(
  "comment/get",
  async (data: PostandUserId) => {
    const { postId, userId } = data;
    const commentData = await getCommentsOnPostUtils(postId);

    const commentLength = commentData.data.data.length;
    const updateCommentData = [];
    for (let i = 0; i < commentLength; i++) {
      const upvote_status = commentData.data.data[i].upvotes.includes(userId);
      const downvote_status =
        commentData.data.data[i].downvotes.includes(userId);
      const currentAuthorId = commentData.data.data[i].author_id;
      const authorData = await getUserByIdUtils(currentAuthorId);
      const currentAuthor = authorData.data.user;
      const updatedCurrentCommentData: NestedComment = {
        ...commentData.data.data[i],
        comment_reply_status: false,
        upvote_status,
        downvote_status,
        comment_count: commentData.data.data[i].replies_count,
        author: {
          _id: currentAuthor._id,
          userName: currentAuthor.userName,
          firstName: currentAuthor.firstName,
          lastName: currentAuthor.lastName,
          profilePic: currentAuthor.profilePic,
          bio: currentAuthor.bio,
        },
      };
      updateCommentData.push(updatedCurrentCommentData);
    }
    return {
      ...commentData,
      data: { ...commentData.data, data: updateCommentData },
    };
  }
);

// Create comment on Post
export const createCommentOnPost = createAsyncThunk(
  "comment/create",
  async (data: Partial<ReplyData>) => {
    return createCommentOnPostUtils(data.content || "", data.postId);
  }
);

// Upvote Comment
export const upvoteCommentById = createAsyncThunk(
  "comment/upvote",
  async (id: NestedComment["_id"]) => {
    return upvoteCommentByIdUtils(id);
  }
);

// Downvote Comment
export const downvoteCommentById = createAsyncThunk(
  "comment/downvote",
  async (id: NestedComment["_id"]) => {
    return downvoteCommentByIdUtils(id);
  }
);

// Create Reply on Comment
export const createReplyOnComment = createAsyncThunk(
  "comment/reply",
  async (data: ReplyData) => {
    return createReplyOnCommentUtils(data.content, data.postId, data.parentId);
  }
);

// Get replies of comment by Id
export const getCommentReplies = createAsyncThunk(
  "get/comment/replies",
  async (data: CommentandUserId) => {
    const { commentId, userId } = data;
    const repliesData = await getCommentRepliesUtils(commentId);
    const repliesLength = repliesData.data.data.length;
    const updatedRepliesData = [];
    for (let i = 0; i < repliesLength; i++) {
      const upvote_status = repliesData.data.data[i].upvotes.includes(userId);
      const downvote_status =
        repliesData.data.data[i].downvotes.includes(userId);
      const currentAuthorId = repliesData.data.data[i].author_id;
      const authorData = await getUserByIdUtils(currentAuthorId);
      const currentAuthor = authorData.data.user;
      const updatedCurrentReplyData: NestedComment = {
        ...repliesData.data.data[i],
        comment_reply_status: false,
        upvote_status,
        downvote_status,
        author: {
          _id: currentAuthor._id,
          userName: currentAuthor.userName,
          firstName: currentAuthor.firstName,
          lastName: currentAuthor.lastName,
          profilePic: currentAuthor.profilePic,
          bio: currentAuthor.bio,
        },
      };
      updatedRepliesData.push(updatedCurrentReplyData);
    }
    return {
      ...repliesData,
      data: { ...repliesData.data, data: updatedRepliesData },
    };
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    commentupvotesuccess: (
      state: CommentInitialState,
      action: PayloadAction<NestedComment["_id"]>
    ) => {
      const comment = state.comments.find(
        (comment) => comment._id === action.payload
      );
      if (comment) {
        if (!comment.upvote_status) {
          comment.upvotes_count = comment.upvotes_count! - 1 + 2;
          comment.upvote_status = true;
          if (comment.downvote_status) {
            comment.downvote_status = false;
            comment.downvotes_count = comment.downvotes_count! - 1;
          }
        } else {
          comment.upvote_status = false;
          comment.upvotes_count = comment.upvotes_count! - 1;
        }
      }
    },
    commentdownvotesuccess: (
      state: CommentInitialState,
      action: PayloadAction<NestedComment["_id"]>
    ) => {
      const comment = state.comments.find(
        (comment) => comment._id === action.payload
      );
      if (comment) {
        if (!comment.downvote_status) {
          comment.downvote_status = true;
          comment.downvotes_count = comment.downvotes_count! - 1 + 2;
          if (comment.upvote_status) {
            comment.upvotes_count = comment.upvotes_count! - 1;
            comment.upvote_status = false;
          }
        } else {
          comment.downvote_status = false;
          comment.downvotes_count = comment.downvotes_count! - 1;
        }
      }
    },
    switchcommentreplybox: (
      state: CommentInitialState,
      action: PayloadAction<NestedComment["_id"]>
    ) => {
      const comment = state.comments.find(
        (comment) => comment._id === action.payload
      );
      if (comment) {
        comment.comment_reply_status = !comment.comment_reply_status!;
      }
    },
    changepostcomment: (
      state: CommentInitialState,
      action: PayloadAction<string>
    ) => {
      state.current_comment = action.payload;
    },
    changecommentreply: (
      state: CommentInitialState,
      action: PayloadAction<{ commentId: NestedComment["_id"]; reply: string }>
    ) => {
      const comment = state.comments.find(
        (comment) => comment._id === action.payload.commentId
      );
      if (comment) {
        comment.comment_current_reply = action.payload.reply;
      }
    },
    initcommentreplies: (
      state: CommentInitialState,
      action: PayloadAction<{
        commentId: NestedComment["_id"];
        replies: NestedComment["comment_replies"];
      }>
    ) => {
      const comment = state.comments.find(
        (comm) => comm._id == action.payload.commentId
      );
      if (comment) {
        comment.comment_replies = [...action.payload.replies];
      }
    },
    replyupvotesuccess: (
      state: CommentInitialState,
      action: ReplyPayloadAction
    ) => {
      const comment = state.comments.find(
        (comment) => comment._id === action.payload.parentId
      );
      if (comment) {
        const reply = comment.comment_replies.find(
          (reply) => reply._id === action.payload.replyId
        );
        if (reply) {
          if (!reply.upvote_status) {
            reply.upvote_status = true;
            reply.upvotes_count = reply.upvotes_count! - 1 + 2;
            if (reply.downvote_status) {
              reply.downvote_status = false;
              reply.downvotes_count = reply.downvotes_count! - 1;
            }
          } else {
            reply.upvote_status = false;
            reply.upvotes_count = reply.upvotes_count! - 1;
          }
        }
      }
    },
    replydownvotesuccess: (
      state: CommentInitialState,
      action: ReplyPayloadAction
    ) => {
      const comment = state.comments.find(
        (comment) => comment._id === action.payload.parentId
      );
      if (comment) {
        const reply = comment.comment_replies.find(
          (reply) => reply._id === action.payload.replyId
        );
        if (reply) {
          if (!reply.downvote_status) {
            reply.downvote_status = true;
            reply.downvotes_count = reply.downvotes_count! - 1 + 2;
            if (reply.upvote_status) {
              reply.upvote_status = false;
              reply.upvotes_count = reply.upvotes_count! - 1;
            }
          } else {
            reply.downvote_status = false;
            reply.downvotes_count = reply.downvotes_count! - 1;
          }
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCommentsOnPost.pending, (state: CommentInitialState) => {
      state.loading = true;
    });
    builder.addCase(
      getCommentsOnPost.fulfilled,
      (state: CommentInitialState, action: PayloadAction<ResponseData>) => {
        state.loading = false;
        state.comments = action.payload.data.data;
      }
    );
    builder.addCase(
      getCommentsOnPost.rejected,
      (state: CommentInitialState, action) => {
        state.loading = false;
        state.error = action.error.message || "";
      }
    );
    builder.addCase(
      createCommentOnPost.pending,
      (state: CommentInitialState) => {
        state.current_comment_loading = true;
      }
    );
    builder.addCase(
      createCommentOnPost.fulfilled,
      (state: CommentInitialState, action) => {
        console.log(action.payload.data.data);
        state.current_comment_loading = false;
        state.current_comment = "";
      }
    );
    builder.addCase(
      createCommentOnPost.rejected,
      (state: CommentInitialState, action) => {
        state.current_comment_loading = false;
        state.error = action.error.message || "";
      }
    );
  },
});

export default commentSlice.reducer;

export const {
  commentupvotesuccess,
  commentdownvotesuccess,
  switchcommentreplybox,
  changepostcomment,
  changecommentreply,
  initcommentreplies,
  replyupvotesuccess,
  replydownvotesuccess,
} = commentSlice.actions;
