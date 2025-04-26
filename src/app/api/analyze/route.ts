import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { SYSTEM_MESSAGE } from '@/lib/system-message';
import { Message } from '@/components/pages/chat/chat';
import { openAiKey } from '@/lib/openAiKey';

export async function POST(req: NextRequest) {
  const { imageFile, messages } = await req.json();

  const systemMessage: OpenAI.ChatCompletionSystemMessageParam = {
    role: 'system',
    content: SYSTEM_MESSAGE,
  };

  // Create a proper conversation history from all previous messages
  const conversationMessages: Array<OpenAI.ChatCompletionMessageParam> = [
    systemMessage,
  ];

  // Add all previous messages to maintain conversation context
  messages.forEach((message: Message) => {
    if (typeof message.content === 'string') {
      if (message.role === 'user') {
        conversationMessages.push({
          role: 'user',
          content: message.content,
        });
      } else if (message.role === 'assistant') {
        conversationMessages.push({
          role: 'assistant',
          content: message.content,
        });
      }
    }
  });

  // Add the current message with image if provided
  if (imageFile) {
    const lastMessage: OpenAI.ChatCompletionUserMessageParam = {
      role: 'user',
      content: [
        {
          type: 'text',
          text: messages[messages.length - 1].content,
        },
        {
          type: 'image_url',
          image_url: {
            url: `data:image/png;base64,${imageFile}`,
          },
        },
      ],
    };

    // Replace the last message with one that includes the image
    conversationMessages.push(lastMessage);
  }

  const response = await openAiKey.chat.completions.create({
    model: 'gpt-4.1-mini',
    messages: conversationMessages,
    max_tokens: 1000,
  });

  return NextResponse.json({
    content: response.choices[0].message.content,
  });
}
