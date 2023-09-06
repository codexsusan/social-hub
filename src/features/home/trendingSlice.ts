import { PostPartial } from "@/types/postTypes";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { fetchTrendingPosts } from "./homeSlice";
import { ResponseData } from "@/utils/httpUtils";
import { toast } from "@/components/ui/use-toast";
import { getTrendingPostsUtils } from "@/utils/postUtils";

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
  async () => {
    return getTrendingPostsUtils().then((res) => res);
  }
);

const trendingSlice = createSlice({
  name: "trendingpost",
  initialState,
  reducers: {},
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
