import { fileRequest } from "./httpUtils";

export const uploadFile = async (formData: FormData) => {
  const response = await fileRequest(
    "/api/uploads/single-file-upload",
    "POST",
    formData
  );
  return response;
};
