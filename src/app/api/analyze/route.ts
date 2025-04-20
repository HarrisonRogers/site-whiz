import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { SYSTEM_MESSAGE } from '@/lib/system-message';
import { Message } from '@/app/chat';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const { imageFile, messages } = await req.json();

  const systemMessage: OpenAI.ChatCompletionSystemMessageParam = {
    role: 'system',
    content: SYSTEM_MESSAGE,
  };

  const userMessage: OpenAI.ChatCompletionUserMessageParam = {
    role: 'user',
    content: [
      {
        type: 'text',
        text: messages.map((message: Message) => message.content).join('\n'),
      },
      {
        type: 'image_url',
        image_url: {
          url: `data:image/png;base64,${imageFile}`,
        },
      },
    ],
  };

  const response = await openai.chat.completions.create({
    model: 'gpt-4.1-mini',
    messages: [systemMessage, userMessage],
    max_tokens: 1000,
  });

  return NextResponse.json({
    content: response.choices[0].message.content,
  });
}
