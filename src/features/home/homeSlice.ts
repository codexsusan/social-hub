import { toast } from "@/components/ui/use-toast";
import { PostPartial } from "@/types/postTypes";
import { ResponseData } from "@/utils/httpUtils";
import { getLatestPostsUtils, getTrendingPostsUtils } from "@/utils/postUtils";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type LatestPosts = {
  error: string;
  loading: boolean;
  posts: PostPartial[];
  page: number;
  totalPage: number;
};

type TrendingPosts = {
  error: string;
  loading: boolean;
  posts: PostPartial[];
  page: number;
  totalPage: number;
};

type PopularPosts = {
  error: string;
  loading: boolean;
  posts: PostPartial[];
  page: number;
  totalPage: number;
};

type InitialState = {
  latest: LatestPosts;
  trending: TrendingPosts;
  popular: PopularPosts;
};

const initialState: InitialState = {
  latest: {
    error: "",
    loading: false,
    posts: [] as PostPartial[],
    page: 1,
    totalPage: 1,
  },
  trending: {
    error: "",
    loading: false,
    posts: [] as PostPartial[],
    page: 1,
    totalPage: 1,
  },
  popular: {
    error: "",
    loading: false,
    posts: [] as PostPartial[],
    page: 1,
    totalPage: 1,
  },
};

export const fetchLatestPosts = createAsyncThunk(
  "home/fetch/latest",
  async (pagination: { page: number; limit: number }) => {
    return getLatestPostsUtils(pagination.page, pagination.limit).then(
      (res) => res
    );
  }
);

export const fetchTrendingPosts = createAsyncThunk(
  "home/fetch/trending",
  async (pagination: { page: number; limit: number }) => {
    return getTrendingPostsUtils(pagination.page, pagination.limit).then(
      (res) => res
    );
  }
);

const homeSlice = createSlice({
  name: "home",
  initialState: initialState,
  reducers: {
    // Latest Posts
    incrementLatestPage: (state) => {
      state.latest.page += 1;
    },
    decrementLatestPage: (state) => {
      state.latest.page -= 1;
    },
    // Trending Posts
    incrementTrendingPage: (state) => {
      state.trending.page += 1;
    },
    decrementTrendingPage: (state) => {
      state.trending.page -= 1;
    },
    // Popular Posts
    incrementPopularPage: (state) => {
      state.popular.page += 1;
    },
    decrementPopularPage: (state) => {
      state.popular.page -= 1;
    },
  },
  extraReducers: (builder) => {
    // Fetch Latest Posts
    builder.addCase(fetchLatestPosts.pending, (state) => {
      state.latest.loading = true;
    });
    builder.addCase(
      fetchLatestPosts.fulfilled,
      (state, action: PayloadAction<ResponseData>) => {
        state.latest.loading = false;
        if (action.payload.status === 200) {
          state.latest.posts = [...action.payload.data.data];
          // state.latest.totalPage = action.payload
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
          state.trending.totalPage = action.payload.data.totalPage;
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
export const {
  incrementLatestPage,
  decrementLatestPage,
  incrementTrendingPage,
  decrementTrendingPage,
} = homeSlice.actions;
