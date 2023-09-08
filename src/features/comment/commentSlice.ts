import { CommentPartial } from "@/types/commentTypes";
import { PostPartial } from "@/types/postTypes";
import { getCommentsOnPostUtils } from "@/utils/commentUtils";
import { ResponseData } from "@/utils/httpUtils";
import { getUserByIdUtils } from "@/utils/userUtils";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  error: string;
  loading: boolean;
  comments: CommentPartial[];
};

const initialState: InitialState = {
  error: "",
  loading: false,
  comments: [] as CommentPartial[],
};

export const getCommentsOnPost = createAsyncThunk(
  "comment/get",
  async (id: PostPartial["_id"]) => {
    const commentData = await getCommentsOnPostUtils(id);
    const commentLength = commentData.data.data.length;
    const updateCommentData = [];
    for (let i = 0; i < commentLength; i++) {
      const currentAuthorId = commentData.data.data[i].author_id;
      const authorData = await getUserByIdUtils(currentAuthorId);
      const currentAuthor = authorData.data.user;
      const updatedCurrentCommentData: CommentPartial = {
        ...commentData.data.data[i],
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

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCommentsOnPost.pending, (state: InitialState) => {
      state.loading = true;
    });
    builder.addCase(
      getCommentsOnPost.fulfilled,
      (state: InitialState, action: PayloadAction<ResponseData>) => {
        state.loading = false;
        state.comments = action.payload.data.data;
      }
    );
    builder.addCase(
      getCommentsOnPost.rejected,
      (state: InitialState, action) => {
        state.loading = false;
        state.error = action.error.message || "";
      }
    );
  },
});

export default commentSlice.reducer;
