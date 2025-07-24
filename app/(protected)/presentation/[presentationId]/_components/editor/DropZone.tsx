import { ContentItem } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useSlideStore } from '@/store/useSlideStore';
import React from 'react';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  index: number;
  parentId: string;
  slideId: string;
};

const DropZone = ({ index, parentId, slideId }: Props) => {
  const { addComponentInSlide } = useSlideStore();
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'CONTENT_ITEM',
    drop: (item: {
      type: string;
      componentType: string;
      label: string;
      component: ContentItem;
    }) => {
      if (item.type === 'component') {
        addComponentInSlide(slideId, parentId, index, { ...item.component, id: uuidv4() });
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });
  return (
    <div
      ref={drop as unknown as React.RefObject<HTMLDivElement>}
      className={cn(
        'h-3 w-full transition-all duration-200',
        '',
        isOver && canDrop ? 'border-blue-500 bg-blue-100' : 'border-gray-300 hover:border-blue-300'
      )}
    >
      {isOver && canDrop && (
        <div className="size-full flex justify-center items-center text-sm text-green-600">
          Solte aqui
        </div>
      )}
    </div>
  );
};

export default DropZone;
