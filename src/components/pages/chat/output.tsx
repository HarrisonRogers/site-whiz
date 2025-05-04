import { Markdown } from '@/lib/markdown';
import { cn } from '@/lib/utils';
import { UIMessage } from 'ai';
import LoadingText from '@/components/ui/loading/text';

type OutputProps = {
  messages: UIMessage[];
  isLoading: boolean;
  className?: string;
};

const Output = ({ messages, isLoading, className }: OutputProps) => {
  return (
    <div
      className={cn(
        'min-h-[20vh] max-h-[calc(90vh-150px)] overflow-y-auto flex flex-col',
        className
      )}
    >
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
              <div key={index} className="mb-3 mt-10 text-right">
                <div className="inline-block rounded-lg p-3 max-w-[70%] bg-neutral-300 dark:bg-neutral-700">
                  <Markdown>{message.content}</Markdown>
                </div>
              </div>
            );
          }
        }
        return null;
      })}

      {isLoading && (
        <div className="mb-30 mt-10">
          <LoadingText />
        </div>
      )}
    </div>
  );
};

export default Output;
