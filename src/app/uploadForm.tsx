'use client';

import React, { useState } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import Image from 'next/image';
import { Card } from '../components/ui/card';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import FormError from '../components/formError';
import { Message } from './chat';

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
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
};

function UploadForm({ messages, setMessages }: UploadFormProps) {
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
    formState: { errors, isSubmitting, isValid },
  } = form;

  const onSubmit = (data: formData) => {
    const userMessage: Message = {
      role: 'user',
      content: data.message,
    };
    setMessages((prev: Message[]) => [...prev, userMessage]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <Label htmlFor="file">Upload a file</Label>
        <Input
          id="file"
          type="file"
          onChange={handleFileChange}
          accept="image/*,application/pdf"
        />
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
        {errors.message && <FormError errorMessage={errors.message.message} />}
      </div>
      <Button type="submit" disabled={!isValid || isSubmitting}>
        {isSubmitting ? 'Generating...' : 'Generate'}
      </Button>
    </form>
  );
}

export default UploadForm;
