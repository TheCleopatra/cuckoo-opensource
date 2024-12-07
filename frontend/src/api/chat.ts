import api from './axios';
import { Chat, Message } from '../types/chat';

const agentId = import.meta.env.VITE_API_AGENTID;

export const chatApi = {
  // chat with cuckoo, send message to cuckoo and get response
  sendMessage: async (content: string): Promise<Message[]> => {
    const response = await api.post<Message[]>(`/${agentId}/message`, {
      text: content,
    });
    return response.data;
  },

  getChatList: async (): Promise<Chat[]> => {
    const response = await api.get<{ chats: Chat[] }>('/chat/list');
    return response.data.chats;
  },

  createChat: async (initialMessage: string): Promise<Chat> => {
    const response = await api.post('/chat', { message: initialMessage });
    return response.data.data;
  },

  deleteChat: async (chatId: string): Promise<void> => {
    await api.delete(`/chat/${chatId}`);
  },

  getChatMessages: async (chatId: string): Promise<Message[]> => {
    const response = await api.get(`/chat/${chatId}/messages`);
    return response.data.data;
  },
};
