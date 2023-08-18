export type User = {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  profilePic: string;
  gender: string;
  bio: string;
  isVerified: boolean;
  isBanned: boolean;
  banReason: string;
};

export type UserPartial = Partial<User>;
