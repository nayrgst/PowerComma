'use client';

import React from 'react';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import usePromptStore from '@/store/usePromptStore';
import { containerVariants, CreatePageCard, ItemVariants } from '@/lib/constants';
import RecentPrompts from '@/app/(protected)/(pages)/(dashboardPages)/create-page/_components/GenerateAI/RecentPrompts';

type Props = {
  onSelectOption: (option: string) => void;
};

const CreatePage = ({ onSelectOption }: Props) => {
  const { prompts } = usePromptStore();

  // useEffect(() => {
  //   setPage('create');
  // }, []);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-8"
      variants={containerVariants}
    >
      <motion.div variants={ItemVariants} className="text-center space-y-2">
        <h1 className="text-4xl text-primary font-bold">
          Como você gostaria de criar seu projeto?
        </h1>
        <p className="text-lg text-ring">
          Escolha uma das opções abaixo para começar a criar seu projeto.
        </p>
      </motion.div>

      <motion.div variants={containerVariants} className="grid md:grid-cols-3 gap-3">
        {CreatePageCard.map((card) => (
          <motion.div
            key={card.type}
            variants={ItemVariants}
            whileHover={{
              scale: 1.05,
              rotate: 1,
              transition: { duration: 0.1 },
            }}
            className={`${
              card.highlight ? 'bg-comma-gradient' : 'hover:bg-comma-gradient border'
            } rounded-xl p-[1px] transition-all duration-300 ease-in-out`}
          >
            <motion.div
              whileHover={{ transition: { duration: 0.1 } }}
              className="w-full p-4 flex flex-col gap-y-6 bg-white dark:bg-black rounded-xl"
            >
              <div className="flex flex-col w-full items-start gap-y-3">
                <div>
                  <p className="text-lg font-semibold text-primary">{card.title}</p>

                  <p
                    className={`${
                      card.highlight ? 'text-violet-600' : 'text-primary'
                    } text-4xl font-bold`}
                  >
                    {card.highlightedText}
                  </p>
                </div>
                <p className="text-ring font-normal text-sm">{card.description}</p>
              </div>

              <motion.div
                className="self-end"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={card.highlight ? 'default' : 'outline'}
                  className="w-fit rounded-xl font-bold"
                  size={'sm'}
                  onClick={() => onSelectOption(card.type)}
                >
                  {card.highlight ? 'Gerar' : 'Selecionar'}
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {prompts.length > 0 && <RecentPrompts />}
    </motion.div>
  );
};

export default CreatePage;
