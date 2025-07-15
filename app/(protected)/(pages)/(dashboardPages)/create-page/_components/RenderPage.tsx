'use client';
'framer-motion';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

import usePromptStore from '@/store/usePromptStore';
import CreatePage from '@/app/(protected)/(pages)/(dashboardPages)/create-page/_components/CreatePage/CreatePage';
import ScratchPage from '@/app/(protected)/(pages)/(dashboardPages)/create-page/_components/Scratch/ScratchPage';
import MagIA from '@/app/(protected)/(pages)/(dashboardPages)/create-page/_components/GenerateAI/MagIA';

const RenderPage = () => {
  const router = useRouter();
  const { page, setPage } = usePromptStore();

  function handleOnSelectOption(option: string) {
    if (option === 'template') {
      router.push('/templetes');
    } else if (option === 'create-scratch') {
      setPage('create-scratch');
    } else {
      setPage('MagIA');
    }
  }

  function renderStep() {
    switch (page) {
      case 'create':
        return <CreatePage onSelectOption={handleOnSelectOption} />;
      case 'MagIA':
        return <MagIA onBack={handleBack} />;
      case 'create-scratch':
        return <ScratchPage onBack={handleBack} />;

      default:
        return null;
    }
  }

  function handleBack() {
    setPage('create');
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={page}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {renderStep()}
      </motion.div>
    </AnimatePresence>
  );
};

export default RenderPage;
