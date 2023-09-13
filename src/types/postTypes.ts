import { NestedComment } from "./commentTypes";
import { AuthorPartial } from "./userTypes";

export interface PostActionType {
  vote: number;
  upVote: boolean;
  downVote: boolean;
  comment: boolean;
  bookmarkStatus: boolean;
  upVoteCount: number;
  downVoteCount: number;
  commentCount: number;
}

export interface PostAuthor {
  _id: string;
  username: string;
  avatar: string;
  bio: string;
  community_id: string;
  community_name: string;
}

export interface Post {
  _id: string;
  title: string;
  content: string;
  author: AuthorPartial;
  community_id: string;
  community_name: string;
  is_sticked: boolean;
  vote: number;
  upvotes: string[];
  downvotes: string[];
  upvotes_count: number;
  downvotes_count: number;
  upvote_status: boolean;
  downvote_status: boolean;
  comment_count: number;
  comment_data: NestedComment[];
  comment_status: boolean;
  bookmark_status: boolean;
  report_count: number;
  view_count: number;
  tags: string[];
  created_at: string;
}

export interface PostPartial extends Partial<Post> {}

export type LatestInitialState = {
  error: string;
  loading: boolean;
  posts: PostPartial[] | [];
};

export type TrendingInitialState = {
  error: string;
  loading: boolean;
  posts: PostPartial[];
};

export type MostViewedInitialState = {
  error: string;
  loading: boolean;
  posts: PostPartial[];
};

export type SinglePostInitialState = {
  error: string;
  loading: boolean;
  post: PostPartial;
};
