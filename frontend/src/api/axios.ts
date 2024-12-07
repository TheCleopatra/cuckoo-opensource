import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ApiError } from '../types/error';
import { storage } from '../utils/storage';

const config: AxiosRequestConfig = {
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
};

const api: AxiosInstance = axios.create({ baseURL: 'http://localhost:3000', ...config });

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = storage.getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: AxiosError<ApiError>): Promise<never> => {
    if (error.response?.status === 401) {
      storage.clear();
      // 跳转到login页面
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
