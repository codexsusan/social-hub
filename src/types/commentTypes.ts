export interface Comment {
  _id: string;
  content: string;
  author_id: string;
  author_name: string;
  post_id: string;
  parent_type: string;
  parent_id: string;
  upvotes: number;
  downvotes: number;
  report_count: number;
  view_count: number;
  comment_context: string;
  created_at: string;
  updated_at: string;
}

export interface CommentPartial extends Partial<Comment> {}
