import { UserPartial } from "@/types/userTypes";
import { request } from "./httpUtils";

export const userSignup = async (user: UserPartial) => {
  const response = await request("/api/auth/register", "POST", {
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    password: user.password,
  });
  return response;
};

// SIgn Up Format
// "firstName": "Hritik",
//     "lastName": "Adhikari",
//     "userName": "hritikadhikari",
//     "email": "hr@gmail.com",
//     "password":"asdfghjkl",
//     "gender":"male",
//     "confirmPassword": "asdfghjkl",
//     "bio":"Hello"
