import React from 'react';
import {
  DialogRoot,
  DialogContent,
  DialogTrigger,
  type DialogContentProps,
} from './index';

type DialogProps = DialogContentProps & {
  children: React.ReactNode;
  trigger: React.ReactNode;
};

function Dialog({ children, trigger, ...props }: DialogProps) {
  return (
    <DialogRoot>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent {...props}>{children}</DialogContent>
    </DialogRoot>
  );
}

export default Dialog;
