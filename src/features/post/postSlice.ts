import { PostPartial } from "@/types/postTypes";
import { downvotePostUtils, upvotePostUtils } from "@/utils/postUtils";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const upvotePost = createAsyncThunk(
  "home/trending/post/upvote",
  async (id: PostPartial["_id"]) => {
    return upvotePostUtils(id).then((res) => res);
  }
);

export const downvotePost = createAsyncThunk(
  "home/trending/post/upvote",
  async (id: PostPartial["_id"]) => {
    return downvotePostUtils(id).then((res) => res);
  }
);
