import {
  CommunityHomePostState,
  PartialCommunity,
} from "@/types/communityTypes";
import { CommunityPost, PostPartial } from "@/types/postTypes";
import { getAllPostByCommunity } from "@/utils/communityUtils";
import { ResponseData } from "@/utils/httpUtils";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  downvoteSuccessUtils,
  switchbookmarkSuccessUtils,
  upvoteSuccessUtils,
} from "../utils";
import { queryParamsType } from "@/types/generalTypes";

export const fetchAllPostsByCommunity = createAsyncThunk(
  "fetch/all-posts/community",
  async (post: {
    communityId: PartialCommunity["_id"];
    data: queryParamsType;
  }) => {
    return getAllPostByCommunity(post.communityId!, post.data).then(
      (res) => res
    );
  }
);

export const fetchUpdatedAllPostsByCommunity = createAsyncThunk(
  "fetch/updated-all-posts/community",
  async (post: {
    communityId: PartialCommunity["_id"];
    data: queryParamsType;
  }) => {
    return getAllPostByCommunity(post.communityId!, post.data).then(
      (res) => res
    );
  }
);

const initialState: CommunityHomePostState = {
  posts: [] as CommunityPost[],
  loading: false,
  error: "",
};

const communityPost = createSlice({
  name: "posts",
  initialState,
  reducers: {
    upvotecommunityhomepostsuccess: (
      state: CommunityHomePostState,
      action: PayloadAction<PostPartial["_id"]>
    ) => {
      upvoteSuccessUtils(state, action);
    },
    downvotecommunityhomepostsuccess: (
      state: CommunityHomePostState,
      action: PayloadAction<PostPartial["_id"]>
    ) => {
      downvoteSuccessUtils(state, action);
    },
    switchbookmarkcommunityhomepostsuccess: (
      state: CommunityHomePostState,
      action: PayloadAction<PostPartial["_id"]>
    ) => {
      switchbookmarkSuccessUtils(state, action);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAllPostsByCommunity.pending,
      (state: CommunityHomePostState) => {
        state.loading = true;
      }
    );
    builder.addCase(
      fetchAllPostsByCommunity.fulfilled,
      (state: CommunityHomePostState, action: PayloadAction<ResponseData>) => {
        state.loading = false;
        state.posts = [...action.payload.data.data];
      }
    );
    builder.addCase(
      fetchAllPostsByCommunity.rejected,
      (state: CommunityHomePostState, action) => {
        state.error = action.error.message!;
      }
    );
    builder.addCase(
      fetchUpdatedAllPostsByCommunity.fulfilled,
      (state: CommunityHomePostState, action: PayloadAction<ResponseData>) => {
        state.loading = false;
        if (state.posts.length > 0) {
          state.posts = state.posts.concat(action.payload.data.data);
          return;
        } else {
          state.posts = [...action.payload.data.data];
        }
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
