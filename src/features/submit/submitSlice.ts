import { PostPartial } from "@/types/postTypes";
import { ResponseData } from "@/utils/httpUtils";
import { createPostUtils } from "@/utils/postUtils";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type SubmitInitialState = {
  post: PostPartial;
  loading: boolean;
  error: string;
};

const initialState: SubmitInitialState = {
  post: {
    title: "",
    content:
      '{"time":1697208637870,"blocks":[{"id":"FuZcoTwXqM","type":"paragraph","data":{"text":""}}],"version":"2.28.0"}',
  } as PostPartial,
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
    builder.addCase(createPost.pending, (state: SubmitInitialState) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(
      createPost.fulfilled,
      (state: SubmitInitialState, action: PayloadAction<ResponseData>) => {
        state.loading = false;
        if (action.payload.status === 200) {
          state.post = {
            ...state.post,
            title: "",
            content: initialState.post.content,
            tags: [],
            community_id: "",
          };
        }
      }
    );
    builder.addCase(
      createPost.rejected,
      (state: SubmitInitialState, action) => {
        state.error = action.error.message!;
        state.loading = false;
      }
    );
  },
});

export default submitSlice.reducer;
export const { changeTitle, changeContent, changeCommunity } =
  submitSlice.actions;
