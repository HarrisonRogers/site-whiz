'use client';

import React, { useEffect, useState } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '../ui/label';
import Image from 'next/image';
import { Card } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import FormError from '../formError';
import analyze from '@/data/api/analyze';
import { OpenAI } from 'openai';
import AddImageFileButton from './addImageFileButton';

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
};

function UploadForm({ messages, setMessages, setIsLoading }: UploadFormProps) {
  const [preview, setPreview] = useState<string | null>(null);

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
    formState: { errors, isSubmitting, isValid },
  } = form;

  // set loading state to true when form is submitting
  useEffect(() => {
    setIsLoading(isSubmitting);
  }, [isSubmitting, setIsLoading]);

  const onSubmit = async (data: formData) => {
    console.log(data);
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
    <Card className="flex flex-col gap-4 sticky bottom-10 p-4 bg-stone-200">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <AddImageFileButton handleFileChange={handleFileChange} />
          {preview && (
            <Card className="p-4 mt-3 flex justify-center items-center">
              <Image
                src={preview}
                alt={
                  preview.includes('pdf-icon')
                    ? 'PDF document'
                    : 'preview of uploaded image'
                }
                width={400}
                height={800}
                className="object-contain max-h-[300px]"
              />
              {preview.includes('pdf-icon') && (
                <p className="mt-2 text-sm text-gray-500">PDF Document</p>
              )}
            </Card>
          )}
          {errors.file && <FormError errorMessage={errors.file.message} />}
        </div>
        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder={placeHolderMessage}
            {...form.register('message')}
          />
          {errors.message && (
            <FormError errorMessage={errors.message.message} />
          )}
        </div>
        <Button type="submit" disabled={!isValid || isSubmitting}>
          {isSubmitting ? 'Generating...' : 'Generate'}
        </Button>
      </form>
    </Card>
  );
}

export default UploadForm;
