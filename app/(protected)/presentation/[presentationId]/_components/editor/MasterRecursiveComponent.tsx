'use client';

import { ContentItem } from '@/lib/types';
import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Title,
} from '@/components/global/editor/components/Heading';
import { cn } from '@/lib/utils';
import DropZone from '@/app/(protected)/presentation/[presentationId]/_components/editor/DropZone';
import Paragraph from '@/components/global/editor/components/Paragraph';
import Table from '@/components/global/editor/components/Table';
import Column from '@/components/global/editor/components/Column';
import ImageComponent from '@/components/global/editor/components/ImageComponent';

type MasterRecursiveComponentProps = {
  content: ContentItem;
  slideId: string;
  isEditable?: boolean;
  isPreview?: boolean;
  index?: number;
  onContentChange: (contentId: string, newContent: string | string[] | string[][]) => void;
};

const ContentRenderer: React.FC<MasterRecursiveComponentProps> = React.memo(
  ({ content, onContentChange, slideId, index, isPreview, isEditable }) => {
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onContentChange(content.id, e.target.value);
      },
      [content.id, onContentChange]
    );

    const commomProps = {
      placeholder: content.placeholder,
      value: content.content as string,
      onChange: handleChange,
      isPreview: isPreview,
    };

    const animationProps = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 },
    };

    switch (content.type) {
      case 'heading1':
        return (
          <motion.div
            className={cn('size-full flex flex-col', content.className)}
            {...animationProps}
          >
            <Heading1 {...commomProps} />
          </motion.div>
        );

      case 'heading2':
        return (
          <motion.div
            className={cn('size-full flex flex-col', content.className)}
            {...animationProps}
          >
            <Heading2 {...commomProps} />
          </motion.div>
        );

      case 'heading3':
        return (
          <motion.div
            className={cn('size-full flex flex-col', content.className)}
            {...animationProps}
          >
            <Heading3 {...commomProps} />
          </motion.div>
        );

      case 'heading4':
        return (
          <motion.div
            className={cn('size-full flex flex-col', content.className)}
            {...animationProps}
          >
            <Heading4 {...commomProps} />
          </motion.div>
        );

      case 'title':
        return (
          <motion.div
            className={cn('size-full flex flex-col', content.className)}
            {...animationProps}
          >
            <Title {...commomProps} />
          </motion.div>
        );

      case 'paragraph':
        return (
          <motion.div
            className={cn('size-full flex flex-col', content.className)}
            {...animationProps}
          >
            <Paragraph {...commomProps} />
          </motion.div>
        );

      case 'table':
        // Garante que content.content seja sempre string[][]
        const tableContent =
          Array.isArray(content.content) && Array.isArray((content.content as unknown[])[0])
            ? (content.content as string[][])
            : [[]];
        return (
          <motion.div
            className={cn('size-full flex flex-col', content.className)}
            {...animationProps}
          >
            <Table
              content={tableContent}
              onChange={(newContent) =>
                onContentChange(content.id, newContent !== null ? newContent : '')
              }
              initialRowSize={content.initialColumns}
              initialColSize={content.initialRows}
              isPreview={isPreview}
              isEditable={isEditable}
            />
          </motion.div>
        );

      case 'resizable-column':
        if (Array.isArray(content.content)) {
          return (
            <motion.div {...animationProps} className="w-full h-full">
              <Column
                content={content.content as ContentItem[]}
                className={content.className}
                onContentChange={onContentChange}
                slideId={slideId}
                isPreview={isPreview}
                isEditable={isEditable}
              />
            </motion.div>
          );
        }
        return null;

      case 'image':
        return (
          <motion.div
            {...animationProps}
            className={cn('size-full flex flex-col', content.className)}
          >
            <ImageComponent
              src={content.content as string}
              alt={content.alt || 'image'}
              className={content.className}
              isPreview={isPreview}
              contentId={content.id}
              onContentChange={onContentChange}
              isEditable={isEditable}
            />
          </motion.div>
        );

      case 'blockquote':
        return (
          <motion.div
            {...animationProps}
            className={cn('size-full flex flex-col', content.className)}
          >
            <BlockQuote></BlockQuote>
          </motion.div>
        );
      case 'column':
        if (Array.isArray(content.content)) {
          return (
            <motion.div
              {...animationProps}
              className={cn('size-full flex flex-col p-2 sm:p-3', content.className)}
            >
              {content.content.length > 0 ? (
                (content.content as ContentItem[]).map((subItem, subIndex) => (
                  <React.Fragment key={subItem.id || `item-${subIndex}`}>
                    {!isPreview && !subItem.restrictToDrop && subIndex === 0 && isEditable && (
                      <DropZone index={0} parentId={content.id} slideId={slideId} />
                    )}
                    <MasterRecursiveComponent
                      content={subItem}
                      slideId={slideId}
                      isEditable={isEditable}
                      isPreview={isPreview}
                      index={subIndex}
                      onContentChange={onContentChange}
                    />

                    {!isPreview && !subItem.restrictToDrop && isEditable && (
                      <DropZone index={subIndex + 1} parentId={content.id} slideId={slideId} />
                    )}
                  </React.Fragment>
                ))
              ) : isEditable ? (
                <DropZone index={0} parentId={content.id} slideId={slideId} />
              ) : null}
            </motion.div>
          );
        }
        return null;
      default:
        return null;
    }
  }
);

ContentRenderer.displayName = 'ContentRenderer';

export const MasterRecursiveComponent: React.FC<MasterRecursiveComponentProps> = React.memo(
  ({ content, slideId, isEditable = true, isPreview = false, index, onContentChange }) => {
    if (isPreview) {
      return (
        <ContentRenderer
          content={content}
          onContentChange={onContentChange}
          slideId={slideId}
          index={index}
          isPreview={isPreview}
          isEditable={isEditable}
        />
      );
    }

    return (
      <React.Fragment>
        <ContentRenderer
          content={content}
          onContentChange={onContentChange}
          slideId={slideId}
          index={index}
          isPreview={isPreview}
          isEditable={isEditable}
        />
      </React.Fragment>
    );
  }
);

MasterRecursiveComponent.displayName = 'MasterRecursiveComponent';
