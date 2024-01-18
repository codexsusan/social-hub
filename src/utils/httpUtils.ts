/* eslint-disable @typescript-eslint/no-explicit-any */
type methodType = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

// const base_url = "http://localhost:3000" || "https://sea-turtle-app-bk4cx.ondigitalocean.app";
const base_url = import.meta.env.VITE_APP_SERVER || "http://localhost:3001";
// const base_url = "http://localhost:3001" || import.meta.env.VITE_APP_SERVER;

export type ResponseData = {
  status: number;
  statusText: string;
  data: any;
};

export const request = async (
  endpoint: string,
  method: methodType = "GET",
  data: any = null
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
  const updatedResponse: ResponseData = {
    status: response.status,
    statusText: response.statusText,
    data: await response.json(),
  };
  return updatedResponse;
};

export const fileRequest = async (
  endpoint: string,
  method: "POST",
  data: FormData
) => {
  const url = `${base_url}${endpoint}`;
  // Token Authentication
  const token = localStorage.getItem("token");
  const auth = token ? token : "";

  const response = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${auth}`,
    },
    body: data,
  });
  const updatedResponse: ResponseData = {
    status: response.status,
    statusText: response.statusText,
    data: await response.json(),
  };
  return updatedResponse;
};
