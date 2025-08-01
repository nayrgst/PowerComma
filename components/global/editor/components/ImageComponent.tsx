import React from 'react';
import Image from 'next/image';
import UploadImage from '@/components/global/editor/components/UploadImage';

type Props = {
  src: string;
  alt: string;
  className?: string;
  isPreview?: boolean;
  contentId: string;
  onContentChange: (contentId: string, newContent: string | string[] | string[][]) => void;
  isEditable?: boolean;
};

const ImageComponent = ({
  alt,
  contentId,
  onContentChange,
  src,
  className,
  isEditable,
  isPreview,
}: Props) => {
  return (
    <div className={`relative group size-full rounded-lg`}>
      <Image
        src={src}
        width={isPreview ? 48 : 800}
        height={isPreview ? 48 : 800}
        alt={alt}
        className={`object-cover size-full rounded-lg ${className}`}
      />

      {!isPreview && isEditable && (
        <div className="absolute top-0 left-0 hidden group-hover:block">
          <UploadImage contentId={contentId} onContentChange={onContentChange} />
        </div>
      )}
    </div>
  );
};

export default ImageComponent;
