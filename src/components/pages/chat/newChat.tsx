import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Tooltip } from '@/components/ui/tooltip';
import { Message, UIMessage } from 'ai';
import React from 'react';
import { FaEdit } from 'react-icons/fa';

type NewChatProps = {
  setChatMessages: (
    messages: Message[] | ((messages: Message[]) => Message[])
  ) => void;
  setMessages: React.Dispatch<React.SetStateAction<UIMessage[]>>;
  disabled: boolean;
};

function NewChat({ setChatMessages, setMessages, disabled }: NewChatProps) {
  const handleNewChat = () => {
    setChatMessages([]);
    setMessages([]);
  };

  return (
    <Tooltip
      toolTipContent={disabled ? 'Wait till chat completes' : 'New chat'}
    >
      <Button
        type="button"
        className={cn(
          'rounded-full p-3 dark:border-neutral-300 border-neutral-700 bg-transparent hover:bg-transparent hover:opacity-80 transition-opacity',
          disabled && 'opacity-50 hover:cursor-not-allowed'
        )}
        variant="outline"
        onClick={handleNewChat}
      >
        <FaEdit className="translate-x-0.5 -translate-y-[1px]" />
      </Button>
    </Tooltip>
  );
}

export default NewChat;
