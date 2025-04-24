import React from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
type CardImageProps = React.HTMLAttributes<HTMLDivElement> & {
  preview: string;
  onClose?: () => void;
};

function CardImage({ preview, onClose, ...props }: CardImageProps) {
  return (
    <div
      className="mb-3 p-1 w-fit rounded-lg border border-gray-400 block relative"
      {...props}
    >
      {onClose && (
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 cursor-pointer bg-gray-800 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 z-10"
        >
          <X className="size-4" />
        </button>
      )}

      <Image
        src={preview}
        alt={
          preview.includes('pdf-icon')
            ? 'PDF document'
            : 'preview of uploaded image'
        }
        width={300}
        height={300}
        className="size-16 object-cover rounded-lg"
      />
      {preview.includes('pdf-icon') && (
        <p className="mt-2 text-sm text-gray-500">PDF Document</p>
      )}
    </div>
  );
}

export default CardImage;
