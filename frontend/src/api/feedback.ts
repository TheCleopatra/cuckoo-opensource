// src/api/feedback.ts
import { FeedbackStatus } from '../types/feedback';
import api from './axios';

export const feedbackApi = {
  // 创建反馈
  async createFeedback(content: string) {
    const response = await api.post('/feedback/create', { content });
    return response.data;
  },

  // 获取反馈列表
  async getFeedbackList(params: {
    page?: number;
    limit?: number;
    sortBy?: string;
    order?: 'asc' | 'desc';
    status?: FeedbackStatus;
    startDate?: Date;
    endDate?: Date;
  }) {
    const response = await api.get('/feedback/list', { params });
    return response.data;
  },

  // 更新反馈状态
  async updateFeedbackStatus(feedbackId: string, status: FeedbackStatus, adminResponse?: string) {
    const response = await api.patch(`/feedback/${feedbackId}/status`, {
      status,
      adminResponse,
    });
    return response.data;
  },
};
