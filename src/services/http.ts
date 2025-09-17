

import AppConst from "@/config/app.const";
import { getCookie } from "@/utils/cookie";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const BASE_URL = AppConst.webApiBaseUrl || "https://todo-dashboard-psi.vercel.app/api";

const http = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptor to attach token from cookie as Bearer
http.interceptors.request.use((config) => {
  const token = getCookie("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  return http.get<T>(url, config);
};

export const post = async <T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  return http.post<T, AxiosResponse<T>, D>(url, data, config);
};

export const put = async <T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  return http.put<T, AxiosResponse<T>, D>(url, data, config);
};

export const del = async <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  return http.delete<T>(url, config);
};

export default http;





