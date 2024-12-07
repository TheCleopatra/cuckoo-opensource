export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export interface User {
  id: string;
  username: string;
  email?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  password: string;
  // email: string;
  // verificationCode: string;
}

export type UserWithoutPassword = Omit<User, 'password'>;

export interface UserPayload {
  user: UserWithoutPassword;
  token: string;
}

export interface LoginResponse {
  success: boolean;
  data: UserPayload;
}
