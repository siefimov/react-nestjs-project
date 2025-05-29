import { apiClient } from './api-client';
import { HTTP_METHODS } from '@/shared/constants';
import type { RequestMethod } from '@/shared/types';
import type { AxiosRequestConfig } from 'axios';

interface RequestConfig extends AxiosRequestConfig {
  withAuth?: boolean;
}

async function request<T, D>(
  url: string,
  method: RequestMethod = HTTP_METHODS.GET,
  data: D = undefined as unknown as D,
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
    request<T, undefined>(url, HTTP_METHODS.GET, undefined, config),

  post: <T, D = unknown>(url: string, data: D, config: RequestConfig = {}) =>
    request<T, D>(url, HTTP_METHODS.POST, data, config),

  put: <T, D = unknown>(url: string, data: D, config: RequestConfig = {}) =>
    request<T, D>(url, HTTP_METHODS.PUT, data, config),

  patch: <T, D = unknown>(url: string, data: D, config: RequestConfig = {}) =>
    request<T, D>(url, HTTP_METHODS.PATCH, data, config),

  delete: <T>(url: string, config: RequestConfig = {}) =>
    request<T, undefined>(url, HTTP_METHODS.DELETE, undefined, config),
};
