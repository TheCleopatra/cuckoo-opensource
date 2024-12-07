import { useState, useEffect } from 'react';
import { chatApi } from '~/api/chat';
import { Chat } from '~/types/chat';
import { useChatStore } from '~/stores/chatStore';

export function ChatList() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const { setMessages } = useChatStore();

  useEffect(() => {
    loadChats();
  }, []);

  const loadChats = async () => {
    try {
      const data = await chatApi.getChatList();
      setChats(data);
    } catch (error) {
      console.error('加载对话列表失败:', error);
    }
  };

  const handleChatClick = async (chatId: string) => {
    try {
      setSelectedChatId(chatId);

      // 加载对话消息
      const messages = await chatApi.getChatMessages(chatId);
      setMessages(messages);
    } catch (error) {
      console.error('加载对话消息失败:', error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* 对话列表 */}
      <div className="flex-1 overflow-y-auto">
        {chats?.map(chat => (
          <div
            key={chat.id}
            onClick={() => handleChatClick(chat.id)}
            className={`px-4 py-3 hover:bg-gray-100 cursor-pointer ${selectedChatId === chat.id ? 'bg-gray-100' : ''}`}
          >
            <h3 className="text-sm font-medium text-gray-900 truncate">{chat.title}</h3>
            <span className="text-xs text-gray-500">{new Date(chat.updatedAt).toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
