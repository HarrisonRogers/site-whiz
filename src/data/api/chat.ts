import { OpenAI } from 'openai';

export default async function chat(
  messages: OpenAI.ChatCompletionMessageParam[]
) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) {
    throw new Error('Sorry, something went wrong, Please try again later');
  }

  return response.json();
}
