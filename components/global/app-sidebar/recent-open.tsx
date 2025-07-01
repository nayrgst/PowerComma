import React from 'react';
import { Project } from '@prisma/client';

import { Button } from '@/components/ui/button';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { JsonValue } from '@prisma/client/runtime/library';
import { toast } from 'sonner';

type Props = {
  recentProjects: Project[];
};

const RecentOpen = ({ recentProjects }: Props) => {
  function handleClick(projectId: string, slides: JsonValue) {
    if (!projectId || !slides) {
      toast.error('Nenhum Projeto Encontrado!', {
        description: 'Tente Novamente!',
      });
      return;
    }
  }

  return recentProjects.length > 0 ? (
    <SidebarGroup>
      <SidebarGroupLabel>Vistos Recentemente</SidebarGroupLabel>
      <SidebarMenu>
        {recentProjects.length > 0
          ? recentProjects.map((items) => (
              <SidebarMenuItem key={items.id}>
                <SidebarMenuButton asChild tooltip={items.title} className="hover:bg-primary-80">
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
