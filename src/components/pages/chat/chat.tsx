'use client';

import React, { useEffect, useRef, useState } from 'react';
import Output from './output';
import UploadForm from './uploadForm';
import { OpenAI } from 'openai';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
type Role = 'user' | 'assistant';

export type Message = {
  role: Role;
  content: string;
};

function Chat() {
  const { theme } = useTheme();
  const [messages, setMessages] = useState<OpenAI.ChatCompletionMessageParam[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  });

  return (
    <section
      className={cn(
        'flex flex-col items-center justify-center h-[90vh]',
        messages.length > 0 && 'items-start justify-start'
      )}
    >
      <div className="relative flex flex-col w-full px-3 md:w-2/3 gap-4 mx-auto">
        {messages.length === 0 && (
          <h4 className="text-center text-base md:text-4xl">
            How can I help you today?
          </h4>
        )}

        {/* Output */}
        {messages.length > 0 && (
          <Output
            messages={messages}
            ref={messagesEndRef}
            isLoading={isLoading}
            theme={theme}
          />
        )}
        {/* Input */}
        <UploadForm
          messages={messages}
          setMessages={setMessages}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
        />
      </div>
    </section>
  );
}

export default Chat;
