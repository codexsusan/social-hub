import { RegisterUser, User, UserPartial } from "@/types/userTypes";
import { request } from "./httpUtils";

// Register User
export const userSignupUtils = async (user: Partial<RegisterUser>) => {
  const response = await request("/api/auth/register", "POST", user);
  return response;
};

// Handle User Login
export const userLoginUtils = async (user: UserPartial) => {
  const response = await request("/api/auth/login", "POST", user);
  return response;
};

// Fetch User Details
export const fetchUserUtils = async () => {
  const response = await request("/api/auth/user-details", "GET", {});
  return response;
};

// Fetch User Details by Id
export const getUserByIdUtils = async (userId: UserPartial["_id"]) => {
  const response = await request(`/api/auth/user-details/${userId}`, "GET", {});
  return response;
};

// Update user profile image
export const updateUserProfileImageUtils = async (imageLink: string) => {
  const response = await request("/api/uploads/update-profile-image", "PUT", {
    imageLink: imageLink,
    type: "user",
  });
  return response;
};

// Update user details
export const updateUserDetailsUtils = async (
  userId: User["_id"],
  user: Omit<UserPartial, "_id">
) => {
  const response = await request(
    `/api/auth/update-user/${userId}`,
    "PUT",
    user
  );
  return response;
};

export const resetPasswordUtils = async (data: {
  password: RegisterUser["password"];
  confirmPassword: RegisterUser["confirmPassword"];
}) => {
  const response = await request("/api/auth/reset-password", "POST", data);
  return response;
};

export const deleteUserUtils = async () => {
  const response = await request("/api/auth/delete-user", "DELETE", {});
  return response;
};
