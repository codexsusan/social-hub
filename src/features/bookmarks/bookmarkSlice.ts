import { BookmarkInitialState, BookmarkPartial } from "@/types/bookmarkTypes";
import { PostPartial } from "@/types/postTypes";
import { addBookmarkUtils, getBookmarksUtils } from "@/utils/bookmarkUtils";
import { ResponseData } from "@/utils/httpUtils";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: BookmarkInitialState = {
  error: "",
  loading: false,
  bookmarks: [] as BookmarkPartial[],
};

export const switchBookmark = createAsyncThunk(
  "bookmark/switch",
  async (postId: PostPartial["_id"]) => {
    return addBookmarkUtils(postId).then((res) => res);
  }
);

export const fetchBookmarks = createAsyncThunk("bookmark/fetch", async () => {
  return getBookmarksUtils({}).then((res) => res);
});

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch User Bookmarks
    builder.addCase(fetchBookmarks.pending, (state: BookmarkInitialState) => {
      state.loading = true;
    });
    builder.addCase(
      fetchBookmarks.fulfilled,
      (state: BookmarkInitialState, action: PayloadAction<ResponseData>) => {
        state.loading = false;
        state.bookmarks = action.payload.data;
      }
    );
    builder.addCase(
      fetchBookmarks.rejected,
      (state: BookmarkInitialState, action) => {
        state.loading = false;
        state.error = action.error.message!;
      }
    );
    // Switch Bookmarks
    builder.addCase(switchBookmark.pending, (state: BookmarkInitialState) => {
      state.loading = true;
    });
    builder.addCase(
      switchBookmark.fulfilled,
      (state: BookmarkInitialState, action: PayloadAction<ResponseData>) => {
        state.loading = false;
        state.bookmarks = state.bookmarks.filter(
          (bookmark) => bookmark._id !== action.payload.data._id
        );
      }
    );
    builder.addCase(
      switchBookmark.rejected,
      (state: BookmarkInitialState, action) => {
        state.loading = false;
        state.error = action.error.message!;
      }
    );
  },
});

export default bookmarkSlice.reducer;
