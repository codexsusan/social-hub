import { PostPartial, MultiplePostsInitialState } from "@/types/postTypes";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { fetchTrendingPosts } from "./homeSlice";
import { ResponseData } from "@/utils/httpUtils";
import { toast } from "@/components/ui/use-toast";
import { getTrendingPostsUtils } from "@/utils/postUtils";
import { UserPartial } from "@/types/userTypes";
import {
  downvoteSuccessUtils,
  switchbookmarkSuccessUtils,
  upvoteSuccessUtils,
} from "../utils";

const initialState: MultiplePostsInitialState = {
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
    upvotetrendingsuccess: (state: MultiplePostsInitialState, action) => {
      console.log("Clicked here");
      upvoteSuccessUtils(state, action);
    },
    downvotetrendingsuccess: (
      state: MultiplePostsInitialState,
      action: PayloadAction<PostPartial["_id"]>
    ) => {
      downvoteSuccessUtils(state, action);
    },

    switchbookmarktrendingsuccess: (
      state: MultiplePostsInitialState,
      action: PayloadAction<PostPartial["_id"]>
    ) => {
      switchbookmarkSuccessUtils(state, action);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchTrendingPosts.pending,
      (state: MultiplePostsInitialState) => {
        state.loading = true;
      }
    );
    builder.addCase(
      fetchTrendingPosts.fulfilled,
      (
        state: MultiplePostsInitialState,
        action: PayloadAction<ResponseData>
      ) => {
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
      (state: MultiplePostsInitialState, action) => {
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
  switchbookmarktrendingsuccess,
} = trendingSlice.actions;
