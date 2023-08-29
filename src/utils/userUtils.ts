import { UserPartial } from "@/types/userTypes";
import { request } from "./httpUtils";

export const userSignup = async (user: UserPartial) => {
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

export const userLogin = async (user: UserPartial) => {
  const response = await request("/api/auth/login", "POST", {
    email: user.email,
    password: user.password,
  });
  return response;
};

export const fetchUser = async () => {
  const response = await request("/api/auth/user-details", "GET");
  return response;
};
