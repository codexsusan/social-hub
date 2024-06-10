import { MultiplePostsInitialState, PostPartial } from "@/types/postTypes";
import { PayloadAction } from "@reduxjs/toolkit";

export const upvoteSuccessUtils = (
  state: MultiplePostsInitialState,
  action: PayloadAction<PostPartial["_id"]>
) => {
  const post = state.posts.find((post) => post._id === action.payload);
  if (post) {
    if (!post.upVoteStatus) {
      post.upvotes_count! = post.upvotes_count! - 1 + 2;
      post.upVoteStatus = true;
      if (post.downVoteStatus) {
        post.downVoteStatus = false;
        post.downvotes_count! = post.downvotes_count! - 1;
      }
    } else {
      post.upVoteStatus = false;
      post.upvotes_count! = post.upvotes_count! - 1;
    }
  }
};

export const downvoteSuccessUtils = (
  state: MultiplePostsInitialState,
  action: PayloadAction<PostPartial["_id"]>
) => {
  const post = state.posts.find((post) => post._id === action.payload);
  if (post) {
    if (!post.downVoteStatus) {
      post.downvotes_count! = post.downvotes_count! - 1 + 2;
      post.downVoteStatus = true;
      if (post.upVoteStatus) {
        post.upVoteStatus = false;
        post.upvotes_count = post.upvotes_count! - 1;
      }
    } else {
      post.downVoteStatus = false;
      post.downvotes_count = post.downvotes_count! - 1;
    }
  }
};

export const switchbookmarkSuccessUtils = (
  state: MultiplePostsInitialState,
  action: PayloadAction<PostPartial["_id"]>
) => {
  const post = state.posts.find((post) => post._id === action.payload);
  if (post) {
    post.isBookmarked = !post.isBookmarked;
  }
};
