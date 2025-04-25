'use client';

import React, { useEffect, useState, useRef } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card } from '../../ui/card';
import { Textarea } from '../../ui/textarea';
import { Button } from '../../ui/button';
import analyze from '@/data/api/analyze';
import { OpenAI } from 'openai';
import AddImageFileButton from './addImageFileButton';
import { cn } from '@/lib/utils';
import CardImage from './cardImage';
import useAutoResizeTextArea from '@/hooks/useAutoResizeTextArea';

const placeHolderMessage =
  'Enter your message here. This will be used to generate a report for the construction site.';

const formSchema = z.object({
  file: z
    .instanceof(File)
    .refine(
      (file) =>
        file.type.startsWith('image/') || file.type === 'application/pdf',
      {
        message: 'File must be an image (JPEG, PNG, etc.) or a PDF',
      }
    ),
  message: z.string().min(1, {
    message: 'Message is required',
  }),
});

type formData = z.infer<typeof formSchema>;

type UploadFormProps = {
  messages: OpenAI.ChatCompletionMessageParam[];
  setMessages: React.Dispatch<
    React.SetStateAction<OpenAI.ChatCompletionMessageParam[]>
  >;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
};

function UploadForm({
  messages,
  setMessages,
  setIsLoading,
  className,
}: UploadFormProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const form = useForm<formData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: undefined,
      message: '',
    },
  });

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting, isValid },
  } = form;

  const message = watch('message');
  useAutoResizeTextArea(textAreaRef.current, message);

  // set loading state to true when form is submitting
  useEffect(() => {
    setIsLoading(isSubmitting);
  }, [isSubmitting, setIsLoading]);

  const onSubmit = async (data: formData) => {
    try {
      const userMessage: OpenAI.ChatCompletionUserMessageParam = {
        role: 'user',
        content: data.message,
      };

      // First update the UI with the new message
      setMessages((prev: OpenAI.ChatCompletionMessageParam[]) => [
        ...prev,
        userMessage,
      ]);

      // Then send all messages including the new one to the API
      const updatedMessages = [...messages, userMessage];
      const response = await analyze(data.file, updatedMessages);

      if (response.content) {
        setMessages((prev: OpenAI.ChatCompletionMessageParam[]) => [
          ...prev,
          { role: 'assistant', content: response.content },
        ]);
      }
      setIsLoading(false);
      setValue('message', '');
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleCloseImage = () => {
    setPreview(null);
    form.setValue('file', undefined as unknown as File);
    // Reset the file input element
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const imageUrl = URL.createObjectURL(file);
        setPreview(imageUrl);
      } else {
        setPreview(null);
      }
      form.setValue('file', file);
    } else {
      setPreview(null);
    }
  };

  return (
    <Card
      className={cn(
        'flex flex-col w-2/3 self-center gap-4 sticky bottom-10 p-4 bg-stone-200',
        className
      )}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {preview && <CardImage preview={preview} onClose={handleCloseImage} />}
        <div>
          <Textarea
            id="message"
            placeholder={placeHolderMessage}
            rows={1}
            {...form.register('message')}
            ref={(e) => {
              form.register('message').ref(e);
              textAreaRef.current = e;
            }}
            className="bg-transparent active:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 min-h-10 max-h-52 overflow-auto resize-none"
          />
        </div>
        <div className="flex justify-between mt-3">
          <AddImageFileButton
            handleFileChange={handleFileChange}
            ref={fileInputRef}
          />
          <Button type="submit" disabled={!isValid || isSubmitting}>
            {isSubmitting ? 'Generating...' : 'Generate'}
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default UploadForm;
