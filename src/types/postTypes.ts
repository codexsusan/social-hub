export interface Post {
  id: string;
  title: string;
  content: string;
  author_id: string;
  community_id: string;
  is_sticked: boolean;
  upvotes: number;
  downvotes: number;
  report_count: number;
  view_count: number;
  tags: string[];
  created_at: string;
}

export interface PostPartial extends Partial<Post> {}

export interface PostActionType {
  upVote: boolean;
  downVote: boolean;
  comment: boolean;
  bookmarkStatus: boolean;
  upVoteCount: number;
  downVoteCount: number;
  commentCount: number;
}
