// export interface Post {
//   _id: string;
//   title: string;
//   content: string;
//   author_id: string;
//   community_id: string;
//   is_sticked: boolean;
//   upvotes: number;
//   downvotes: number;
//   report_count: number;
//   view_count: number;
//   tags: string[];
//   created_at: string;
// }

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
  author_id: string;
  author_name: string;
  author_avatar: string;
  author_bio: string;
  community_id: string;
  community_name: string;
  is_sticked: boolean;
  vote: number;
  upvotes: number;
  downvotes: number;
  upvote_status: boolean;
  downvote_status: boolean;
  comment_count: number;
  comment_data: string[];
  bookmark_status: boolean;
  report_count: number;
  view_count: number;
  tags: string[];
  created_at: string;
}

export interface PostPartial extends Partial<Post> {}
