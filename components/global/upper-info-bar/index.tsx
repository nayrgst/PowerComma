import React from 'react';
import { User } from '@prisma/client';

import SearchBar from '@/components/global/upper-info-bar/upper-info-searchbar';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import ThemeSwitcher from '../mode-toggle';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import NewProjectButton from './new-project-button';

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
        <ThemeSwitcher />
        <div className="flex flex-wrap justify-end gap-4 items-center">
          <Button
            variant={'default'}
            className="bg-primary/20 rounded-lg hover:bg-primary/15 text-primary font-semibold cursor-not-allowed"
          >
            <Upload />
            Importar
          </Button>
          <NewProjectButton user={user} />
        </div>
      </div>
    </header>
  );
};

export default UpperInfoBar;
