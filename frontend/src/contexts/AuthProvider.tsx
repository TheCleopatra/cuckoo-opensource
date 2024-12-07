import React, { useState, useEffect } from 'react';
import { authApi } from '../api/auth';
import { AxiosError } from 'axios';
import { LoginCredentials, RegisterCredentials, UserPayload, User } from '../types/auth';
import { ApiError } from '../types/error';
import { AuthContext } from './AuthContext';
import { storage } from '../utils/storage';
import { generateWalletAddress, generatePrivateKey } from '~/utils/wallet';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = storage.getToken();
      const storedUser = storage.getUser();
      if (!token || !storedUser) {
        setIsLoading(false);
        return;
      }

      try {
        const data = await authApi.validateToken();
        if (data.success && data.data) {
          setUser(data.data.user || null);
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error(err);
        localStorage.removeItem('token');
        setError({ message: '会话已过期，请重新登录' });
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  interface ErrorResponse {
    message: string;
    field?: string;
  }

  const handleAuthResponse = async ({ user, token }: UserPayload) => {
    storage.setToken(token);
    storage.setUser(user);
    try {
      await chrome.storage.local.set({ isAuthenticated: true, lastActiveTime: Date.now() });
    } catch (err) {
      console.error(err);
    } finally {
      setUser(user);
      setIsAuthenticated(true);
      setError(null);
    }
  };

  const initWallet = async () => {
    // 检查钱包地址是否存在
    const existingWalletAddress = storage.getWalletAddress();
    if (!existingWalletAddress) {
      // 生成新的钱包地址和私钥
      const newWalletAddress = generateWalletAddress(); // Implement this function
      const newPrivateKey = generatePrivateKey(); // Implement this function

      // 缓存钱包地址和私钥
      storage.setWalletAddress(newWalletAddress);
      storage.setPrivateKey(newPrivateKey);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    // 假装登录成功
    // handleAuthResponse({
    //   user: {
    //     id: '1',
    //     username: credentials.username,
    //     role: UserRole.USER,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   },
    //   token: 'token',
    // });

    // return {
    //   success: true,
    //   data: {
    //     user: {
    //       id: '1',
    //       username: credentials.username,
    //       role: UserRole.USER,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     },
    //     token: 'token',
    //   },
    // };
    try {
      const response = await authApi.login(credentials);
      if (response.success && response.data) {
        await handleAuthResponse(response.data);
        await initWallet();
      }

      return response;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      setError({
        message: error.response?.data?.message || '登录失败，请稍后重试',
      });
      throw err;
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      setIsLoading(true);
      const response = await authApi.register(credentials);
      if (response.success && response.data) {
        handleAuthResponse(response.data);
      }
      return response.data;
    } catch (err: unknown) {
      const error = err as AxiosError<ErrorResponse>;
      setError({
        message: error.response?.data?.message || '注册失败，请稍后重试',
      });

      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    storage.clear();
    try {
      await chrome.storage.local.clear();
    } catch (error) {
      console.error(error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setError(null);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        handleAuthResponse,
        logout,
        error,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
