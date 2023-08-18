export type User = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  token: string;
  profilePic: string;
  bio: string;
  isVerified: boolean;
  isBanned: boolean;
  banReason: string;
};

export type UserPartial = Partial<User>;

