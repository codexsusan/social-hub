import { BookmarkPartial } from "@/types/bookmarkTypes";
import { PostPartial } from "@/types/postTypes";
import {
  addBookmarkUtils,
  getBookmarksUtils,
  removeBookmarkUtils,
} from "@/utils/bookmarkUtils";
import { ResponseData } from "@/utils/httpUtils";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  error: string;
  loading: boolean;
  bookmarks: BookmarkPartial[];
};

const initialState: InitialState = {
  error: "",
  loading: false,
  bookmarks: [] as BookmarkPartial[],
};

export const addBookmark = createAsyncThunk(
  "bookmark/add",
  async (postId: PostPartial["_id"]) => {
    return addBookmarkUtils(postId).then((res) => res);
  }
);

export const fetchBookmarks = createAsyncThunk("bookmark/fetch", async () => {
  return getBookmarksUtils().then((res) => res);
});

export const removeBookmark = createAsyncThunk(
  "bookmark/remove",
  async (postId: PostPartial["_id"]) => {
    return removeBookmarkUtils(postId).then((res) => res);
  }
);

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add Bookmarks
    builder.addCase(addBookmark.pending, (state: InitialState) => {
      state.loading = true;
    });
    builder.addCase(
      addBookmark.fulfilled,
      (state: InitialState, action: PayloadAction<ResponseData>) => {
        state.loading = false;
        state.bookmarks = [...state.bookmarks, action.payload.data];
      }
    );
    builder.addCase(addBookmark.rejected, (state: InitialState, action) => {
      state.loading = false;
      state.error = action.error.message!;
    });
    // Fetch User Bookmarks
    builder.addCase(fetchBookmarks.pending, (state: InitialState) => {
      state.loading = true;
    });
    builder.addCase(
      fetchBookmarks.fulfilled,
      (state: InitialState, action: PayloadAction<ResponseData>) => {
        state.loading = false;
        state.bookmarks = action.payload.data;
      }
    );
    builder.addCase(fetchBookmarks.rejected, (state: InitialState, action) => {
      state.loading = false;
      state.error = action.error.message!;
    });
    // Remove Bookmarks
    builder.addCase(removeBookmark.pending, (state: InitialState) => {
      state.loading = true;
    });
    builder.addCase(
      removeBookmark.fulfilled,
      (state: InitialState, action: PayloadAction<ResponseData>) => {
        state.loading = false;
        state.bookmarks = state.bookmarks.filter(
          (bookmark) => bookmark._id !== action.payload.data._id
        );
      }
    );
    builder.addCase(removeBookmark.rejected, (state: InitialState, action) => {
      state.loading = false;
      state.error = action.error.message!;
    });
  },
});

export default bookmarkSlice.reducer;
