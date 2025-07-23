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
import { HTML5Backend } from 'react-dnd-html5-backend';
import Navbar from '@/app/(protected)/presentation/[presentationId]/_components/navbar/Navbar';
import LayoutPreview from '@/app/(protected)/presentation/[presentationId]/_components/editor-sidebar/left-sidebar/LayoutPreview';
import Editor from '@/app/(protected)/presentation/[presentationId]/_components/editor/Editor';

const PresentationIdPage = () => {
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

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col min-h-screen">
        <Navbar presentationId={params.presentationId as string} />

        <div
          className="flex flex-1 overflow-hidden pt-16"
          style={{
            backgroundColor: currentTheme.backgroundColor,
            fontFamily: currentTheme.fontFamily,
            color: currentTheme.accentColor,
          }}
        >
          <LayoutPreview />
          <div className="flex-1 ml-64 pr-16">
            <Editor isEditable={true} />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default PresentationIdPage;
