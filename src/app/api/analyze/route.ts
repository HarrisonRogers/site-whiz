import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { SYSTEM_MESSAGE } from '@/lib/system-message';
import fs from 'fs';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const { imageFile, messages } = await req.json();

  const image = fs.readFileSync(imageFile, 'base64');

  const messagesWithSystem = [
    { role: 'system', content: SYSTEM_MESSAGE },
    ...messages,
  ];

  const response = await openai.chat.completions.create({
    model: 'gpt-4.1-mini',
    messages: [
      {
        role: 'user',
        content: [
          ...messagesWithSystem,
          { type: 'image_url', url: `data:image/png;base64,${image}` },
        ],
      },
    ],
  });

  return NextResponse.json({
    content: response.choices[0].message.content,
  });
}
