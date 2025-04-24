import React from 'react';
import { Skeleton } from '../ui/skeleton';

function ChatPageSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-3">
      <div className="flex flex-col w-2/3 gap-4 mx-auto">
        <Skeleton className="h-[50px] w-1/2 self-center rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-30" />
        </div>
      </div>
    </div>
  );
}

export default ChatPageSkeleton;
