import { CommunityPosts, PartialCommunity } from "@/types/communityTypes";
import { PostPartial } from "@/types/postTypes";
import { getAllPostByCommunity } from "@/utils/communityUtils";
import { ResponseData } from "@/utils/httpUtils";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  downvoteSuccessUtils,
  switchbookmarkSuccessUtils,
  upvoteSuccessUtils,
} from "../utils";

export const fetchAllPostsByCommunity = createAsyncThunk(
  "fetch/all-posts/community",
  async (communityId: PartialCommunity["_id"]) => {
    const communityPosts = await getAllPostByCommunity(communityId!).then(
      (res) => res
    );
    return communityPosts;
  }
);

const initialState: CommunityPosts = {
  posts: [] as PostPartial[],
  loading: false,
  error: "",
};

const communityPost = createSlice({
  name: "posts",
  initialState,
  reducers: {
    upvotecommunityhomepostsuccess: (
      state: CommunityPosts,
      action: PayloadAction<PostPartial["_id"]>
    ) => {
      upvoteSuccessUtils(state, action);
    },
    downvotecommunityhomepostsuccess: (
      state: CommunityPosts,
      action: PayloadAction<PostPartial["_id"]>
    ) => {
      downvoteSuccessUtils(state, action);
    },
    switchbookmarkcommunityhomepostsuccess: (
      state: CommunityPosts,
      action: PayloadAction<PostPartial["_id"]>
    ) => {
      switchbookmarkSuccessUtils(state, action);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAllPostsByCommunity.pending,
      (state: CommunityPosts) => {
        state.loading = true;
      }
    );
    builder.addCase(
      fetchAllPostsByCommunity.fulfilled,
      (state: CommunityPosts, action: PayloadAction<ResponseData>) => {
        state.loading = false;
        state.posts = [...action.payload.data.data];
      }
    );
    builder.addCase(
      fetchAllPostsByCommunity.rejected,
      (state: CommunityPosts, action) => {
        state.error = action.error.message!;
      }
    );
  },
});

export default communityPost.reducer;

export const {
  upvotecommunityhomepostsuccess,
  downvotecommunityhomepostsuccess,
  switchbookmarkcommunityhomepostsuccess,
} = communityPost.actions;
