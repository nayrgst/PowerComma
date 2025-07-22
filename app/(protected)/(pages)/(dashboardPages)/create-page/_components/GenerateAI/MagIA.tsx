'use client';

import { toast } from 'sonner';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Loader2, RotateCcw } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import useMagIAStore from '@/store/useMagIAStore';
import { containerVariants } from '@/lib/constants';
import usePromptStore from '@/store/usePromptStore';
import { generateMagIAPrompt } from '@/actions/openia';
import CardList from '@/app/(protected)/(pages)/(dashboardPages)/create-page/_components/Commom/CardList';
import RecentPrompts from '@/app/(protected)/(pages)/(dashboardPages)/create-page/_components/GenerateAI/RecentPrompts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { OutlineCard } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';
import { createProject } from '@/actions/project';
import { useSlideStore } from '@/store/useSlideStore';

type Props = {
  onBack: () => void;
};

const MagIA = ({ onBack }: Props) => {
  const router = useRouter();
  const { setProject } = useSlideStore();
  const [editText, setEditText] = useState('');
  const [numOfCards, setNumOfCards] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [editingCard, setEditingCard] = useState<string | null>(null);
  const [selectedCards, setSelectedCards] = useState<string | null>(null);
  const {
    currentAiPrompt,
    setCurrentAiPrompt,
    outlines,
    resetOutlines,
    addOutline,
    addMultipleOutlines,
  } = useMagIAStore();
  const { prompts, setPrompts } = usePromptStore();

  function handleBack() {
    onBack();
  }

  function resetCards() {
    setEditingCard(null);
    setSelectedCards(null);
    setEditText('');
    setCurrentAiPrompt('');
    resetOutlines();
  }

  async function generateOutline() {
    if (currentAiPrompt === '') {
      toast.error('Erro', {
        description: 'Por favor, digite o que você gostaria de criar!',
      });
      return;
    }
    setIsGenerating(true);

    const res = await generateMagIAPrompt(currentAiPrompt);
    if (res.status === 200 && res?.data?.outlines) {
      const cardsData: OutlineCard[] = [];
      res.data?.outlines.map((outline: string, idx: number) => {
        const newCard = {
          id: uuidv4(),
          title: outline,
          order: idx + 1,
        };
        cardsData.push(newCard);
      });
      addMultipleOutlines(cardsData);
      setNumOfCards(cardsData.length);
      toast.success('Sucesso!', {
        description: 'Esboço gerado com sucesso!',
      });
    } else {
      toast.error('Erro!', {
        description: 'Não foi possível gerar o esboço! Tente novamente.',
      });
    }
    setIsGenerating(false);
  }

  async function handleGenerate() {
    setIsGenerating(true);
    try {
      if (outlines.length === 0) {
        toast.error('Erro!', {
          description: 'Por favor, gere um esboço primeiro. Clique no botão "Gerar Esboço" abaixo.',
        });
        return;
      }

      const res = await createProject(currentAiPrompt, outlines.slice(0, numOfCards));

      if (res.status !== 200 || !res.data) {
        toast.error('Erro!', {
          description: 'Impossível gerar o projeto! Tente novamente.',
        });
        return;
      }

      router.push(`/presentation/${res.data.id}/select-theme`);
      setProject(res.data);
      setPrompts({
        id: uuidv4(),
        title: currentAiPrompt || outlines?.[0].title,
        outlines: outlines,
        createdAt: new Date().toISOString(),
      });

      toast.success('Sucesso!', {
        description: 'Projeto gerado com sucesso!',
      });
      setIsGenerating(false);
      setCurrentAiPrompt('');
      resetOutlines();
    } catch (error) {
      console.log(error);

      toast.error('Erro!', {
        description: 'Impossível gerar o projeto! Tente novamente.',
      });
    } finally {
      setIsGenerating(false);
    }
  }

  useEffect(() => {
    setNumOfCards(outlines.length);
  }, [outlines.length]);

  return (
    <>
      <Button variant={'outline'} className="mb-4" onClick={handleBack}>
        <ChevronLeft className="size-4 mr-2" />
        Voltar
      </Button>
      <motion.div
        className="w-full max-w-4xl mx-auto space-y-6 px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
      >
        <motion.div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-primary">
            Crie com o <span className="text-violet-600">MagIA</span>
          </h1>
          <p className="text-ring">O que você gostaria de criar hoje?</p>
        </motion.div>

        <motion.div className="bg-primary/10 rounded-xl p-4">
          <div className="flex flex-col justify-between  items-center rounded-xl gap-3 sm:flex-row">
            <Input
              placeholder="Digite o que você gostaria de criar..."
              className="text-base p-0 sm:text-xl border-0 focus-visible:ring-0 shadow-none !bg-transparent grow-0"
              value={currentAiPrompt}
              onChange={(e) => setCurrentAiPrompt(e.target.value)}
              required
            />

            <div className="flex items-center gap-3">
              <Select
                value={numOfCards.toString()}
                onValueChange={(value) => setNumOfCards(parseInt(value))}
              >
                <SelectTrigger className="w-fit font-semibold shadow-xl gap-2">
                  <SelectValue placeholder="Escolha o número de itens" />
                </SelectTrigger>

                <SelectContent className="w-fit">
                  {outlines.length === 0 ? (
                    <SelectItem value="0" className="font-semibold">
                      Sem itens
                    </SelectItem>
                  ) : (
                    Array.from({ length: outlines.length }, (_, idx) => idx + 1).map((num) => (
                      <SelectItem value={num.toString()} key={num} className="font-semibold">
                        {num} {num === 1 ? 'item' : 'itens'}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>

              <Button
                variant={'destructive'}
                aria-label="reseta os itens"
                size={'icon'}
                onClick={resetCards}
              >
                <RotateCcw className="size-4" />
              </Button>
            </div>
          </div>
        </motion.div>
        <div className="flex w-full justify-center items-center">
          <Button
            className="flex items-center font-medium text-lg gap-2"
            onClick={generateOutline}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="animate-spin size-5" />
              </>
            ) : (
              'Gerar Esboço'
            )}
          </Button>
        </div>

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

        {outlines.length > 0 && (
          <Button className="w-full" onClick={handleGenerate} disabled={isGenerating}>
            {isGenerating ? (
              <>
                <Loader2 className="animate-spin" /> Gerando...
              </>
            ) : (
              'Gerar'
            )}
          </Button>
        )}
        {prompts.length > 0 && <RecentPrompts />}
      </motion.div>
    </>
  );
};

export default MagIA;
