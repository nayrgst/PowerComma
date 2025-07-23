import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { LayoutSlides, Slide } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useSlideStore } from '@/store/useSlideStore';
import { ArrowDownIcon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  isEditable: boolean;
};

interface DropZoneProps {
  index: number;
  isEditable: boolean;
  onDrop: (
    item: {
      type: string;
      layoutType: string;
      component: LayoutSlides;
      index?: number;
    },
    dropIndex: number
  ) => void;
}

interface DraggableSlideProps {
  slide: Slide;
  index: number;
  isEditable: boolean;
  moveSlide: (dragIndex: number, hoverIndex: number) => void;
  handleDelete: (id: string) => void;
}

export const DropZone: React.FC<DropZoneProps> = ({ index, isEditable, onDrop }) => {
  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: ['slide', 'layout'],
    drop: (item: { type: string; layoutType: string; component: LayoutSlides; index?: number }) => {
      onDrop(item, index);
    },
    canDrop: () => isEditable,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  if (!isEditable) return null;

  return (
    <div
      className={cn(
        'h-4 my-2 rounded-md transition-all duration-200',
        isOver && canDrop ? 'border-green-500 bg-green-100' : 'border-gray-200',
        canDrop ? 'border-blue-300' : ''
      )}
    >
      {isOver && canDrop && (
        <div className="flex h-full items-center justify-center text-green-600">
          <ArrowDownIcon className="w-4 h-4" />
        </div>
      )}
    </div>
  );
};

export const DraggableSlide: React.FC<DraggableSlideProps> = ({
  slide,
  index,
  isEditable,
  moveSlide,
  handleDelete,
}) => {
  const ref = useRef(null);
  const { currentSlide, currentTheme, updateContentItem, setCurrentSlide } = useSlideStore();
  const [{ isDragging }, drag] = useDrag({
    type: 'SLIDE',
    item: {
      type: 'SLIDE',
      index,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: isEditable,
  });

  return (
    <div
      ref={ref}
      className={cn(
        'w-full rounded-xl shadow-xl relative p-0 min-h-[400px] max-h-[800px]',
        'shadow-xl transition-shadow duration-300',
        'flex flex-col',
        index === currentSlide ? 'ring-2 ring-blue-500 ring-offset-2' : '',
        slide.classname,
        isDragging ? 'opacity-50' : 'opacity-100'
      )}
      style={{
        backgroundImage: currentTheme.gradientBackground,
      }}
      onClick={() => setCurrentSlide(index)}
    >
      <div className="size-full flex-grow overflow-hidden">
        {/* <MasterRecursiveComponent /> */}
      </div>
    </div>
  );
};

const Editor = ({ isEditable }: Props) => {
  const [loading, setLoading] = useState(true);
  const {
    getOrderedSlides,
    reorderSlides,
    removeSlide,
    addSlideAtIndex,
    slides,
    project,
    currentSlide,
  } = useSlideStore();

  const slidesRefs = useRef<(HTMLDivElement | null)[]>([]);
  const orderedSlides = getOrderedSlides();

  function moveSlide(dragIndex: number, hoverIndex: number) {
    if (isEditable) {
      reorderSlides(dragIndex, hoverIndex);
    }
  }

  function hadleDrop(
    item: {
      type: string;
      layoutType: string;
      component: LayoutSlides;
      index?: number;
    },
    dropIndex: number
  ) {
    if (!isEditable) return;

    if (item.type === 'layout') {
      addSlideAtIndex(
        {
          ...item.component,
          id: uuidv4(),
          slideOrder: dropIndex,
        },
        dropIndex
      );
    } else if (item.type === 'SLIDE' && item.index !== undefined) {
      moveSlide(item.index, dropIndex);
    }
  }

  useEffect(() => {
    if (slidesRefs.current[currentSlide]) {
      slidesRefs.current[currentSlide].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [currentSlide]);

  return (
    <div className="flex flex-1 flex-col max-w-3xl h-full mx-auto mb-20 px-4">
      {loading ? (
        <div className="flex flex-col w-full space-y-6 px-4">
          {[...Array(3)].map((_, idx) => (
            <Skeleton key={idx} className="h-52 w-full" />
          ))}
        </div>
      ) : (
        <ScrollArea className="flex-1 mt-8">
          <div className="space-y-4 pt-2 px-4 pb-4">
            {isEditable && <DropZone index={0} onDrop={hadleDrop} isEditable={isEditable} />}
            {orderedSlides.map((slide, index) => (
              <React.Fragment key={slide.id || index}>
                <DraggableSlide />
              </React.Fragment>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default Editor;
