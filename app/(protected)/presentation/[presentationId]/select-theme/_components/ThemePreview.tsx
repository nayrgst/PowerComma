'use client';

import { useSlideStore } from '@/store/useSlideStore';
import { redirect, useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useAnimation } from 'framer-motion';
import { Theme } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import ThemeCard from '@/app/(protected)/presentation/[presentationId]/select-theme/_components/ThemeCard';
import ThemePicker from '@/app/(protected)/presentation/[presentationId]/select-theme/_components/ThemePicker';
import { themes } from '@/lib/constants';

const ThemePreview = () => {
  const params = useParams();
  const router = useRouter();
  const controls = useAnimation();
  const { project, currentTheme, setCurrentTheme } = useSlideStore();
  const [selectedTheme, setSelectedTheme] = useState<Theme>(currentTheme);

  useEffect(() => {
    if (project?.slides) {
      redirect(`/presentation/${params.presentationId}`);
    }
  }, [params.presentationId, project]);

  useEffect(() => {
    controls.start('visible');
  }, [controls, selectedTheme]);

  const leftCardContent = (
    <div className="space-y-4">
      <div className="rounded-xl p-6" style={{ backgroundColor: selectedTheme.accentColor + 10 }}>
        <h3 className="text-xl font-semibold mb-4" style={{ color: selectedTheme.accentColor }}>
          Guia de início rápido
        </h3>

        <ol
          className="list-decimal list-inside space-y-2"
          style={{ color: selectedTheme.accentColor }}
        >
          <li>Escolha o tema</li>
          <li>Personalize cores e as fontes</li>
          <li>Adicione seu conteúdo</li>
          <li>Salve e compartilhe sua apresentação</li>
        </ol>
      </div>
      <Button
        className="w-full h-12 text-lg font-medium transition-opacity"
        style={{
          backgroundColor: selectedTheme.accentColor,
          color: selectedTheme.fontColor,
        }}
      >
        Começar
      </Button>
    </div>
  );

  const rightCardContent = (
    <div className="space-y-4">
      <div className="rounded-xl p-6" style={{ backgroundColor: selectedTheme.accentColor + 10 }}>
        <h3 className="text-xl font-semibold mb-4" style={{ color: selectedTheme.accentColor }}>
          Recursos do tema
        </h3>

        <ul
          className="list-decimal list-inside space-y-2"
          style={{ color: selectedTheme.accentColor }}
        >
          <li>Design inteligente</li>
          <li>Modo escuro e claro</li>
          <li>Schemas de cores personalizáveis</li>
          <li>Acessibilidade otimizada</li>
        </ul>
      </div>
      <Button
        className="w-full h-12 text-lg font-medium transition-opacity"
        variant={'outline'}
        style={{ borderColor: selectedTheme.accentColor, color: selectedTheme.fontColor }}
      >
        Explore esses recursos
      </Button>
    </div>
  );

  const mainContent = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl p-6" style={{ backgroundColor: selectedTheme.accentColor + 10 }}>
          <p style={{ color: selectedTheme.accentColor }}>
            este é um layout inteligente: funciona como uma caixa de texto.
          </p>
        </div>

        <div className="rounded-xl p-6" style={{ backgroundColor: selectedTheme.accentColor + 10 }}>
          <p style={{ color: selectedTheme.accentColor }}>você pode obtê-los digitando /smart.</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button
          className="h-12 text-lg font-medium transition-opacity"
          style={{ backgroundColor: selectedTheme.accentColor, color: selectedTheme.fontColor }}
        >
          Botão principal
        </Button>

        <Button
          variant="outline"
          className="h-12 text-lg font-medium transition-opacity"
          style={{ borderColor: selectedTheme.accentColor, color: selectedTheme.fontColor }}
        >
          Botão secundário
        </Button>
      </div>
    </div>
  );

  function applyTheme(theme: Theme) {
    setSelectedTheme(theme);
    setCurrentTheme(theme);
  }

  return (
    <div
      className="h-screen w-full flex"
      style={{
        backgroundColor: selectedTheme.backgroundColor,
        color: selectedTheme.accentColor,
        fontFamily: selectedTheme.fontFamily,
      }}
    >
      <div className="flex-grow overflow-y-auto">
        <div className="p-12 flex flex-col items-center min-h-screen">
          <Button
            className="mb-12 self-start transition-opacity hover:opacity-80"
            variant={'outline'}
            style={{
              backgroundColor: selectedTheme.accentColor + 10,
              color: selectedTheme.accentColor,
              borderColor: selectedTheme.accentColor + 20,
            }}
            onClick={() => router.push('/create-page')}
          >
            <ArrowLeft className="size-4" />
            Voltar
          </Button>
          <div className="w-full flex flex-grow justify-center items-center relative">
            <ThemeCard
              title="Tema principal"
              description="Esse é o tema principal da sua apresentação"
              content={mainContent}
              variant="main"
              controls={controls}
              theme={selectedTheme}
            />

            <ThemeCard
              title="Início rápido"
              description="Comece com um tema pronto para você"
              content={leftCardContent}
              variant="left"
              controls={controls}
              theme={selectedTheme}
            />

            <ThemeCard
              title="Recursos do tema"
              description="Explore os recursos do tema"
              content={rightCardContent}
              variant="right"
              controls={controls}
              theme={selectedTheme}
            />
          </div>
        </div>
      </div>
      <ThemePicker selectedTheme={selectedTheme} themes={themes} onThemeSelect={applyTheme} />
    </div>
  );
};

export default ThemePreview;
