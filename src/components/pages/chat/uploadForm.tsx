'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import CardImage from './cardImage';
import useAutoResizeTextArea from '@/hooks/useAutoResizeTextArea';
import { useChat } from '@ai-sdk/react';
import { UIMessage } from 'ai';
import AddImageFileButton from './addImageFileButton';
import NewChat from './newChat';

type UploadFormProps = {
  messages: UIMessage[];
  setMessages: React.Dispatch<React.SetStateAction<UIMessage[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
};

function UploadForm({
  messages: previousMessages,
  setMessages,
  setIsLoading,
  setErrorMessage,
  className,
}: UploadFormProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<FileList | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    status,
    setMessages: setChatMessages,
  } = useChat({
    initialMessages: previousMessages,
    onError: (error) => {
      console.error(error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'An error occurred, Please try again later'
      );
      setIsLoading(false);
    },
  });

  const loading = status === 'submitted' || status === 'streaming';

  useEffect(() => {
    // Update the parent component's messages state when local messages change
    setMessages(messages);
  }, [messages, setMessages]);

  useEffect(() => {
    // Update loading state based on status
    if (status === 'submitted') {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [status, setIsLoading]);

  // Use auto-resize for textarea
  useAutoResizeTextArea(textAreaRef.current, input || '');

  const handleCloseImage = () => {
    setPreview(null);
    setImageFile(undefined);
    // Reset the file input element
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Log the image file details for debugging
      if (imageFile) {
        handleSubmit(e, {
          experimental_attachments: imageFile,
        });
      } else {
        handleSubmit(e);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage(
        error instanceof Error ? error.message : 'Unknown error occurred'
      );
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      setImageFile(files);
      setPreview(URL.createObjectURL(files[0]));
    }
  };

  // Handle keyboard shortcuts in textarea
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Check if Enter key is pressed without Shift
    if (e.key === 'Enter' && !e.shiftKey) {
      // Prevent the default behavior (adding a new line)
      e.preventDefault();

      // Only submit if there's text to send (same logic as the Submit button)
      if (input.trim()) {
        // Create a synthetic form event to trigger submission
        const form = e.currentTarget.form;
        if (form) {
          const syntheticEvent = new Event('submit', {
            bubbles: true,
            cancelable: true,
          });
          form.dispatchEvent(syntheticEvent);
        }
      }
    }
    // If Shift + Enter, allow default behavior (new line)
    // No need to handle this case explicitly - it's the default behavior
  };

  return (
    <div
      className={cn(
        'flex flex-col w-full md:w-3xl self-center gap-4 bottom-4 p-4 bg-transparent',
        messages.length > 0 ? 'fixed' : 'relative'
      )}
    >
      <Card
        className={cn(
          'flex flex-col w-full md:w-3xl self-center gap-4 sticky bottom-10 p-4 ',
          className
        )}
      >
        <form onSubmit={handleFormSubmit}>
          {preview && (
            <CardImage preview={preview} onClose={handleCloseImage} />
          )}
          <div>
            <Textarea
              id="message"
              placeholder="Enter your message here..."
              rows={1}
              value={input}
              onChange={handleInputChange}
              ref={textAreaRef}
              className="bg-transparent md:text-md active:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 border-none min-h-8 md:min-h-10 max-h-52 overflow-auto resize-none px-0"
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="flex justify-between mt-3">
            <div className="flex gap-2">
              <AddImageFileButton
                disabled={(imageFile && imageFile.length > 0) || false}
                handleFileChange={handleFileChange}
                ref={fileInputRef}
              />
              <NewChat
                setChatMessages={setChatMessages}
                setMessages={setMessages}
                disabled={loading}
              />
            </div>
            <Button type="submit" disabled={loading || !input.trim()}>
              {loading ? 'Sending...' : 'Send'}
            </Button>
          </div>
        </form>
      </Card>
      <small className="text-center text-gray-500 dark:text-gray-400">
        Sometimes Whiz may get it wrong. If you have any feedback, please let me
        know.
      </small>
    </div>
  );
}

export default UploadForm;
