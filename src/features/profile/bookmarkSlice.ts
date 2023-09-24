import { PostPartial, MultiplePostsInitialState } from "@/types/postTypes";
import { UserPartial } from "@/types/userTypes";
import { getBookmarksUtils } from "@/utils/bookmarkUtils";
import { ResponseData } from "@/utils/httpUtils";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: MultiplePostsInitialState = {
  error: "",
  loading: false,
  posts: [] as PostPartial[],
};

export const getBookmarks = createAsyncThunk(
  "user/get/bookmarked/post",
  async (id: UserPartial["_id"]) => {
    const bookmarkedPosts = await getBookmarksUtils().then((res) => res);
    // console.log(bookmarkedPosts);
    const updatedPosts = bookmarkedPosts.data!.data.map((post: PostPartial) => {
      console.log(post);
      const upVoteStatus = post.upvotes!.includes(id!);
      const downVoteStatus = post.downvotes!.includes(id!);
      return {
        ...post,
        upVoteStatus,
        downVoteStatus,
      };
    });
    return {
      ...bookmarkedPosts,
      data: {
        ...bookmarkedPosts.data,
        data: [...updatedPosts],
      },
    };
    // return getBookmarksUtils().then((res) => res);
  }
);

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getBookmarks.pending,
      (state: MultiplePostsInitialState) => {
        state.loading = true;
      }
    );
    builder.addCase(
      getBookmarks.fulfilled,
      (
        state: MultiplePostsInitialState,
        action: PayloadAction<ResponseData>
      ) => {
        state.loading = false;
        state.posts = [...action.payload.data.data];
      }
    );
    builder.addCase(
      getBookmarks.rejected,
      (state: MultiplePostsInitialState, action) => {
        state.loading = false;
        state.error = action.error.message!;
      }
    );
  },
});

export default bookmarkSlice.reducer;
