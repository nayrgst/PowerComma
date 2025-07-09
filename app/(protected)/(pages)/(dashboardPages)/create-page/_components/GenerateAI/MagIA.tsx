'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { containerVariants } from '@/lib/constants';
import { Input } from '@/components/ui/input';

type Props = {
  onBack: () => void;
};

const MagIA = ({ onBack }: Props) => {
  const router = useRouter();

  function handleBack() {
    onBack();
  }

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

        <motion.div className="bgprimary/10 rounded-xl p-4">
          <div className="flex flex-col justify-between  items-center rounded-xl gap-3 sm:flex-row">
            <Input
              placeholder="Digite o que você gostaria de criar..."
              className="text-base p-5 border-0 focus-visible:ring-0 shadow-none bg-transparent grow md:p-7"
              required
            />
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default MagIA;
