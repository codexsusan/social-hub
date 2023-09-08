import { AuthorPartial } from "./userTypes";

export interface Comment {
  _id: string;
  content: string;
  author_id: string;
  author: AuthorPartial[];
  post_id: string;
  upvotes: string[];
  downvotes: string[];
  upvotes_count: number;
  downvotes_count: number;
  report_count: number;
  comment_context: string;
  parent_type: string;
  parent_id: string;
  created_at: string;
  updated_at: string;
}

export interface CommentPartial extends Partial<Comment> {}
