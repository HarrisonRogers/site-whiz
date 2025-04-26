import OpenAI from 'openai';

export const openAiKey = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
