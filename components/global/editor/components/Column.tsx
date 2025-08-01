import { MasterRecursiveComponent } from '@/app/(protected)/presentation/[presentationId]/_components/editor/MasterRecursiveComponent';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { ContentItem } from '@/lib/types';
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  content: ContentItem[];
  className?: string;
  isPreview?: boolean;
  slideId: string;
  onContentChange: (contentId: string, newContent: string | string[] | string[][]) => void;
  isEditable?: boolean;
};

const Column = ({
  content,
  onContentChange,
  slideId,
  className,
  isEditable = false,
  isPreview = false,
}: Props) => {
  const [columns, setColumns] = useState<ContentItem[]>([]);

  function createDefaultColumns(count: number) {
    return Array(count)
      .fill(null)
      .map(() => ({
        id: uuidv4(),
        type: 'paragraph' as const,
        name: 'Parágrafo',
        content: '',
        placeholder: 'Comece digitando algo...',
      }));
  }

  useEffect(() => {
    if (content.length === 0) {
      setColumns(createDefaultColumns(2));
    } else {
      setColumns(content);
    }
  }, [content]);

  return (
    <div className="size-full relative">
      <ResizablePanelGroup
        direction="horizontal"
        className={cn('size-full flex', !isEditable && '!border-0', className)}
      >
        {columns.map((item, index) => (
          <React.Fragment key={item.id}>
            <ResizablePanel minSize={20} defaultSize={100 / columns.length}>
              <div className={cn('size-full p-2 sm:p-4', item.className)}>
                <MasterRecursiveComponent
                  content={item}
                  isPreview={isPreview}
                  onContentChange={onContentChange}
                  slideId={slideId}
                  isEditable={isEditable}
                />
              </div>
            </ResizablePanel>
            {index < columns.length - 1 && isEditable && (
              <ResizableHandle withHandle={!isPreview} />
            )}
          </React.Fragment>
        ))}
      </ResizablePanelGroup>
    </div>
  );
};

export default Column;
