type methodType = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

const base_url = "https://social-hub1.onrender.com" || "http://localhost:3000";

export type ResponseData = {
  status: number;
  statusText: string;
  data: any;
  totalPage?: number;
};

export const request = async (
  endpoint: string,
  method: methodType = "GET",
  data: any = {}
) => {
  let url: string;
  if (method === "GET") {
    const requestParams = data
      ? "?" +
        Object.keys(data)
          .map((key) => `${key}=${data[key]}`)
          .join("&")
      : "";
    url = `${base_url}${endpoint}${requestParams}`;
  } else {
    url = `${base_url}${endpoint}`;
  }
  // Token Authentication
  const token = localStorage.getItem("token");
  const auth = token ? token : "";

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth}`,
    },
    body: method !== "GET" ? JSON.stringify(data) : undefined,
  });
  // console.log(await response.json());
  const updatedResponse: ResponseData = {
    status: response.status,
    statusText: response.statusText,
    data: await response.json(),
  };
  return updatedResponse;

  throw new Error(response.statusText);
};
