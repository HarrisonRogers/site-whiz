import { forwardRef } from 'react';
import OpenAI from 'openai';
import { Markdown } from '@/lib/markdown';
import { PropagateLoader } from 'react-spinners';
import { cn } from '@/lib/utils';

type OutputProps = {
  messages: OpenAI.ChatCompletionMessageParam[];
  isLoading: boolean;
  className?: string;
  theme?: string;
};

const Output = forwardRef<HTMLDivElement, OutputProps>(function Output(
  { messages, isLoading, className, theme },
  ref
) {
  return (
    <div
      className={cn('min-h-[20vh] overflow-y-auto flex flex-col', className)}
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
                <div className="inline-block rounded-lg p-3 max-w-[70%] bg-neutral-200 dark:bg-neutral-700">
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
          <PropagateLoader
            color={theme === 'dark' ? '#fff' : '#000'}
            speedMultiplier={0.7}
          />
        </div>
      )}
    </div>
  );
});

export default Output;
