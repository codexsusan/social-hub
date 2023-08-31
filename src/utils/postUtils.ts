import { PostPartial } from "@/types/postTypes";
import { request } from "./httpUtils";

export const createPostUtils = async (post: PostPartial) => {
  const response = await request("/api/post/create-post", "POST", post);
  return response;
};
