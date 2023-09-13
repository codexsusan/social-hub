import { PostPartial } from "./postTypes";
import { AuthorPartial, UserPartial } from "./userTypes";

export interface Comment {
  _id: string;
  content: string;
  author_id: string;
  author: AuthorPartial;
  post_id: string;
  upvotes: string[];
  downvotes: string[];
  upvote_status: boolean;
  downvote_status: boolean;
  upvotes_count: number;
  downvotes_count: number;
  report_count: number;
  comment_count: number;
  comment_context: string;
  comment_reply_status: boolean;
  comment_reply: NestedComment[];
  parent_type: string;
  parent_id: string;
  created_at: string;
  updated_at: string;
}

export interface CommentPartial extends Partial<Comment> {}

export interface NestedComment extends Comment {
  replies_count: number;
  comment_current_reply: string;
  comment_current_reply_loading: boolean;
  comment_replies: NestedComment[];
}

export type CommentInitialState = {
  error: string;
  loading: boolean;
  current_comment: string;
  current_comment_loading: boolean;
  comments: NestedComment[];
};

export type PostandUserId = {
  postId: PostPartial["_id"];
  userId: UserPartial["_id"];
};
