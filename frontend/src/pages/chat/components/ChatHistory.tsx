import React, { useRef, useEffect, useCallback } from 'react';
import { ChatMessage } from './ChatMessage';
import { Message } from '~/types/chat';
import { debounce } from 'lodash'; 
import styles from './ChatHistory.module.css';

interface ChatHistoryProps {
  messages: Message[];
  loading?: boolean;
  className?: string;
}

export const ChatHistory: React.FC<ChatHistoryProps> = ({ messages, loading = false, className = '' }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = React.useState(true);

  // 滚动到底部
  const scrollToBottom = useCallback(() => {
    if (autoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [autoScroll]);

  // 处理滚动事件
  const handleScroll = debounce(() => {
    if (!containerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    // 如果用户向上滚动超过 100px，则禁用自动滚动
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    setAutoScroll(isNearBottom);
  }, 100);

  // 监听新消息
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // 监听加载状态
  useEffect(() => {
    if (!loading) {
      scrollToBottom();
    }
  }, [loading, scrollToBottom]);

  // 如果没有消息，显示欢迎信息
  if (messages.length === 0) {
    return <div className="flex flex-1 items-center justify-center text-gray-500"></div>;
  }

  return (
    <div ref={containerRef} onScroll={handleScroll} className={`flex-1 overflow-y-auto p-4 space-y-4 ${className}`}>
      {/* 如果消息较多，可以添加"回到顶部"按钮 */}
      {messages.length > 10 && !autoScroll && (
        <button
          onClick={() => containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-20 right-4 bg-blue-500 text-white rounded-full p-2 shadow-lg hover:bg-blue-600 transition-colors"
          title="回到顶部"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      {/* 消息列表 */}
      {messages.map((message, index) => (
        <ChatMessage key={`${message.user}-${index}-${message.action}`} text={message.text} user={message.user} action={message.action} />
      ))}

      {/* 加载状态指示器 */}
      {loading && (
        <div className="flex justify-start animate-fade-in">
          <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-[80%]">
            <div className="flex space-x-2">
              <div className={styles.loadingDot} />
              <div className={styles.loadingDot} />
              <div className={styles.loadingDot} />
            </div>
          </div>
        </div>
      )}

      {/* 新消息提示 */}
      {!autoScroll && messages.length > 0 && (
        <button
          onClick={() => {
            setAutoScroll(true);
            scrollToBottom();
          }}
          className="fixed bottom-20 right-4 bg-blue-500 text-white rounded-full px-4 py-2 shadow-lg hover:bg-blue-600 transition-colors"
        >
          查看新消息
        </button>
      )}

      {/* 用于自动滚动的空白元素 */}
      <div ref={messagesEndRef} className="h-0" />
    </div>
  );
};
