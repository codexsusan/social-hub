import { PostPartial, TrendingInitialState } from "@/types/postTypes";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { fetchTrendingPosts } from "./homeSlice";
import { ResponseData } from "@/utils/httpUtils";
import { toast } from "@/components/ui/use-toast";
import { getTrendingPostsUtils } from "@/utils/postUtils";
import { UserPartial } from "@/types/userTypes";

const initialState: TrendingInitialState = {
  error: "",
  loading: false,
  posts: [] as PostPartial[],
};

export const fetchTrendingPosts = createAsyncThunk(
  "home/fetch/trending",
  async (id: UserPartial["_id"]) => {
    const trendingPost = await getTrendingPostsUtils({});
    const updatedData = trendingPost.data!.data.map((post: PostPartial) => {
      const upvote_status = post.upvotes!.includes(id!);
      const downvote_status = post.downvotes!.includes(id!);
      return {
        ...post,
        upvote_status,
        downvote_status,
      };
    });
    return {
      ...trendingPost,
      data: { ...trendingPost.data, data: [...updatedData] },
    };
  }
);

const trendingSlice = createSlice({
  name: "trendingpost",
  initialState,
  reducers: {
    upvotetrendingsuccess: (state: TrendingInitialState, action) => {
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
    downvotetrendingsuccess: (
      state: TrendingInitialState,
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
    addbookmarktrendingsuccess: (
      state: TrendingInitialState,
      action: PayloadAction<PostPartial["_id"]>
    ) => {
      const post = state.posts.find((post) => post._id === action.payload);
      if (post) {
        post.isBookmarked = true;
      }
    },
    removebookmarktrendingsuccess: (
      state: TrendingInitialState,
      action: PayloadAction<PostPartial["_id"]>
    ) => {
      const post = state.posts.find((post) => post._id === action.payload);
      if (post) {
        post.isBookmarked = false;
      }
    },
    switchbookmarktrendingsuccess: (
      state: TrendingInitialState,
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
      fetchTrendingPosts.pending,
      (state: TrendingInitialState) => {
        state.loading = true;
      }
    );
    builder.addCase(
      fetchTrendingPosts.fulfilled,
      (state: TrendingInitialState, action: PayloadAction<ResponseData>) => {
        state.loading = false;
        if (action.payload.status === 200) {
          state.posts = [...action.payload.data.data];
        } else {
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
      fetchTrendingPosts.rejected,
      (state: TrendingInitialState, action) => {
        state.loading = false;
        state.error = action.error.message || "";
        toast({
          title: "Unable to load data",
          description: action.error.message!,
          duration: 2000,
          className: "bg-[#09090B] text-[#e2e2e2] border-none ",
        });
      }
    );
  },
});

export default trendingSlice.reducer;

export const {
  upvotetrendingsuccess,
  downvotetrendingsuccess,
  addbookmarktrendingsuccess,
  removebookmarktrendingsuccess,
  switchbookmarktrendingsuccess,
} = trendingSlice.actions;
