import { toast } from "@/components/ui/use-toast";
import { PostPartial } from "@/types/postTypes";
import { ResponseData } from "@/utils/httpUtils";
import { getLatestPostsUtils } from "@/utils/postUtils";
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
  async () => {
    return getLatestPostsUtils().then((res) => res);
  }
);

const latestSlice = createSlice({
  name: "latestpost",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLatestPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchLatestPosts.fulfilled,
      (state, action: PayloadAction<ResponseData>) => {
        state.loading = false;
        console.log(action.payload);
        if (action.payload.status === 200) {
          state.posts = [...action.payload.data.data];
          //   console.log("Hello I am working properly");
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
