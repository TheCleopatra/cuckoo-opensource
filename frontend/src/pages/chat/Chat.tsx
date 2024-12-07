import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChatInput } from './components/ChatInput';
import { ChatHistory } from './components/ChatHistory';
import { useChatStore } from '~/stores/chatStore';
import CuckooGreeting from '~/components/common/CuckooGreeting';
import HappyAnimationPanel from '../../components/HappyAnimationPanel';
import ClickableText from '~/components/ClickableText';
import UserGreeting from '~/components/common/UserGreeting';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { chatApi } from '~/api/chat';

const Chat: React.FC = () => {
  const { messages, addMessage, currentMessageOfUser, setCurrentMessageOfUser, currentMessageOfCuckoo, setCurrentMessageOfCuckoo } =
    useChatStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const from = searchParams.get('from');
  const [lectureTxHash, setLectureTxHash] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [displayedText, setDisplayedText] = useState<string>('');
  const typingSpeed = 50; // 打字速度，单位为毫秒
  const [isLoading, setIsLoading] = useState(false); // 新增状态
  const [loadingText, setLoadingText] = useState<string>('.'); // 初始化为六个空格
  let loadingInterval: NodeJS.Timeout;
  let interval: NodeJS.Timeout;

  const handleSendMessage = async (message: string) => {
    try {
      addMessage([
        {
          user: 'user',
          text: message,
          action: 'NONE',
        },
      ]);
      setCurrentMessageOfUser({
        user: 'user',
        text: message,
        action: 'NONE',
      });
      setIsLoading(true); // 开始加载状态

      // 开始循环更新 loadingText
      let dotCount = 0;
      loadingInterval = setInterval(() => {
        dotCount = (dotCount + 1) % 7; // 循环 0 到 6
        setLoadingText('.'.padEnd(dotCount, '.') + ' '.repeat(6 - dotCount)); // 更新 loadingText
      }, 500); // 每 500 毫秒更新一次

      const response = await chatApi.sendMessage(from === 'lecture' ? `${message}[SYSTEM: Please use LECTURE action]` : message);
      const hash = response.find(message => message.lectureReward)?.lectureTxHash;
      const filteredResponse = response.filter(message => !message.inReplyTo && !message.lectureReward);

      addMessage(filteredResponse);
      setCurrentMessageOfCuckoo({
        user: 'cuckoo',
        text: filteredResponse[0].text,
        action: filteredResponse[0].action,
      });

      if (hash && hash.length > 0) {
        setLectureTxHash(hash);
      } else {
        setLectureTxHash(null);
        navigate(`/home/chat?from=false`);
      }
    } catch (error) {
      console.log('发送消息失败', error);
    } finally {
      setIsLoading(false); // 结束加载状态
      clearInterval(loadingInterval); // 清除 loadingInterval
      setLoadingText('      '); // 重置为六个空格
    }
  };

  const handleToggleHistory = () => {
    setShowHistory(!showHistory);
  };

  const handleCloseAnimationPanel = () => {
    setLectureTxHash(null);
  };

  const typeText = (text: string) => {
    setDisplayedText(''); // 清空当前显示的文本
    let index = -1;

    interval = setInterval(() => {
      if (index < text.length - 1) {
        index++;
        setDisplayedText(prev => prev + text[index]);
      } else {
        clearInterval(interval);
      }
    }, typingSpeed);
  };

  useEffect(() => {
    const text = searchParams.get('text');
    if (text && text.length > 0) {
      handleSendMessage(text);
      searchParams.delete('text');
      navigate(`/home/chat`);
    }
  }, [searchParams]);

  useEffect(() => {
    if (currentMessageOfCuckoo.text) {
      typeText(currentMessageOfCuckoo.text);
    }

    return () => {
      clearInterval(interval);
    };
  }, [currentMessageOfCuckoo.text]);

  const temp = <span>Hello, I'm Cuckoo, your best friend in web3 world</span>;

  if (showHistory) {
    return (
      <>
        <div className="flex justify-start items-center mt-4 ml-4">
          <div
            onClick={handleToggleHistory}
            className="cursor-pointer bg-transparent box-border text-gray-500 hover:text-gray-800 flex items-center"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            <span>back</span>
          </div>
        </div>
        <ChatHistory messages={messages} />
        <div
          onClick={handleToggleHistory}
          className="cursor-pointer bg-transparent box-border text-gray-500 hover:text-gray-800 flex items-center ml-4 mb-4"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          <span>back</span>
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col items-between h-full">
      <div className="overflow-auto" style={{ height: 'calc(100% - 80px)' }}>
        {messages.length > 2 && (
          <div
            onClick={handleToggleHistory}
            className="cursor-pointer bg-transparent flex items-center justify-end mt-4 mr-4 text-gray-500 hover:text-gray-800"
          >
            <span>show history</span>
            <ArrowRightIcon className="w-4 h-4 ml-2" />
          </div>
        )}
        <div className="p-4 bg-gray-100">
          <CuckooGreeting>
            {isLoading ? loadingText : displayedText || temp} {/* 根据加载状态显示内容 */}
          </CuckooGreeting>
        </div>
        {currentMessageOfUser.text && (
          <div className="p-4 bg-gray-100">
            <UserGreeting>{currentMessageOfUser.text || 'hello!'}</UserGreeting>
          </div>
        )}
      </div>

      {/* {!showHistory && ( */}
      <div className="absolute bottom-[80px] w-full box-border">
        <div className="flex space-x-2 px-2 py-1 shrink-0 text-xs">
          <a className="bg-white p-1 cursor-pointer hover:text-blue-600 border border-gray-300 rounded">
            <ClickableText text="Begin my onboarding tutorial" />
          </a>
          <a className="bg-white p-1 cursor-pointer hover:text-blue-600 border border-gray-300 rounded">
            <ClickableText text="Help me buy 10 SOL at a price of 130" />
          </a>
        </div>
        <div className="flex space-x-2 px-2 py-1 shrink-0 text-xs">
          <a className="bg-white p-1 cursor-pointer hover:text-blue-600 border border-gray-300 rounded">
            <ClickableText text="Any interesting news?" />
          </a>
          <a className="bg-white p-1 cursor-pointer hover:text-blue-600 border border-gray-300 rounded">
            <ClickableText text="What's the latest market trend?" />
          </a>
        </div>
      </div>
      {/* )} */}
      <div className="absolute bottom-0 w-full h-[80px]">
        <ChatInput onSend={handleSendMessage} />
      </div>
      {lectureTxHash && <HappyAnimationPanel lectureTxHash={lectureTxHash} onClose={handleCloseAnimationPanel} />}
    </div>
  );
};

export default Chat;
