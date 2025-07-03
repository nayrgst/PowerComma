'use client';

import React from 'react';
import { Project, User } from '@prisma/client';

import { data } from '@/lib/constants';
import NavMain from '@/components/global/app-sidebar/nav-main';
import RecentOpen from '@/components/global/app-sidebar/recent-open';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import NavFooter from './nav-footer';

const AppSidebar = ({
  recentProjects,
  user,
  ...props
}: { recentProjects: Project[] } & { user: User } & React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="icon" {...props} className="max-w-[212px] bg-background-90">
      <SidebarHeader className="pt-6 pb-0 px-2">
        <SidebarMenuButton size={'lg'} className="data-[state=open]:text-sidebar-accent-foreground">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
            <Avatar className="size-10 rounded-full">
              <AvatarImage src={'/powerComma.png'} alt={'logo power comma'} />
              <AvatarFallback className="rounded-lg">PC</AvatarFallback>
            </Avatar>
          </div>
          <span className=" text-primary text-xl font-semibold">Power Comma</span>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent className="px-2 mt-10 gap-y-6">
        <NavMain items={data.navMain} />
        <RecentOpen recentProjects={recentProjects} />
      </SidebarContent>
      <SidebarFooter>
        <NavFooter prismaUser={user} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
