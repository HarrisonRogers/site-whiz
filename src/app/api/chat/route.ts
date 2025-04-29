import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { SYSTEM_MESSAGE } from '@/lib/system-message';
import { Message } from '@/components/pages/chat/chat';
import { openAiKey } from '@/lib/openAiKey';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const systemMessage: OpenAI.ChatCompletionSystemMessageParam = {
    role: 'system',
    content: SYSTEM_MESSAGE,
  };

  const conversationMessages: Array<OpenAI.ChatCompletionMessageParam> = [
    systemMessage,
  ];

  messages.forEach((message: Message) => {
    if (typeof message.content === 'string') {
      conversationMessages.push({
        role: message.role,
        content: message.content,
      });
    }
  });

  const response = await openAiKey.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: conversationMessages,
    max_tokens: 1000,
  });

  return NextResponse.json({
    content: response.choices[0].message.content,
  });
}
