import { apiClient } from "./api-client";

type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

async function request<T>(
  url: string,
  method: RequestMethod = "GET",
  data: any = null,
  config = {}
): Promise<T> {
  const res = await apiClient.request<T>({
    url,
    method,
    data,
    ...config,
  });
  return res.data;
}

export const http = {
  get: <T>(url: string, config = {}) => request<T>(url, "GET", null, config),
  post: <T>(url: string, data: any, config = {}) =>
    request<T>(url, "POST", data, config),
  put: <T>(url: string, data: any, config = {}) =>
    request<T>(url, "PUT", data, config),
  patch: <T>(url: string, data: any, config = {}) =>
    request<T>(url, "PATCH", data, config),
  delete: <T>(url: string, config = {}) =>
    request<T>(url, "DELETE", null, config),
};
