import { PostPartial } from "./postTypes";

export interface Community {
  _id: string;
  name: string;
  displayName: string;
  description: string;
  community_type: string;
  icon_image: string;
  creator_id: string;
  member_count: number;
  report_count: number;
  is_banned: boolean;
  ban_reason: string;
  created_at: string;
  updated_at: string;
}

export interface PartialCommunity extends Partial<Community> {}

export interface CreateCommunity extends PartialCommunity {
  loading: boolean;
  error: string;
}

export interface CommunityHome extends PartialCommunity {
  loading: boolean;
  error: string;
}

export interface CommunityPosts {
  posts: PostPartial[];
  loading: boolean;
  error: string;
}
