import React from 'react';
import Image from 'next/image';

type CardImageProps = React.HTMLAttributes<HTMLDivElement> & {
  preview: string;
};

function CardImage({ preview, ...props }: CardImageProps) {
  return (
    <button className="mb-3 size-20 rounded-lg bg-black" type="button">
      <div {...props}>
        <Image
          src={preview}
          alt={
            preview.includes('pdf-icon')
              ? 'PDF document'
              : 'preview of uploaded image'
          }
          width={400}
          height={400}
          className="object-cover"
        />
        {preview.includes('pdf-icon') && (
          <p className="mt-2 text-sm text-gray-500">PDF Document</p>
        )}
      </div>
    </button>
  );
}

export default CardImage;
