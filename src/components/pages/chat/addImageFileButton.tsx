import React, { forwardRef } from 'react';
import { Label } from '../../ui/label';
import { Button } from '../../ui/button';
import { FaPlus } from 'react-icons/fa';
import { Input } from '../../ui/input';
import Tooltip from '../../ui/tooltip/tooltip';
import { cn } from '@/lib/utils';

type AddImageFileButtonProps = {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
};

const AddImageFileButton = forwardRef<
  HTMLInputElement,
  AddImageFileButtonProps
>(({ handleFileChange, disabled }, ref) => {
  return (
    <Tooltip
      toolTipContent={
        disabled ? 'Only one image at a time' : 'Upload an image or PDF'
      }
    >
      <Button
        asChild
        className={cn(
          'rounded-full p-3 dark:border-neutral-300 border-neutral-700 bg-transparent hover:bg-transparent hover:opacity-80 transition-opacity',
          disabled && 'opacity-50 hover:cursor-not-allowed'
        )}
        variant="outline"
      >
        <Label>
          <FaPlus />
          <Input
            disabled={disabled}
            className="w-full hidden"
            id="file"
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            ref={ref}
          />
        </Label>
      </Button>
    </Tooltip>
  );
});

AddImageFileButton.displayName = 'AddImageFileButton';

export default AddImageFileButton;
