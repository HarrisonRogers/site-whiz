import { convertToBase64 } from '@/lib/utils';
import { OpenAI } from 'openai';

export default async function analyze(
  imageFile: File,
  messages: OpenAI.ChatCompletionMessageParam[]
) {
  const base64Image = await convertToBase64(imageFile);

  const response = await fetch('/api/analyze', {
    method: 'POST',
    body: JSON.stringify({ imageFile: base64Image, messages }),
  });

  return response.json();
}
