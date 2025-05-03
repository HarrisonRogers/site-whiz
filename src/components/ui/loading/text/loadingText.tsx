'use client';

import React, { useEffect, useState } from 'react';
import { loadingWords } from '@/data/loadingWords';
import { cn } from '@/lib/utils';

type LoadingTextProps = {
  className?: string;
};

function LoadingText({ className }: LoadingTextProps) {
  const randomWords =
    loadingWords[Math.floor(Math.random() * loadingWords.length)];

  const [randomWord, setRandomWord] = useState(randomWords);

  useEffect(() => {
    const interval = setInterval(() => {
      setRandomWord(randomWords);
    }, 3000);

    return () => clearInterval(interval);
  }, [randomWords]);

  return (
    <p className={cn('animate-pulse text-xl', className)}>
      {`${randomWord}...`}
    </p>
  );
}

export default LoadingText;
