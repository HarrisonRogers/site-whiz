'use client';

import React from 'react';
import LogoWhite from '../../public/logo-white.svg';
import LogoDark from '../../public/logo.svg';
import Image, { ImageProps } from 'next/image';

import { cn } from '@/lib/utils';

type LogoProps = Omit<ImageProps, 'src' | 'alt'>;

function Logo({ className, ...props }: LogoProps) {
  return (
    <>
      <Image
        src={LogoDark}
        alt="Site Whiz logo"
        width={32}
        height={32}
        className={cn('absolute top-2 left-4 size-10 dark:hidden', className)}
        {...props}
      />
      <Image
        src={LogoWhite}
        alt="Site Whiz logo"
        width={32}
        height={32}
        className={cn(
          'absolute top-2 left-4 size-10 dark:block hidden',
          className
        )}
        {...props}
      />
    </>
  );
}

export default Logo;
