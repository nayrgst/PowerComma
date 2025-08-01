'use client';

import { toast } from 'sonner';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { JsonValue } from '@prisma/client/runtime/library';

import { timeAgo } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useSlideStore } from '@/store/useSlideStore';
import { ItemVariants, themes } from '@/lib/constants';
import AlertDialogBox from '@/components/global/alert-dialog';
import { deleteProject, recoverProject } from '@/actions/project';
import ThumbnailPreview from '@/components/global/project-card/thumbnail-preview';

type Props = {
  projectId: string;
  title: string;
  isDelete?: boolean;
  createAt: string;
  themeName: string;
  slideData: JsonValue;
};

const ProjectCard = ({ createAt, projectId, slideData, title, isDelete, themeName }: Props) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { setSlides } = useSlideStore();
  const route = useRouter();
  const theme = themes.find((themes) => themes.name === themeName) || themes[0];

  function handleNavigation() {
    setSlides(JSON.parse(JSON.stringify(slideData)));

    route.push(`/presentation/${projectId}`);
  }

  async function handleRecover() {
    setLoading(true);

    if (!projectId) {
      setLoading(false);
      toast.error('Erro!', {
        description: 'Projeto não encontrado.',
      });
      return;
    }
    try {
      const res = await recoverProject(projectId);
      if (res.status !== 200) {
        toast.error('Erro', {
          description: res.error || 'Algo deu errado!',
        });
        return;
      }
      setOpen(false);
      route.refresh();

      toast.success('Sucesso!', {
        description: 'Projeto recuperado com sucesso.',
      });
    } catch (error) {
      console.log(error);
      toast.error('Oopss!', {
        description: 'Algo deu errado! Por favor entre em contato com o suporte.',
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    setLoading(true);

    if (!projectId) {
      setLoading(false);
      toast.error('Erro!', {
        description: 'Projeto não encontrado.',
      });
      return;
    }
    try {
      const res = await deleteProject(projectId);
      if (res.status !== 200) {
        toast.error('Erro', {
          description: res.error || 'Algo deu errado!',
        });
        return;
      }
      setOpen(false);
      route.refresh();

      toast.success('Sucesso!', {
        description: 'Projeto excluído com sucesso.',
      });
    } catch (error) {
      console.log(error);
      toast.error('Oopss!', {
        description: 'Algo deu errado! Por favor entre em contato com o suporte.',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      variants={ItemVariants}
      className={`w-full group flex flex-col gap-y-2 sm:gap-y-3 rounded-xl p-2 sm:p-3 transition-colors ${
        !isDelete && 'hover:bg-muted/50'
      }`}
    >
      <div
        className="relative aspect-[16/10] overflow-hidden rounded-lg cursor-pointer"
        onClick={handleNavigation}
      >
        <ThumbnailPreview theme={theme} />
      </div>

      <div className="w-full">
        <div className="space-y-1 sm:space-y-2">
          <h3 className="text-primary font-semibold text-sm sm:text-base line-clamp-1">{title}</h3>
          <div className="w-full flex justify-between gap-2 items-center">
            <p className="text-xs sm:text-sm text-muted-foreground" suppressHydrationWarning>
              {timeAgo(createAt)}
            </p>
            {isDelete ? (
              <AlertDialogBox
                description="Isso vai recuperar seu projeto e restaurar seus dados."
                className="bg-green-500 hover:bg-green-600 dark:bg-green-600 hover:dark:bg-green-700"
                loading={loading}
                open={open}
                onClick={handleRecover}
                handleOpen={() => setOpen(!open)}
              >
                <Button
                  size={'sm'}
                  variant={'ghost'}
                  className="bg-primary-10 hover:bg-secondary cursor-pointer text-xs sm:text-sm h-7 sm:h-8"
                  disabled={loading}
                >
                  Recuperar
                </Button>
              </AlertDialogBox>
            ) : (
              <AlertDialogBox
                description="Isso vai deletar seu projeto e enviar ele para a lixeira."
                loading={loading}
                open={open}
                onClick={handleDelete}
                handleOpen={() => setOpen(!open)}
              >
                <Button
                  size={'sm'}
                  variant={'ghost'}
                  className="bg-primary-10 hover:bg-secondary cursor-pointer text-xs sm:text-sm h-7 sm:h-8"
                  disabled={loading}
                >
                  Deletar
                </Button>
              </AlertDialogBox>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
