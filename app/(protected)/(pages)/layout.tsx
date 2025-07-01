import { getRecentProjects } from '@/actions/project';
import { onAuthenticateUser } from '@/actions/user';
import AppSidebar from '@/components/global/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { redirect } from 'next/navigation';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  const auth = await onAuthenticateUser();
  const recentProjects = await getRecentProjects();

  if (!auth.user) redirect('/sign-in');

  return (
    <SidebarProvider>
      <AppSidebar user={auth.user} recentProjects={recentProjects.data || []} />
    </SidebarProvider>
  );
};

export default Layout;
