import { PostPartial } from "@/types/postTypes";
import { ResponseData } from "@/utils/httpUtils";
import { createPostUtils } from "@/utils/postUtils";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "@/components/ui/use-toast";

type InitialState = {
  post: PostPartial;
  loading: boolean;
  error: string;
};

const initialState: InitialState = {
  post: {} as PostPartial,
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
    builder.addCase(
      createPost.fulfilled,
      (state, action: PayloadAction<ResponseData>) => {
        state.loading = false;
        if (action.payload.status === 200) {
          state.post = {
            title: "",
            content: "",
            tags: [],
          };
          toast({
            title: "Post Submitted",
            description: action.payload.data.message,
            className: "bg-[#09090B] text-[#e2e2e2] border-none ",
            duration: 2000,
          });
        } else {
          toast({
            title: "Post submission failed.",
            description: action.payload.data.message,
            className: "bg-[#09090B] text-[#e2e2e2] border-none ",
            duration: 2000,
          });
        }
      }
    );
    builder.addCase(createPost.rejected, (state, action) => {
      state.error = action.error.message!;
      state.loading = false;
    });
  },
});

export default submitSlice.reducer;
export const { changeTitle, changeContent, changeCommunity, clear } =
  submitSlice.actions;
