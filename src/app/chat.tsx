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

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  });

  return (
    <div className="grid grid-cols-2 gap-4 mt-10">
      {/* Input */}
      <UploadForm messages={messages} setMessages={setMessages} />
      {/* Output */}
      <Output messages={messages} ref={messagesEndRef} />
    </div>
  );
}

export default Chat;
