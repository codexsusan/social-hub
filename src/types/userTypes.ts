export type Gender = "male" | "female" | "others" | "" | string;

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  profilePic: string;
  phoneNo: string;
  gender: Gender;
  token: string;
  bio: string;
  isVerified: boolean;
  isBanned: boolean;
  banReason: string;
  loading: boolean;
  error: string;
}

export interface UserPartial extends Partial<User> {}

export interface RegisterUser extends UserPartial {
  confirmPassword: string;
}

export interface Author extends User {}

export interface AuthorPartial extends Partial<Author> {}

export type MultiUserType = AuthorPartial | UserPartial;

export type AuthorRedirectData = {
  id: AuthorPartial["_id"];
  username: AuthorPartial["userName"];
};

export interface MemberUser {
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
  profilePic: string;
  isFollowing: boolean;
}

export interface SuperUser {
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
  profilePic: string;
  isModerator: boolean;
  isAdmin: boolean;
}
