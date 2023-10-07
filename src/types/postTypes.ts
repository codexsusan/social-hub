import { NestedComment } from "./commentTypes";
import { PartialCommunity } from "./communityTypes";
import { AuthorPartial } from "./userTypes";

// TODO: Remove this if not in used till the project is completed
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

// TODO: Unused till now check before clearing
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
  community_id: string | null;
  is_sticked: boolean;
  upvotes: string[];
  downvotes: string[];
  upvotes_count: number;
  downvotes_count: number;
  reports: string[];
  report_count: number;
  view_count: number;
  comment_count: number;
  tags: string[];
  is_blocked: boolean;
  created_at: string;
  isBookmarked: boolean;
  upVoteStatus: boolean;
  downVoteStatus: boolean;
  // TODO: Below data aren't sent from the backend
  community_name: string;
  comment_data: NestedComment[];
  comment_status: boolean;
}

export interface PostPartial extends Partial<Post> {}

export interface UserPost extends PostPartial {}
export interface CommunityPost extends PostPartial {
  community: PartialCommunity;
}

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

export type MultiplePostsInitialState = {
  error: string;
  loading: boolean;
  posts: PostPartial[];
};
