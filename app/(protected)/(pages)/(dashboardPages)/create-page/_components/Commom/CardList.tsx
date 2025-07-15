'use client';

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { OutlineCard } from '@/lib/types';
import Card from '@/app/(protected)/(pages)/(dashboardPages)/create-page/_components/Commom/Card';
import AddCardButton from '@/app/(protected)/(pages)/(dashboardPages)/create-page/_components/Commom/AddCardButton';

type Props = {
  outlines: OutlineCard[];
  editingCard: string | null;
  selectedCards: string | null;
  editText: string;
  addOutline: (newOutline: OutlineCard) => void;
  onEditChange: (text: string) => void;
  onCardSelect: (cardId: string) => void;
  onCardDoubleClick: (cardId: string, title: string) => void;
  setEditText: (text: string) => void;
  setEditingCard: (cardId: string | null) => void;
  setSelectedCards: (cardId: string | null) => void;
  addMultipleOutlines: (newOutlines: OutlineCard[]) => void;
};

const CardList = ({
  addMultipleOutlines,
  addOutline,
  editText,
  editingCard,
  onCardDoubleClick,
  onCardSelect,
  onEditChange,
  outlines,
  selectedCards,
  setEditText,
  setEditingCard,
  setSelectedCards,
}: Props) => {
  const [draggedItem, setDraggedItem] = useState<OutlineCard | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const dragOffsetY = useRef<number>(0);

  function onDragOver(e: React.DragEvent, index: number) {
    e.preventDefault();
    if (!draggedItem) return;

    const react = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - react.top;
    const threshold = react.height / 2;

    if (y < threshold) {
      setDragOverIndex(index);
    } else {
      setDragOverIndex(index + 1);
    }
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    if (!draggedItem || dragOverIndex === null) return null;

    const updateCards = [...outlines];
    const draggedIndex = updateCards.findIndex((card) => card.id === draggedItem.id);

    if (draggedIndex === -1 || draggedIndex === dragOverIndex) return;

    const [removedCard] = updateCards.splice(draggedIndex, 1);

    updateCards.splice(
      dragOverIndex > draggedIndex ? dragOverIndex - 1 : dragOverIndex,
      0,
      removedCard
    );

    addMultipleOutlines(updateCards.map((card, idx) => ({ ...card, order: idx + 1 })));

    setDraggedItem(null);
    setDragOverIndex(null);
  }

  function onCardUpdate(cardId: string, newTitle: string) {
    addMultipleOutlines(
      outlines.map((card) => (card.id === cardId ? { ...card, title: newTitle } : card))
    );

    setEditingCard(null);
    setSelectedCards(null);
    setEditText('');
  }

  function onDeleteClick(cardId: string) {
    addMultipleOutlines(
      outlines
        .filter((card) => card.id !== cardId)
        .map((card, idx) => ({ ...card, order: idx + 1 }))
    );
  }

  function onDragstart(e: React.DragEvent, card: OutlineCard) {
    setDraggedItem(card);
    e.dataTransfer.effectAllowed = 'move';

    const react = (e.currentTarget as HTMLElement).getBoundingClientRect();
    dragOffsetY.current = e.clientY - react.top;

    const draggedEl = e.currentTarget.cloneNode(true) as HTMLElement;
    draggedEl.style.position = 'absolute';
    draggedEl.style.top = '-1000px';
    draggedEl.style.opacity = '0.8';
    draggedEl.style.width = `${(e.currentTarget as HTMLElement).offsetWidth}px`;
    e.dataTransfer.setDragImage(draggedEl, 0, dragOffsetY.current);

    setTimeout(() => {
      setDragOverIndex(outlines.findIndex((c) => c.id === card.id));
      document.body.removeChild(draggedEl);
    }, 0);

    document.body.appendChild(draggedEl);
  }

  function onDragEnd() {
    setDraggedItem(null);
    setDragOverIndex(null);
  }

  function getDragOverStyle(cardIdx: number) {
    if (dragOverIndex === null || draggedItem === null) return {};

    if (cardIdx === dragOverIndex) {
      return {
        borderTop: '2px solid #000',
        marginTop: '0.5rem',
        transition: 'margin 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)',
      };
    } else if (cardIdx === dragOverIndex - 1) {
      return {
        borderBottom: '2px solid #000',
        marginBottom: '0.5rem',
        transition: 'margin 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)',
      };
    }

    return {};
  }

  function onAddCard(idx?: number) {
    const newCard: OutlineCard = {
      id: Math.random().toString(36).substr(2, 9),
      title: editText || 'Novo item',
      order: 0,
    };

    let updatedCards;
    if (idx !== undefined) {
      updatedCards = [...outlines.slice(0, idx + 1), newCard, ...outlines.slice(idx + 1)];
    } else {
      updatedCards = [...outlines, newCard];
    }

    updatedCards = updatedCards.map((card, i) => ({
      ...card,
      order: i + 1,
    }));

    addMultipleOutlines(updatedCards);
    setEditText('');
  }

  return (
    <motion.div
      className="space-y-2 -my2"
      onDragOver={(e) => {
        e.preventDefault();
        if (
          outlines.length === 0 ||
          e.clientY > e.currentTarget.getBoundingClientRect().bottom - 50
        ) {
          onDragOver(e, outlines.length);
        }
      }}
      onDrop={(e) => {
        e.preventDefault();
        onDrop(e);
      }}
      layout
    >
      <AnimatePresence>
        {outlines.map((card, idx) => (
          <React.Fragment key={card.id}>
            <Card
              onDragOver={(e) => onDragOver(e, idx)}
              card={card}
              isEditing={editingCard === card.id}
              isSelected={selectedCards === card.id}
              onEditChange={onEditChange}
              editText={editText}
              onEditBlur={() => onCardUpdate(card.id, editText)}
              onEditKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onCardUpdate(card.id, editText);
                }
              }}
              onCardClick={() => onCardSelect(card.id)}
              onCardDoubleClick={() => onCardDoubleClick(card.id, card.title)}
              onDeleteClick={() => onDeleteClick(card.id)}
              dragHandlers={{
                onDragStart: (e) => onDragstart(e, card),
                onDragEnd: () => onDragEnd,
              }}
              dragOverStyle={getDragOverStyle(idx)}
            />

            <AddCardButton onAddCard={() => onAddCard(idx)} />
          </React.Fragment>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default CardList;
