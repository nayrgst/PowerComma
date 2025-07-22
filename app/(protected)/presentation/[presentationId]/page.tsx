'use client';

import { getProjectById } from '@/actions/project';
import { themes } from '@/lib/constants';
import { useSlideStore } from '@/store/useSlideStore';
import { Loader2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import { redirect, useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { DndProvider } from 'react-dnd';

type Props = {};

const PresentationIdPage = (props: Props) => {
  //WIP: criar a visualização da apresentação

  const params = useParams();
  const { setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const { currentTheme, setCurrentTheme, setProject, setSlides } = useSlideStore();

  useEffect(() => {
    (async () => {
      try {
        const res = await getProjectById(params.presentationId as string);
        if (res.status !== 200 || !res.data) {
          toast.error('Erro!', {
            description: res.error || 'Erro ao carregar o projeto!',
          });
          redirect('/dashboard');
        }

        const findTheme = themes.find((theme) => theme.name === res.data.themeName);
        setCurrentTheme(findTheme || themes[0]);
        setTheme(findTheme?.type === 'dark' ? 'dark' : 'light');
        setProject(res.data);
        setSlides(JSON.parse(JSON.stringify(res.data.slides)));
      } catch (error) {
        console.log('Error:', error);
        toast.error('Erro!', {
          description: 'Ocorreu um erro inesperado!',
        });
      } finally {
        setIsLoading(false);
      }
    })();
  }, [params.presentationId, setCurrentTheme, setTheme, setProject, setSlides]);

  if (isLoading) {
    <div className="flex items-center justify-center h-screen">
      <Loader2 className="animate-spin size-8 text-primary" />
    </div>;
  }

  return <DndProvider></DndProvider>;
};

export default PresentationIdPage;
