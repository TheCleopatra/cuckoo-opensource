import { createContext } from 'react';
import { User, LoginCredentials, RegisterCredentials, UserPayload, LoginResponse } from '../types/auth';
import { ApiError } from '../types/error';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<LoginResponse | null>;
  handleAuthResponse: (data: UserPayload) => void;
  register: (credentials: RegisterCredentials) => Promise<UserPayload | undefined>;
  logout: () => void;
  error: ApiError | null;
  clearError: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
