import api from './axios';
import { ApiResponse } from '../types/error';
import { LoginCredentials, LoginResponse, RegisterCredentials, UserPayload } from '../types/auth';
import { storage } from '../utils/storage';

export const authApi = {
  async login(data: LoginCredentials): Promise<LoginResponse> {
    const response = await api.post('/cuckoo/auth/login', data);
    if (response.data.success) {
      // 保存用户信息和token
      storage.setToken(response.data.data.token);
      storage.setUser(response.data.data.user);
    }
    return response.data;
  },

  async register(data: RegisterCredentials): Promise<ApiResponse<UserPayload>> {
    const response = await api.post('/cuckoo/auth/register', data);
    return response.data;
  },

  async sendVerificationCode(email: string): Promise<{ success: boolean; message: string }> {
    const response = await api.post('/cuckoo/auth/send-code', { email });
    return response.data;
  },

  async logout(): Promise<{ success: boolean; message: string }> {
    const response = await api.post('/cuckoo/auth/logout');
    return response.data;
  },

  async validateToken(): Promise<ApiResponse<UserPayload>> {
    const response = await api.post('/cuckoo/auth/validate');
    return response.data;
  },

  // 检查用户名是否存在
  async checkUsername(username: string): Promise<{ exists: boolean }> {
    const response = await api.post('/cuckoo/auth/check-username', { username });
    return response.data;
  },
};
