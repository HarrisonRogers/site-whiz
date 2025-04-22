import { Card } from '@/components/ui/card';
import { forwardRef } from 'react';
import OpenAI from 'openai';
import { Markdown } from '@/lib/markdown';
import { PropagateLoader } from 'react-spinners';
import { Button } from '@/components/ui/button';
import { FaEdit } from 'react-icons/fa';

type OutputProps = {
  setMessages: React.Dispatch<
    React.SetStateAction<OpenAI.ChatCompletionMessageParam[]>
  >;
  messages: OpenAI.ChatCompletionMessageParam[];
  isLoading: boolean;
};

const Output = forwardRef<HTMLDivElement, OutputProps>(function Output(
  { messages, setMessages, isLoading },
  ref
) {
  return (
    <Card className="min-h-[80vh] max-h-[80vh] overflow-y-auto p-4 flex flex-col">
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
              <div key={index} className="mb-3 text-right" ref={ref}>
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
      {messages.length > 1 && (
        <Button
          onClick={() => setMessages([])}
          variant="default"
          className="self-center mt-5 sticky bottom-0"
        >
          New Chat <FaEdit />
        </Button>
      )}
    </Card>
  );
});

export default Output;
