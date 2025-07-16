'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, RotateCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Button } from '@/components/ui/button';
import { useSlideStore } from '@/store/useSlideStore';
import { containerVariants, ItemVariants } from '@/lib/constants';
import useStartScratchStore from '@/store/useStartScratchStore';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import CardList from '@/app/(protected)/(pages)/(dashboardPages)/create-page/_components/Commom/CardList';
import { toast } from 'sonner';
import { createProject } from '@/actions/project';

type Props = {
  onBack: () => void;
};

const ScratchPage = ({ onBack }: Props) => {
  const router = useRouter();
  const { setProject } = useSlideStore();
  const [editText, setEditText] = useState('');
  const [editingCard, setEditingCard] = useState<string | null>(null);
  const [selectedCards, setSelectedCards] = useState<string | null>(null);
  const { resetOutlines, addMultipleOutlines, addOutline, outlines } = useStartScratchStore();

  function handleBack() {
    resetOutlines();
    onBack();
  }

  function resetCards() {
    setEditText('');
    resetOutlines();
  }

  function handleAddCard() {
    const newCard = {
      id: uuidv4(),
      title: editText || 'Novo item',
      order: 0,
    };
    const updatedCards = [...outlines, newCard].map((card, i) => ({
      ...card,
      order: i + 1,
    }));
    setEditText('');
    addMultipleOutlines(updatedCards);
  }

  async function handleGenerate() {
    if (outlines.length === 0) {
      toast.error('Erro', {
        description: 'Adicione pelo menos um item para gerar o slide',
      });
      return;
    }

    const res = await createProject(outlines?.[0].title, outlines);

    if (res.status !== 200) {
      toast.error('Erro', {
        description: res.error || 'Erro ao criar o projeto',
      });
      return;
    }

    if (res.data) {
      setProject(res.data);
      resetOutlines();
      toast.success('Sucesso', {
        description: 'Projeto criado com sucesso!',
      });
      router.push(`/presentation/${res.data.id}/select-theme`);
    } else {
      toast.error('Erro', {
        description: 'Erro ao criar o projeto',
      });
    }
  }

  return (
    <>
      <Button onClick={handleBack} className="mb-4" variant="outline">
        <ChevronLeft className="mr-2 size-4" />
        Voltar
      </Button>
      <motion.div
        className="w-full max-w-4xl space-y-6 mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-2xl font-bold text-primary text-left sm:text-3xl">Prompt de criação</h1>
        <motion.div className="bg-primary/10 p-4 rounded-xl" variants={ItemVariants}>
          <div className="flex flex-col justify-between gap-3 items-center rounded-xl sm:flex-row">
            <Input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              placeholder="Digite o prompt de criação"
              className="text-base border-0 focus-visible:ring-0 shadow-none p-0 !bg-transparent flex-grow sm:text-xl"
            />

            <div className="flex items-center gap-3">
              <Select value={outlines.length > 0 ? outlines.length.toString() : '0'}>
                <SelectTrigger className="w-fit gap-2 font-semibold">
                  <SelectValue placeholder="Selecione o número de itens" />
                </SelectTrigger>
                <SelectContent className="w-fit">
                  {outlines.length === 0 ? (
                    <SelectItem className="font-semibold" value="0">
                      Sem itens
                    </SelectItem>
                  ) : (
                    Array.from({ length: outlines.length }, (_, idx) => idx + 1).map((num) => (
                      <SelectItem className="font-semibold" value={num.toString()} key={num}>
                        {num} {num === 1 ? 'item' : 'itens'}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <Button
                variant={'destructive'}
                size={'icon'}
                aria-label="reseta os itens"
                onClick={resetCards}
              >
                <RotateCcw className="size-4" />
              </Button>
            </div>
          </div>
        </motion.div>
        <CardList
          outlines={outlines}
          addOutline={addOutline}
          addMultipleOutlines={addMultipleOutlines}
          editingCard={editingCard}
          selectedCards={selectedCards}
          editText={editText}
          onEditChange={setEditText}
          onCardSelect={(id) => {
            setEditingCard(id);
            const card = outlines.find((c) => c.id === id);
            setEditText(card?.title || '');
          }}
          setSelectedCards={setSelectedCards}
          setEditText={setEditText}
          setEditingCard={setEditingCard}
          onCardDoubleClick={(id, title) => {
            setEditingCard(id);
            setEditText(title);
          }}
        />
        <Button className="w-full bg-primary-10" onClick={handleAddCard} variant={'secondary'}>
          Adicionar item
        </Button>
        {outlines.length > 0 && (
          <Button className="w-full" onClick={handleGenerate}>
            Gerar slide
          </Button>
        )}
      </motion.div>
    </>
  );
};

export default ScratchPage;
