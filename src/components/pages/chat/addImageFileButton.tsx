import React, { forwardRef } from 'react';
import { Label } from '../../ui/label';
import { Button } from '../../ui/button';
import { FaPlus } from 'react-icons/fa';
import { Input } from '../../ui/input';
import Tooltip from '../../ui/tooltip/tooltip';
import { UseFormRegister } from 'react-hook-form';
type AddImageFileButtonProps = {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register: UseFormRegister<{ file: File; message?: string | undefined }>;
};

const AddImageFileButton = forwardRef<
  HTMLInputElement,
  AddImageFileButtonProps
>(({ handleFileChange, register }, ref) => {
  return (
    <Tooltip toolTipContent={'Upload an image or PDF'}>
      <Button
        asChild
        className="rounded-full p-3 dark:border-neutral-300 border-neutral-700 bg-transparent hover:bg-transparent"
        variant="outline"
      >
        <Label>
          <FaPlus />
          <Input
            className="w-full hidden"
            id="file"
            type="file"
            {...register('file')}
            onChange={handleFileChange}
            accept="image/*,application/pdf"
            ref={ref}
          />
        </Label>
      </Button>
    </Tooltip>
  );
});

AddImageFileButton.displayName = 'AddImageFileButton';

export default AddImageFileButton;
