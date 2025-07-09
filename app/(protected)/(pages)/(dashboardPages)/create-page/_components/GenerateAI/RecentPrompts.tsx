import React from 'react';
import { motion } from 'framer-motion';

import { timeAgo } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import useMagIAStore from '@/store/useMagIAStore';
import usePromptStore from '@/store/usePromptStore';
import { containerVariants, ItemVariants } from '@/lib/constants';
import { toast } from 'sonner';

const RecentPrompts = () => {
  const { prompts, setPage } = usePromptStore();
  const { addMultipleOutlines, setCurrentAiPrompt } = useMagIAStore();

  function handleEdit(id: string) {
    const prompt = prompts.find((prompt) => prompt.id === id);
    if (prompt) {
      setPage('MagIA');
      addMultipleOutlines(prompt.outlines);
      setCurrentAiPrompt(prompt.title);
    } else {
      toast.error('Erro', {
        description: 'Não foi possível encontrar o prompt selecionado.',
      });
    }
  }

  return (
    <motion.div variants={containerVariants} className="space-y-4 !mt-20">
      <motion.h2 variants={ItemVariants} className="font-semibold text-2xl text-center">
        Seus prompts recentes
      </motion.h2>

      <motion.div className="space-y-2 mx-auto w-full lg:max-w-[80%]">
        {prompts.map((prompt) => (
          <motion.div key={prompt.id} variants={ItemVariants}>
            <Card className="flex flex-row p-4 items-center justify-between hover:bg-accent/50 transition-colors duration-300">
              <div className="max-w-[70%]">
                <h3 className="text-xl font-semibold line-clamp-1">{prompt.title}</h3>
                <p className="text-sm font-semibold text-muted-foreground ">
                  {timeAgo(prompt?.createdAt)}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-violet-600">MagIA</span>
                <Button size={'sm'} variant={'default'} onClick={() => handleEdit(prompt.id)}>
                  Editar
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default RecentPrompts;
