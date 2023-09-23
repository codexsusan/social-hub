import { MultiplePostsInitialState, PostPartial } from "@/types/postTypes";
import { PayloadAction } from "@reduxjs/toolkit";

export const upvoteSuccessUtils = (
  state: MultiplePostsInitialState,
  action: PayloadAction<PostPartial["_id"]>
) => {
  const post = state.posts.find((post) => post._id === action.payload);
  if (post) {
    if (!post.upvote_status) {
      post.upvotes_count! = post.upvotes_count! - 1 + 2;
      post.upvote_status = true;
      if (post.downvote_status) {
        post.downvote_status = false;
        post.downvotes_count! = post.downvotes_count! - 1;
      }
    } else {
      post.upvote_status = false;
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
    if (!post.downvote_status) {
      post.downvotes_count! = post.downvotes_count! - 1 + 2;
      post.downvote_status = true;
      if (post.upvote_status) {
        post.upvote_status = false;
        post.upvotes_count = post.upvotes_count! - 1;
      }
    } else {
      post.downvote_status = false;
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
