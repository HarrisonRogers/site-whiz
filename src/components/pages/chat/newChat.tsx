import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Tooltip } from '@/components/ui/tooltip';
import { UIMessage } from 'ai';
import React from 'react';
import { FaPlus } from 'react-icons/fa';

type NewChatProps = {
  setChatMessages: React.Dispatch<React.SetStateAction<UIMessage[]>>;
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
      toolTipContent={
        disabled ? 'Only one image at a time' : 'Upload an image or PDF'
      }
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
        <FaPlus />
      </Button>
    </Tooltip>
  );
}

export default NewChat;
