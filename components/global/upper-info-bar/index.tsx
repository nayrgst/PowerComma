import React from 'react';
import { User } from '@prisma/client';

import SearchBar from '@/components/global/upper-info-bar/upper-info-searchbar';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import ThemeSwitcher from '../mode-toggle';

type Props = {
  user: User;
  children: React.ReactNode;
};

const UpperInfoBar = ({ user }: Props) => {
  return (
    <header className="sticky top-0 z-[10] flex shrink-0 flex-wrap items-center gap-2 bg-background p-4 justify-between">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <div className="flex w-full max-w-[95%] items-center justify-between gap-4 flex-wrap">
        <SearchBar />
      </div>

      <ThemeSwitcher />
    </header>
  );
};

export default UpperInfoBar;
