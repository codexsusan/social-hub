import { MultiplePostsInitialState } from "@/types/postTypes";
import { ResponseData } from "@/utils/httpUtils";
import { searchPostQueryUtils } from "@/utils/postUtils";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: MultiplePostsInitialState = {
  posts: [],
  loading: false,
  error: "",
  totalPages: 0,
};

export const fetchSearchPost = createAsyncThunk(
  "/fetch/search-post",
  async (data: { query: string }) => {
    return searchPostQueryUtils(data).then((res) => res);
  }
);

const searchPostSlice = createSlice({
  name: "searchPost",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchSearchPost.fulfilled,
      (
        state: MultiplePostsInitialState,
        action: PayloadAction<ResponseData>
      ) => {
        state.posts = [...action.payload.data.data];
      }
    );
  },
});

export default searchPostSlice.reducer;
