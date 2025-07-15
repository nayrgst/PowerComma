'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';

import { OutlineCard } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card as UICard } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';

type Props = {
  card: OutlineCard;
  isEditing: boolean;
  isSelected: boolean;
  editText: string;
  onEditChange: (text: string) => void;
  onEditBlur: () => void;
  onEditKeyDown: (e: React.KeyboardEvent) => void;
  onCardClick: () => void;
  onCardDoubleClick: () => void;
  onDeleteClick: () => void;
  onDragOver: (e: React.DragEvent) => void;
  dragOverStyle: React.CSSProperties;
  dragHandlers: {
    onDragStart: (e: React.DragEvent) => void;
    onDragEnd: () => void;
  };
};

const Card = ({
  card,
  onDragOver,
  dragHandlers,
  dragOverStyle,
  editText,
  isEditing,
  isSelected,
  onCardClick,
  onCardDoubleClick,
  onDeleteClick,
  onEditBlur,
  onEditChange,
  onEditKeyDown,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30, mass: 1 }}
      className="relative"
    >
      <div style={dragOverStyle} draggable {...dragHandlers} onDragOver={onDragOver}>
        <UICard
          className={`p-4 cursor-grab active:cursor-grabbing  ${
            isEditing || isSelected ? 'border-primary bg-transparent' : ''
          }`}
          onClick={onCardClick}
          onDoubleClick={onCardDoubleClick}
        >
          <div className="flex justify-between items-center">
            {isEditing ? (
              <Input
                ref={inputRef}
                value={editText}
                onChange={(e) => onEditChange(e.target.value)}
                onBlur={onEditBlur}
                onKeyDown={onEditKeyDown}
                className="text-base sm:text-lg"
              />
            ) : (
              <div className="flex items-center gap-2">
                <span
                  className={`text-base sm:text-lg py-1 px-4 rounded-xl border  ${
                    isEditing || isSelected ? 'bg-background-90 dark:text-black' : ''
                  } `}
                >
                  {card.order}
                </span>

                <span className="text-base sm:text-lg">{card.title}</span>
              </div>
            )}

            <Button
              variant={'ghost'}
              size={'icon'}
              aria-label={`Deleta o card ${card.order}`}
              onClick={(e) => {
                e.stopPropagation();
                onDeleteClick();
              }}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </UICard>
      </div>
    </motion.div>
  );
};

export default Card;
