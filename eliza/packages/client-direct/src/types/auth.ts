import { Request } from 'express';
import mongoose from 'mongoose';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export interface User {
  _id: mongoose.Types.ObjectId;
  id: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt?: Date;
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

export interface AuthenticatedRequest extends Request {
  user?: UserWithoutPassword;
}
