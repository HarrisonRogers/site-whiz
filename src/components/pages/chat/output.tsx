import { Markdown } from '@/lib/markdown';
import { cn } from '@/lib/utils';
import { UIMessage } from 'ai';
import LoadingText from '@/components/ui/loading/text';
import Image from 'next/image';

type OutputProps = {
  messages: UIMessage[];
  isLoading: boolean;
  className?: string;
};

const Output = ({ messages, isLoading, className }: OutputProps) => {
  console.log(messages);

  return (
    <div className={cn('min-h-[20vh] flex flex-col mb-30 w-full', className)}>
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
                {message.experimental_attachments && (
                  <div className="w-full flex justify-end mb-1">
                    <div className="p-1 w-fit rounded-lg border border-gray-400 block">
                      <Image
                        src={message.experimental_attachments[0].url}
                        alt="Image uploaded by user"
                        width={100}
                        height={100}
                        className="size-16 object-cover rounded-lg"
                      />
                    </div>
                  </div>
                )}
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
