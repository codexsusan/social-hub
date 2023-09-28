import { CommunityPosts, PartialCommunity } from "@/types/communityTypes";
import { PostPartial } from "@/types/postTypes";
import { getAllPostByCommunity } from "@/utils/communityUtils";
import { ResponseData } from "@/utils/httpUtils";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllPostsByCommunity = createAsyncThunk(
  "fetch/all-posts/community",
  async (communityId: PartialCommunity["_id"]) => {
    return getAllPostByCommunity(communityId).then((res) => res);
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
  reducers: {},
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
        console.log(action.payload);
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
