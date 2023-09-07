import { PostPartial } from "@/types/postTypes";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { fetchTrendingPosts } from "./homeSlice";
import { ResponseData } from "@/utils/httpUtils";
import { toast } from "@/components/ui/use-toast";
import {
  downvotePostUtils,
  getTrendingPostsUtils,
  upvotePostUtils,
} from "@/utils/postUtils";
import { UserPartial } from "@/types/userTypes";

type InitialState = {
  error: string;
  loading: boolean;
  posts: PostPartial[];
};

const initialState: InitialState = {
  error: "",
  loading: false,
  posts: [] as PostPartial[],
};

export const fetchTrendingPosts = createAsyncThunk(
  "home/fetch/trending",
  async (id: UserPartial["_id"]) => {
    const trendingPost = await getTrendingPostsUtils();
    const updatedData = trendingPost.data!.data.map((post: PostPartial) => {
      const upvote_status = post.upvotes!.includes(id!);
      const downvote_status = post.downvotes!.includes(id!);
      // TODO: Issue while loading data at the first it as the upvote and downvote status is not set
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

export const upvoteTrendingPost = createAsyncThunk(
  "home/trending/post/upvote",
  async (id: PostPartial["_id"]) => {
    return upvotePostUtils(id).then((res) => res);
  }
);

export const downvoteTrendingPost = createAsyncThunk(
  "home/trending/post/upvote",
  async (id: PostPartial["_id"]) => {
    return downvotePostUtils(id).then((res) => res);
  }
);

const trendingSlice = createSlice({
  name: "trendingpost",
  initialState,
  reducers: {
    upvotetrendingsuccess: (state, action) => {
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
    downvotetrendingsuccess: (state, action) => {
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTrendingPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchTrendingPosts.fulfilled,
      (state, action: PayloadAction<ResponseData>) => {
        state.loading = false;
        if (action.payload.status === 200) {
          state.posts = [...action.payload.data.data];
        } else {
          toast({
            title: "Failed to load data.",
            description: action.payload.data.message,
            duration: 2000,
          });
        }
      }
    );
    builder.addCase(fetchTrendingPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "";
      toast({
        title: "Unable to load data",
        description: action.error.message!,
        duration: 2000,
      });
    });
  },
});

export default trendingSlice.reducer;

export const { upvotetrendingsuccess, downvotetrendingsuccess } =
  trendingSlice.actions;
