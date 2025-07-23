import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { useSlideStore } from '@/store/useSlideStore';
import React, { useEffect, useState } from 'react';

const LayoutPreview = () => {
  const { getOrderedSlides, reorderSlides } = useSlideStore();
  const [loading, setLoading] = useState(true);
  const slides = getOrderedSlides();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLoading(false);
    }
  }, []);

  return (
    <div className="w-64 h-full fixed left-0 top-20 border-r overflow-y-auto">
      <ScrollArea className="size-full" suppressHydrationWarning>
        {loading ? (
          <div className="flex flex-col w-full space-y-6 px-4">
            {[...Array(3)].map((_, idx) => (
              <Skeleton key={idx} className="h-20 w-full" />
            ))}
          </div>
        ) : (
          <div className="space-y-6 pb-32 p-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-medium dark:text-gray-100 text-gray-500">SLIDES</h2>
              <span className="text-xs text-gray-400 dark:text-gray-200" suppressHydrationWarning>
                {slides.length} slides
              </span>
            </div>
            {/* {slides.map((slide, idx) => (
              <DraggableSlidePreview
                key={slide.id || idx}
                slide={slide}
                idx={idx}
                moveSlide={moveSlide}
              />
            ))} */}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default LayoutPreview;
