import React from 'react';
import Link from 'next/link';
import Separator from '@/components/ui/separator';
function Footer() {
  return (
    <div className="w-full pb-10">
      <div className="container mx-auto">
        <Separator />
        <p className="text-center text-gray-500 dark:text-gray-400 my-3">
          &copy; {new Date().getFullYear()} Site Whiz. All rights reserved.
        </p>

        <p className="text-center text-gray-500 dark:text-gray-400">
          View source code on{' '}
          <Link
            href="https://github.com/HarrisonRogers/site-whiz"
            target="_blank"
            className="underline underline-offset-2 hover:no-underline"
          >
            GitHub
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Footer;
