import { Card } from '@/components/ui/card';
import { forwardRef } from 'react';
import OpenAI from 'openai';
import { Markdown } from '@/lib/markdown';
import { PropagateLoader } from 'react-spinners';

type OutputProps = {
  messages: OpenAI.ChatCompletionMessageParam[];
  isLoading: boolean;
};

const Output = forwardRef<HTMLDivElement, OutputProps>(function Output(
  { messages, isLoading },
  ref
) {
  return (
    <Card className="min-h-[80vh] max-h-[80vh] overflow-y-auto p-4">
      {/* Output */}
      {messages.map((message, index) => {
        if (typeof message.content === 'string') {
          if (message.role === 'assistant') {
            return (
              <div key={index} className="mb-3 text-left">
                <div className="inline-block rounded-lg p-3 max-w-[80%]">
                  <Markdown>{message.content}</Markdown>
                </div>
              </div>
            );
          } else if (message.role === 'user') {
            return (
              <div key={index} className="mb-3 text-right">
                <div className="inline-block bg-gray-200 rounded-lg p-3 max-w-[70%]">
                  <Markdown>{message.content}</Markdown>
                </div>
              </div>
            );
          }
        }
        return null;
      })}

      {isLoading && (
        <PropagateLoader
          color="#000"
          speedMultiplier={0.7}
          className="ml-25 mt-10"
        />
      )}
      <div ref={ref} />
    </Card>
  );
});

export default Output;
