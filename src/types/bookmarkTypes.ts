import { PostPartial } from "./postTypes";
import { UserPartial } from "./userTypes";

export interface Bookmark {
  _id: string;
  user: UserPartial["_id"];
  post: PostPartial;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface BookmarkPartial extends Partial<Bookmark> {}


export type BookmarkInitialState = {
  error: string;
  loading: boolean;
  bookmarks: BookmarkPartial[];
};