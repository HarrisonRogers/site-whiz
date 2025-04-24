import React, { forwardRef } from 'react';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { FaPlus } from 'react-icons/fa';
import { Input } from '../ui/input';
import Tooltip from '../ui/tooltip/tooltip';

type AddImageFileButtonProps = {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const AddImageFileButton = forwardRef<
  HTMLInputElement,
  AddImageFileButtonProps
>(({ handleFileChange }, ref) => {
  return (
    <Tooltip toolTipContent={'Upload an image or PDF'}>
      <Button
        asChild
        className="rounded-full p-3 border-black bg-transparent hover:bg-transparent"
        variant="outline"
      >
        <Label>
          <FaPlus />
          <Input
            className="w-full hidden"
            id="file"
            type="file"
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
