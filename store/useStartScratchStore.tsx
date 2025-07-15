import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { OutlineCard } from '@/lib/types';

type ScratchStore = {
  outlines: OutlineCard[];
  resetOutlines: () => void;
  addOutline: (outline: OutlineCard) => void;
  addMultipleOutlines: (outlines: OutlineCard[]) => void;
};

const useStartScratchStore = create<ScratchStore>()(
  devtools(
    persist(
      (set) => ({
        outlines: [],
        resetOutlines: () => {
          set({ outlines: [] });
        },
        addOutline: (outline: OutlineCard) => {
          set((state) => ({ outlines: [outline, ...state.outlines] }));
        },
        addMultipleOutlines: (outlines: OutlineCard[]) => {
          set(() => ({ outlines: [...outlines] }));
        },
      }),
      { name: 'scratch' }
    )
  )
);

export default useStartScratchStore;
