import { toast } from "@/components/ui/use-toast";
import {
  CommentInitialState,
  CommentPartial,
  PostandUserId,
} from "@/types/commentTypes";
import {
  downvoteCommentByIdUtils,
  getCommentsOnPostUtils,
  upvoteCommentByIdUtils,
} from "@/utils/commentUtils";
import { ResponseData } from "@/utils/httpUtils";
import { getUserByIdUtils } from "@/utils/userUtils";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: CommentInitialState = {
  error: "",
  loading: false,
  comments: [] as CommentPartial[],
};

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
      const updatedCurrentCommentData: CommentPartial = {
        ...commentData.data.data[i],
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
      updateCommentData.push(updatedCurrentCommentData);
    }
    return {
      ...commentData,
      data: { ...commentData.data, data: updateCommentData },
    };
  }
);

export const upvoteCommentById = createAsyncThunk(
  "comment/upvote",
  async (id: CommentPartial["_id"]) => {
    return upvoteCommentByIdUtils(id);
  }
);

export const downvoteCommentById = createAsyncThunk(
  "comment/downvote",
  async (id: CommentPartial["_id"]) => {
    return downvoteCommentByIdUtils(id);
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    upvotesuccess: (
      state: CommentInitialState,
      action: PayloadAction<CommentPartial["_id"]>
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
    downvotesuccess: (
      state: CommentInitialState,
      action: PayloadAction<CommentPartial["_id"]>
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
      action: PayloadAction<CommentPartial["_id"]>
    ) => {
      const comment = state.comments.find(
        (comment) => comment._id === action.payload
      );
      if (comment) {
        comment.comment_reply_status = !comment.comment_reply_status!;
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
        toast({
          description: state.error || "Something went wrong",
          className: "bg-[#09090B] text-[#e2e2e2] border-none ",
        });
      }
    );
  },
});

export default commentSlice.reducer;

export const { upvotesuccess, downvotesuccess, switchcommentreplybox } =
  commentSlice.actions;
