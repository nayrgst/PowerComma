import React from 'react';
import { Image } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Slide, Theme } from '@/lib/types';

type Props = {
  slide: Slide;
  theme: Theme;
};

const ThumbnailPreview = ({ slide, theme }: Props) => {
  return (
    <div
      className={cn(
        'w-full relative aspect-[16/9] rounded-lg overflow-hidden transition-all duration-200 p-2'
      )}
      style={{
        fontFamily: theme.fontFamily,
        color: theme.accentColor,
        backgroundColor: theme.slideBackgroundColor,
        backgroundImage: theme.gradientBackground,
      }}
    >
      {slide ? (
        <div className="scale-[0.5] origin-top-left size-[200%] overflow-hidden">SLIDE</div>
      ) : (
        <div className="size-full bg-gray-400 flex justify-center items-center">
          <Image className="size-6 text-gray-500" />
        </div>
      )}
    </div>
  );
};

export default ThumbnailPreview;
