import { generateLayouts } from '@/actions/openia';
import { Button } from '@/components/ui/button';
import { themes } from '@/lib/constants';
import { Theme } from '@/lib/types';
import { useSlideStore } from '@/store/useSlideStore';
import { Loader2, Wand2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';

type Props = {
  selectedTheme: Theme;
  themes: Theme[];
  onThemeSelect: (theme: Theme) => void;
};

const ThemePicker = ({ selectedTheme, onThemeSelect }: Props) => {
  const router = useRouter();
  const params = useParams();
  const { project, currentTheme, setSlides } = useSlideStore();
  const [loading, setLoading] = useState(false);

  async function handleGenerateLayouts() {
    setLoading(true);
    if (!selectedTheme) {
      toast.error('Erro', {
        description: 'Selecione um tema por favor!',
      });
      setLoading(false);
      return;
    }

    if (!project?.id) {
      toast.error('Erro', {
        description: 'Crie um projeto por favor!',
      });
      router.push('/create-page');
      return;
    }

    try {
      const res = await generateLayouts(params.presentationId as string, currentTheme.name);
      if (res?.status !== 200 && !res?.data) {
        toast.error('Erro', {
          description: 'Erro ao gerar layouts!',
        });
        return;
      } else {
        toast.success('Sucesso', {
          description: 'Layouts gerados com sucesso!',
        });
      }

      router.push(`/presentation/${project.id}`);
      setSlides(res?.data);
    } catch {
      toast.error('Erro', {
        description: 'Erro ao gerar layouts!',
      });
    } finally {
      setLoading(false);
    }
  }
  return (
    <div
      className="flex flex-col w-[400px] h-screen overflow-hidden sticky top-0"
      style={{
        backgroundColor: selectedTheme.sidebarColor || selectedTheme.backgroundColor,
        borderLeft: `1px solid ${selectedTheme.accentColor}20`,
      }}
    >
      <div className="p-8 space-y-6 flex-shrink-0">
        <div className="space-y-2">
          <h2
            className="text-3xl font-bold tracking-tight"
            style={{ color: selectedTheme.accentColor }}
          >
            Escolha um tema
          </h2>

          <p className="text-sm" style={{ color: `${selectedTheme.accentColor}80` }}>
            Escolha a partir de nossa coleção ou gerar um tema personalizado
          </p>
        </div>

        <Button
          className="w-full h-12 text-lg font-medium shadow-lg hover:shadow-xl transition-all durantion-300"
          style={{
            backgroundColor: selectedTheme.accentColor,
            color: selectedTheme.backgroundColor,
          }}
          onClick={handleGenerateLayouts}
        >
          {loading ? (
            <>
              <Loader2 className="size-5 animate-spin" />
              <p className="animate-pulse">Gerarando...</p>
            </>
          ) : (
            <>
              <Wand2 className="size-5" />
              Gerar tema
            </>
          )}
        </Button>
      </div>

      <ScrollArea className="flex-grow px-8 pb-8 overflow-auto">
        <div className="grid grid-cols-1 gap-4">
          {themes.map((theme) => (
            <motion.div
              key={theme.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mx-2"
            >
              <Button
                onClick={() => onThemeSelect(theme)}
                className="flex flex-col items-center justify-start w-full h-auto p-6"
                style={{
                  color: theme.fontColor,
                  fontFamily: theme.fontFamily,
                  background: theme.gradientBackground || theme.backgroundColor,
                }}
              >
                <div className="w-full items-center flex justify-between">
                  <span className="text-xl font-bold">{theme.name}</span>
                  <div
                    className="size-3 rounded-full"
                    style={{ backgroundColor: theme.accentColor }}
                  />
                </div>
                <div className="space-y-1 w-full">
                  <div className="text-2xl font-bold" style={{ color: theme.accentColor }}>
                    Titulo
                  </div>
                  <div className="text-base opacity-80" style={{ color: theme.fontColor }}>
                    Corpo & <span style={{ color: theme.accentColor }}>link</span>
                  </div>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ThemePicker;
