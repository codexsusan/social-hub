export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  profilePic: string;
  gender: "male" | "female" | "others" | "";
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

export type Gender = "male" | "female" | "others" | "";

export interface Author extends User {}

export interface AuthorPartial extends Partial<Author> {}
