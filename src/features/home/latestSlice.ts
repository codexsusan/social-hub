import { toast } from "@/components/ui/use-toast";
import { PostPartial } from "@/types/postTypes";
import { UserPartial } from "@/types/userTypes";
import { ResponseData } from "@/utils/httpUtils";
import {
  downvotePostUtils,
  getLatestPostsUtils,
  upvotePostUtils,
} from "@/utils/postUtils";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  error: string;
  loading: boolean;
  posts: PostPartial[] | [];
};

const initialState: InitialState = {
  error: "",
  loading: false,
  posts: [] as PostPartial[],
};

export const fetchLatestPosts = createAsyncThunk(
  "home/fetch/latest",
  async (id: UserPartial["_id"]) => {
    const latestPost = await getLatestPostsUtils();
    const updatedData = latestPost.data!.data.map((post: PostPartial) => {
      const upvote_status = post.upvotes!.includes(id!);
      const downvote_status = post.downvotes!.includes(id!);
      return {
        ...post,
        upvote_status,
        downvote_status,
      };
    });
    return {
      ...latestPost,
      data: { ...latestPost.data, data: [...updatedData] },
    };
  }
);

export const upvoteLatestPost = createAsyncThunk(
  "home/latest/post/upvote",
  async (id: PostPartial["_id"]) => {
    return upvotePostUtils(id).then((res) => res);
  }
);

export const downvoteLatestPost = createAsyncThunk(
  "home/latest/post/upvote",
  async (id: PostPartial["_id"]) => {
    return downvotePostUtils(id).then((res) => res);
  }
);

const latestSlice = createSlice({
  name: "latestpost",
  initialState,
  reducers: {
    upvotelatestsuccess: (state, action) => {
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
    downvotelatestsuccess: (state, action) => {
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
    builder.addCase(fetchLatestPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchLatestPosts.fulfilled,
      (state, action: PayloadAction<ResponseData>) => {
        state.loading = false;
        if (action.payload.status === 200) {
          state.posts = [...action.payload.data.data];
          state.posts = state.posts.map((post) => {
            return { ...post };
          });
        } else {
          toast({
            title: "Failed to load data.",
            description: action.payload.data.message,
            duration: 2000,
          });
        }
      }
    );
    builder.addCase(fetchLatestPosts.rejected, (state, action) => {
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

export default latestSlice.reducer;

export const { upvotelatestsuccess, downvotelatestsuccess } =
  latestSlice.actions;
