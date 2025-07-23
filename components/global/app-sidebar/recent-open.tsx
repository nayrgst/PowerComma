'use client';

import React from 'react';
import { toast } from 'sonner';
import { Project } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { JsonValue } from '@prisma/client/runtime/library';

import { Button } from '@/components/ui/button';
import { useSlideStore } from '@/store/useSlideStore';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

type Props = {
  recentProjects: Project[];
};

const RecentOpen = ({ recentProjects }: Props) => {
  const { setSlides } = useSlideStore();
  const router = useRouter();

  function handleClick(projectId: string, slides: JsonValue) {
    if (!projectId || !slides) {
      toast.error('Nenhum Projeto Encontrado!', {
        description: 'Tente Novamente!',
      });
      return;
    }

    setSlides(JSON.parse(JSON.stringify(slides)));
    router.push(`/presentation/${projectId}`);
  }

  return recentProjects.length > 0 ? (
    <SidebarGroup>
      <SidebarGroupLabel>Vistos Recentemente</SidebarGroupLabel>
      <SidebarMenu>
        {recentProjects.length > 0
          ? recentProjects.map((items) => (
              <SidebarMenuItem key={items.id}>
                <SidebarMenuButton asChild tooltip={items.title}>
                  <Button
                    onClick={() => handleClick(items.id, items.slides)}
                    variant={'link'}
                    className="text-xs items-center justify-start"
                  >
                    <span>{items.title}</span>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))
          : ''}
      </SidebarMenu>
    </SidebarGroup>
  ) : (
    ''
  );
};

export default RecentOpen;
