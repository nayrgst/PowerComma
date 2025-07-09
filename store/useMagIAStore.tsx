import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { OutlineCard } from '@/lib/types';

type MagIAStore = {
  outlines: OutlineCard[];
  addMultipleOutlines: (newOutlines: OutlineCard[]) => void;
  addOutline: (newOutline: OutlineCard) => void;
  currentAiPrompt: string;
  setCurrentAiPrompt: (prompt: string) => void;
};

const useMagIAStore = create<MagIAStore>()(
  persist(
    (set) => ({
      outlines: [],
      addMultipleOutlines: (newOutlines: OutlineCard[]) => {
        set(() => ({
          outlines: [...newOutlines],
        }));
      },
      addOutline: (newOutline: OutlineCard) => {
        set((state) => ({
          outlines: [newOutline, ...state.outlines],
        }));
      },
      currentAiPrompt: '',
      setCurrentAiPrompt: (prompt: string) => {
        set(() => ({
          currentAiPrompt: prompt,
        }));
      },
    }),
    { name: 'magIA' }
  )
);

export default useMagIAStore;
