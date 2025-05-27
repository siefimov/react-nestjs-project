import { apiClient } from './api-client';
import { HTTP_METHODS } from '../constants';
type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestConfig {
  withAuth?: boolean;
  [key: string]: any;
}

async function request<T>(
  url: string,
  method: RequestMethod = HTTP_METHODS.GET,
  data: any = null,
  config: RequestConfig = {},
): Promise<T> {
  const headers = { ...(config.headers || {}) };

  if (config.withAuth) {
    const token = localStorage.getItem('token');

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const res = await apiClient.request<T>({
    url,
    method,
    data,
    ...config,
    headers,
  });
  return res.data;
}

export const http = {
  get: <T>(url: string, config: RequestConfig = {}) =>
    request<T>(url, HTTP_METHODS.GET, null, config),
  post: <T>(url: string, data: any, config: RequestConfig = {}) =>
    request<T>(url, HTTP_METHODS.POST, data, config),
  put: <T>(url: string, data: any, config: RequestConfig = {}) =>
    request<T>(url, HTTP_METHODS.PUT, data, config),
  patch: <T>(url: string, data: any, config: RequestConfig = {}) =>
    request<T>(url, HTTP_METHODS.PATCH, data, config),
  delete: <T>(url: string, config: RequestConfig = {}) =>
    request<T>(url, HTTP_METHODS.DELETE, null, config),
};
