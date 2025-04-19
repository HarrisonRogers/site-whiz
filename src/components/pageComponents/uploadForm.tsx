'use client';

import React, { useState } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import Image from 'next/image';
import { Card } from '../ui/card';
import { Textarea } from '../ui/textarea';

const placeHolderMessage =
  'Enter your message here. This will be used to generate a report for the construction site.';

const formSchema = z.object({
  file: z.instanceof(File).refine((file) => file.type.startsWith('image/'), {
    message: 'File must be an image (JPEG, PNG, etc.)',
  }),
  message: z.string().min(1, {
    message: 'Message is required',
  }),
});

type formData = z.infer<typeof formSchema>;

function UploadForm() {
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<formData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: undefined,
      message: '',
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = form;

  const onSubmit = (data: formData) => {
    console.log(data);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      form.setValue('file', file);
    } else {
      setPreview(null);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <Label htmlFor="file">Upload a file</Label>
        <Input id="file" type="file" onChange={handleFileChange} />
        {preview && (
          <Card className="p-4 mt-3 flex justify-center items-center">
            <Image
              src={preview}
              alt="preview of uploaded image"
              width={400}
              height={800}
              className="object-cover"
            />
          </Card>
        )}
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder={placeHolderMessage}
          {...form.register('message')}
        />
      </div>
    </form>
  );
}

export default UploadForm;
