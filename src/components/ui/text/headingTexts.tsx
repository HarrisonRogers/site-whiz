import { cn } from '@/lib/utils';
import React, { HTMLAttributes } from 'react';

type HeadingTextsProps = HTMLAttributes<HTMLSpanElement> & {
  text: string;
};

function HeadingTexts({ text, className, ...props }: HeadingTextsProps) {
  return (
    <span
      className={cn(
        'text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500 leading-tight',
        className
      )}
      {...props}
    >
      {text}
    </span>
  );
}

export default HeadingTexts;
