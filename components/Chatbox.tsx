import React, { useState, useEffect, useRef } from 'react';
import type { AnalysisResult, ChatMessage } from '../types';
import { getChatResponse } from '../services/geminiService';
import { BotIcon } from './icons/BotIcon';
import { UserIcon } from './icons/UserIcon';
import { SendIcon } from './icons/SendIcon';

interface ChatboxProps {
  context: AnalysisResult;
}

export const Chatbox: React.FC<ChatboxProps> = ({ context }) => {
  const getInitialMessage = () => {
    const { isHealthy, plantName, diseaseName } = context;
    if (isHealthy) {
      return `I've identified the leaf as belonging to a healthy ${plantName}. Do you have any general questions about caring for this plant?`;
    }
    return `The analysis suggests this ${plantName} leaf may have ${diseaseName}. I'm here to help. What would you like to know about this condition or its treatment?`;
  };

  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', content: getInitialMessage() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Prevent scrolling on the initial render.
    // Only scroll when new messages are added after the component has mounted.
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      scrollToBottom();
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getChatResponse(newMessages, context);
      setMessages([...newMessages, { role: 'model', content: response }]);
    } catch (error) {
      setMessages([...newMessages, { role: 'model', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-sm border border-emerald-200 overflow-hidden flex flex-col transition-all duration-500 animate-fade-in">
      <div className="p-4 border-b border-emerald-200">
        <h3 className="text-lg font-bold text-emerald-900 text-center">AI Plant Assistant</h3>
      </div>
      <div className="p-4 flex-grow h-80 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
            {msg.role === 'model' && (
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                <BotIcon className="w-5 h-5" />
              </div>
            )}
            <div className={`max-w-xs md:max-w-md p-3 rounded-lg ${msg.role === 'user' ? 'bg-emerald-600 text-white' : 'bg-lime-100 text-emerald-900'}`}>
              <p className="text-sm">{msg.content}</p>
            </div>
             {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-700 flex items-center justify-center flex-shrink-0">
                <UserIcon className="w-5 h-5" />
              </div>
            )}
          </div>
        ))}
         {isLoading && (
            <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                    <BotIcon className="w-5 h-5 animate-pulse" />
                </div>
                <div className="max-w-xs md:max-w-md p-3 rounded-lg bg-lime-100 text-emerald-900">
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-75"></div>
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-150"></div>
                    </div>
                </div>
            </div>
         )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-emerald-200 bg-white/50">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask a follow-up question..."
            className="flex-grow p-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            disabled={isLoading}
          />
          <button onClick={handleSend} disabled={isLoading} className="bg-emerald-600 text-white p-2 rounded-md hover:bg-emerald-700 disabled:bg-emerald-300 disabled:cursor-not-allowed transition-colors">
            <SendIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};