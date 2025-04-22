import React from 'react';
import { TooltipRoot } from './root';
import { TooltipContent, type TooltipContentProps } from './content';
import { TooltipProvider } from './provider';
import { TooltipTrigger } from './trigger';

type TooltipProps = TooltipContentProps & {
  children: React.ReactNode;
  toolTipContent: React.ReactNode;
};

function Tooltip({ children, toolTipContent, ...props }: TooltipProps) {
  return (
    <TooltipProvider>
      <TooltipRoot>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent {...props}>{toolTipContent}</TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  );
}

export default Tooltip;
