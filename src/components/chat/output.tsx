import { forwardRef } from 'react';
import OpenAI from 'openai';
import { Markdown } from '@/lib/markdown';
import { PropagateLoader } from 'react-spinners';
import { Button } from '@/components/ui/button';
import { FaEdit } from 'react-icons/fa';
import { cn } from '@/lib/utils';

type OutputProps = {
  setMessages: React.Dispatch<
    React.SetStateAction<OpenAI.ChatCompletionMessageParam[]>
  >;
  messages: OpenAI.ChatCompletionMessageParam[];
  isLoading: boolean;
  className?: string;
};

const Output = forwardRef<HTMLDivElement, OutputProps>(function Output(
  { messages, setMessages, isLoading, className },
  ref
) {
  return (
    <div
      className={cn(
        'min-h-[20vh] mx-auto overflow-y-auto  flex flex-col',
        className
      )}
    >
      {/* Output */}
      {messages.map((message, index) => {
        if (typeof message.content === 'string') {
          if (message.role === 'assistant') {
            return (
              <div key={index} className="mb-3 text-left">
                <div className="inline-block rounded-lg py-3 max-w-[80%]">
                  <Markdown>{message.content}</Markdown>
                </div>
              </div>
            );
          } else if (message.role === 'user') {
            return (
              <div key={index} className="mb-3 mt-10 text-right" ref={ref}>
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
        <div className="mb-30 ml-25 mt-10">
          <PropagateLoader color="#000" speedMultiplier={0.7} />
        </div>
      )}
      {messages.length > 1 && !isLoading && (
        <Button
          onClick={() => setMessages([])}
          variant="default"
          className="self-center mt-5 mb-10 sticky"
        >
          New Chat <FaEdit />
        </Button>
      )}
    </div>
  );
});

export default Output;
