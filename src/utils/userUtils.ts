import { UserPartial } from "@/types/userTypes";
import { request } from "./httpUtils";

export const userSignupUtils = async (user: UserPartial) => {
  const response = await request("/api/auth/register", "POST", {
    firstName: user.firstName,
    lastName: user.lastName,
    userName: user.userName,
    email: user.email,
    password: user.password,
    confirmPassword: user.password,
    gender: user.gender,
    bio: user.bio,
  });
  return response;
};

export const userLoginUtils = async (user: UserPartial) => {
  const response = await request("/api/auth/login", "POST", user);
  return response;
};

export const fetchUserUtils = async () => {
  const response = await request("/api/auth/user-details", "GET");
  return response;
};
