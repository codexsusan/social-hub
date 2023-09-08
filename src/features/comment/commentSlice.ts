import { CommentPartial } from "@/types/commentTypes";
import { PostPartial } from "@/types/postTypes";
import { getCommentsOnPostUtils } from "@/utils/commentUtils";
import { ResponseData } from "@/utils/httpUtils";
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
    return commentData;
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
