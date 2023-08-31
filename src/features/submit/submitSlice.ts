import { PostPartial } from "@/types/postTypes";
import { createPostUtils } from "@/utils/postUtils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  post: PostPartial;
  loading: boolean;
  error: string;
};

const initialState: InitialState = {
  post: {
    title: "",
    content: "",
    tags: [],
    community_id: "",
  },
  loading: false,
  error: "",
};

// Create Post Async Thunk
export const createPost = createAsyncThunk(
  "submit/createPost",
  async (post: PostPartial) => {
    return createPostUtils(post).then((res) => res);
  }
);

const submitSlice = createSlice({
  name: "submit",
  initialState,
  reducers: {
    clear: (state) => {
      state = initialState;
    },
    changeTitle: (state, action) => {
      state.post.title = action.payload;
    },
    changeContent: (state, action) => {
      state.post.content = action.payload;
    },
    changeCommunity: (state, action) => {
      state.post.community_id = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Create Post
    builder.addCase(createPost.pending, (state) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(createPost.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload);
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.error = action.error.message!;
      state.loading = false;
    });
  },
});

export default submitSlice.reducer;
export const { changeTitle, changeContent, changeCommunity, clear } = submitSlice.actions;
