import { Document, Types } from 'mongoose';

// 反馈状态枚举
export type FeedbackStatus = 'pending' | 'processed';

// 反馈查询参数接口
export interface FeedbackQueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
  status?: FeedbackStatus;
  startDate?: Date;
  endDate?: Date;
}

// 反馈更新参数接口
export interface FeedbackUpdateParams {
  status?: FeedbackStatus;
  adminResponse?: string;
}

// 反馈列表响应接口
export interface FeedbackListResponse {
  feedbacks: IPopulatedFeedback[];
  total: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// 基础反馈接口
export interface IFeedback extends Document {
  userId: Types.ObjectId;
  content: string;
  status: FeedbackStatus;
  createdAt: Date;
  updatedAt: Date;
}

// 填充用户信息后的反馈接口
export interface IPopulatedFeedback extends Omit<IFeedback, 'userId'> {
  userId: {
    username: string;
    email: string;
  };
}

// 用于 API 响应的用户类型
export interface PopulatedUser {
  username: string;
  email: string;
}
