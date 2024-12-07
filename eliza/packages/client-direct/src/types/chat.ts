export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  createdAt: Date;
}

export interface Chat {
  id: string;
  title: string; // 对话的标题
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatHistory {
  chats: Chat[];
  total: number;
}
