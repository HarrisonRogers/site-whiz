'use client';

import React, { useEffect, useRef, useState } from 'react';
import Output from './output';
import UploadForm from './uploadForm';
import { OpenAI } from 'openai';
type Role = 'user' | 'assistant';

export type Message = {
  role: Role;
  content: string;
};

function Chat() {
  const [messages, setMessages] = useState<OpenAI.ChatCompletionMessageParam[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  });

  return (
    <div className="relative flex flex-col w-2/3 gap-4 mx-auto">
      <h1 className="text-4xl font-bold text-center mb-5">
        Analyze your site with a few clicks
      </h1>

      {/* Output */}
      {messages.length > 0 && (
        <Output
          messages={messages}
          setMessages={setMessages}
          ref={messagesEndRef}
          isLoading={isLoading}
        />
      )}
      {/* Input */}
      <UploadForm
        messages={messages}
        setMessages={setMessages}
        setIsLoading={setIsLoading}
      />
    </div>
  );
}

export default Chat;
