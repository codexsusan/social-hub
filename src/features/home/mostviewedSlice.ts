import { MostViewedInitialState, PostPartial } from "@/types/postTypes";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserPartial } from "@/types/userTypes";
import { getMostViewedPostsUtils } from "@/utils/postUtils";
import { ResponseData } from "@/utils/httpUtils";
import { toast } from "@/components/ui/use-toast";

const initialState: MostViewedInitialState = {
  error: "",
  loading: false,
  posts: [] as PostPartial[],
};

export const fetchMostViewedPosts = createAsyncThunk(
  "home/fetch/most-viewed",
  async (userId: UserPartial["_id"]) => {
    const mostviewedPost = await getMostViewedPostsUtils({});
    const updatedData = mostviewedPost.data!.data.map((post: PostPartial) => {
      const upvote_status = post.upvotes!.includes(userId!);
      const downvote_status = post.downvotes!.includes(userId!);
      return {
        ...post,
        upvote_status,
        downvote_status,
      };
    });
    return {
      ...mostviewedPost,
      data: {
        ...mostviewedPost.data,
        data: [...updatedData],
      },
    };
  }
);

const mostviewedSlice = createSlice({
  name: "mostviewed",
  initialState,
  reducers: {
    upvotemostviewedsuccess: (
      state: MostViewedInitialState,
      action: PayloadAction<PostPartial["_id"]>
    ) => {
      const post = state.posts.find((post) => post._id === action.payload);
      if (post) {
        if (!post.upvote_status) {
          post.upvotes_count! = post.upvotes_count! - 1 + 2;
          post.upvote_status = true;
          if (post.downvote_status) {
            post.downvote_status = false;
            post.downvotes_count! = post.downvotes_count! - 1;
          }
        } else {
          post.upvote_status = false;
          post.upvotes_count! = post.upvotes_count! - 1;
        }
      }
    },
    downvotemostviewedsuccess: (
      state: MostViewedInitialState,
      action: PayloadAction<PostPartial["_id"]>
    ) => {
      const post = state.posts.find((post) => post._id === action.payload);
      if (post) {
        if (!post.downvote_status) {
          post.downvotes_count! = post.downvotes_count! - 1 + 2;
          post.downvote_status = true;
          if (post.upvote_status) {
            post.upvote_status = false;
            post.upvotes_count = post.upvotes_count! - 1;
          }
        } else {
          post.downvote_status = false;
          post.downvotes_count = post.downvotes_count! - 1;
        }
      }
    },
    switchbookmarkmostviewedsuccess: (
      state: MostViewedInitialState,
      action: PayloadAction<PostPartial["_id"]>
    ) => {
      const post = state.posts.find((post) => post._id === action.payload);
      if (post) {
        post.isBookmarked = !post.isBookmarked;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchMostViewedPosts.pending,
      (state: MostViewedInitialState) => {
        state.loading = true;
      }
    );
    builder.addCase(
      fetchMostViewedPosts.fulfilled,
      (state: MostViewedInitialState, action: PayloadAction<ResponseData>) => {
        state.loading = false;
        if (action.payload.status === 200) {
          state.posts = [...action.payload.data.data];
          state.posts = state.posts.map((post) => {
            return { ...post };
          });
        } else {
          state.error = action.payload.statusText;
          toast({
            title: "Failed to load data.",
            description: action.payload.data.message,
            duration: 2000,
            className: "bg-[#09090B] text-[#e2e2e2] border-none ",
          });
        }
      }
    );
    builder.addCase(
      fetchMostViewedPosts.rejected,
      (state: MostViewedInitialState, action) => {
        state.loading = false;
        state.error = action.error.message || "";
        toast({
          title: "Failed to load data.",
          description: action.error.message,
          duration: 2000,
          className: "bg-[#09090B] text-[#e2e2e2] border-none ",
        });
      }
    );
  },
});
export default mostviewedSlice.reducer;

export const {
  upvotemostviewedsuccess,
  downvotemostviewedsuccess,
  switchbookmarkmostviewedsuccess,
} = mostviewedSlice.actions;
