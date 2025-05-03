'use client';

import React, { useEffect, useRef, useState } from 'react';
import Output from './output';
import UploadForm from './uploadForm';
import { cn } from '@/lib/utils';
import { UIMessage } from 'ai';

type Role = 'user' | 'assistant';

export type Message = {
  role: Role;
  content: string;
};

function Chat() {
  const [messages, setMessages] = useState<UIMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  });

  console.log(messages);

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
          />
        )}
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        {/* Input */}
        <UploadForm
          messages={messages}
          setMessages={setMessages}
          setIsLoading={setIsLoading}
          setErrorMessage={setErrorMessage}
        />
      </div>
    </section>
  );
}

export default Chat;
