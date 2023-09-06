import { toast } from "@/components/ui/use-toast";
import { PostPartial } from "@/types/postTypes";
import { UserPartial } from "@/types/userTypes";
// import {  UserPartial } from "@/types/userTypes";
import { ResponseData } from "@/utils/httpUtils";
import { getLatestPostsUtils, getTrendingPostsUtils } from "@/utils/postUtils";
import { fetchUserByIdUtils } from "@/utils/userUtils";
// import { fetchUserByIdUtils } from "@/utils/userUtils";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  latest: {
    error: string;
    loading: boolean;
    posts: PostPartial[] | [];
  };
  trending: {
    error: string;
    loading: boolean;
    posts: PostPartial[];
  };
  popular: {
    error: string;
    loading: boolean;
    posts: PostPartial[];
  };
};

const initialState: InitialState = {
  latest: {
    error: "",
    loading: false,
    posts: [] as PostPartial[],
  },
  trending: {
    error: "",
    loading: false,
    posts: [] as PostPartial[],
  },
  popular: {
    error: "",
    loading: false,
    posts: [] as PostPartial[],
  },
};

export const fetchLatestPosts = createAsyncThunk(
  "home/fetch/latest",
  async () => {
    return getLatestPostsUtils().then((res) => res);
  }
);

export const fetchTrendingPosts = createAsyncThunk(
  "home/fetch/trending",
  async () => {
    return getTrendingPostsUtils().then((res) => res);
  }
);

const homeSlice = createSlice({
  name: "home",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Latest Posts
    builder.addCase(fetchLatestPosts.pending, (state) => {
      state.latest.loading = true;
    });
    builder.addCase(
      fetchLatestPosts.fulfilled,
      (state, action: PayloadAction<ResponseData>) => {
        state.latest.loading = false;
        console.log(action.payload);
        if (action.payload.status === 200) {
          state.latest.posts = [...action.payload.data.data];
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
      state.latest.loading = false;
      state.latest.error = action.error.message || "";
      toast({
        title: "Unable to load data",
        description: action.error.message!,
        duration: 2000,
      });
    });
    // Trending Posts
    builder.addCase(fetchTrendingPosts.pending, (state) => {
      state.trending.loading = true;
    });
    builder.addCase(
      fetchTrendingPosts.fulfilled,
      (state, action: PayloadAction<ResponseData>) => {
        state.trending.loading = false;
        if (action.payload.status === 200) {
          state.trending.posts = [...action.payload.data.data];
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
      state.trending.loading = false;
      state.trending.error = action.error.message || "";
      toast({
        title: "Unable to load data",
        description: action.error.message!,
        duration: 2000,
      });
    });
  },
});

export default homeSlice.reducer;
