import { PostPartial } from "./postTypes";

export type CommunityTypes = "public" | "private" | string;
export interface Community {
  _id: string;
  name: string;
  displayName: string;
  description: string;
  community_type: CommunityTypes;
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
  isMember: boolean;
  isAdmin: boolean;
  loading: boolean;
  error: string;
}

export interface CommunityPosts {
  posts: PostPartial[];
  loading: boolean;
  error: string;
}

export interface CommunityLists {
  loading: boolean;
  error: string;
  communities: Community[];
}

export interface CommunityMultiSelectData {
  id: string;
  name: string;
}
