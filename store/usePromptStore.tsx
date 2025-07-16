import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

import { OutlineCard } from '@/lib/types';

type Page = 'create' | 'MagIA' | 'create-scratch';

type Prompt = {
  id: string;
  title: string;
  createdAt: string;
  outlines: OutlineCard[] | [];
};

type PromptStore = {
  page: Page;
  setPage: (page: Page) => void;
  prompts: Prompt[] | [];
  setPrompts: (prompt: Prompt) => void;
  removePrompt?: (id: string) => void;
};

const usePromptStore = create<PromptStore>()(
  devtools(
    persist(
      (set) => ({
        page: 'create',
        setPage: (page: Page) => {
          set({ page });
        },
        prompts: [],
        setPrompts: (prompt: Prompt) => {
          set((state) => ({
            prompts: [prompt, ...state.prompts],
          }));
        },
        removePrompt: (id: string) => {
          set((state) => ({
            prompts: state.prompts.filter((prompt: Prompt) => prompt.id !== id),
          }));
        },
      }),
      { name: 'propsts' }
    )
  )
);

export default usePromptStore;
