'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card } from '../../ui/card';
import { Textarea } from '../../ui/textarea';
import { Button } from '../../ui/button';
import { cn } from '@/lib/utils';
import CardImage from './cardImage';
import useAutoResizeTextArea from '@/hooks/useAutoResizeTextArea';
import { FaEdit } from 'react-icons/fa';
import { useChat } from '@ai-sdk/react';
import { UIMessage } from 'ai';
import AddImageFileButton from './addImageFileButton';

type UploadFormProps = {
  messages: UIMessage[];
  setMessages: React.Dispatch<React.SetStateAction<UIMessage[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
};

function UploadForm({
  messages: initialMessages,
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
    api: '/api/vercel-chat',
    initialMessages,
    onError: (error) => {
      console.error(error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'An error occurred, Please try again later'
      );
      setIsLoading(false);
    },
    onFinish: () => {
      setImageFile(undefined);
      setPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
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
      // Convert to a more compatible format if needed
      const file = files[0];

      // Create a new image from the file to normalize the format
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          canvas.toBlob((blob) => {
            if (blob) {
              const normalizedFile = new File([blob], file.name, {
                type: 'image/png',
              });

              // Create a new FileList-like object
              const dataTransfer = new DataTransfer();
              dataTransfer.items.add(normalizedFile);
              const normalizedFileList = dataTransfer.files;

              setImageFile(normalizedFileList);
              setPreview(URL.createObjectURL(normalizedFile));
            }
          }, 'image/png');
        }
      };
      img.src = URL.createObjectURL(file);
    }
  };

  return (
    <div
      className={cn(
        'flex flex-col w-full md:w-3xl self-center gap-4 fixed bottom-4 p-4 ',
        messages.length > 0 ? 'fixed' : 'relative'
      )}
    >
      {messages.length > 2 && (
        <Button
          onClick={() => {
            setChatMessages([]);
            setMessages([]);
          }}
          variant="default"
          className="self-center mt-5 mb-0 sticky"
        >
          New Chat <FaEdit />
        </Button>
      )}

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
              className="bg-transparent active:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 border-none min-h-8 md:min-h-10 max-h-52 overflow-auto resize-none px-0"
            />
          </div>
          <div className="flex justify-between mt-3">
            <AddImageFileButton
              disabled={(imageFile && imageFile.length > 0) || false}
              handleFileChange={handleFileChange}
              ref={fileInputRef}
            />
            <Button type="submit" disabled={loading || !input.trim()}>
              {loading ? 'Generating...' : 'Generate'}
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
