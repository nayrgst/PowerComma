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
};

const UpperInfoBar = ({ user }: Props) => {
  return (
    <header className="sticky top-0 z-[10] flex flex-col gap-2 bg-background p-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-5 w-3/4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="hidden h-4 md:block" />
        <SearchBar />
      </div>

      <div className="flex flex-wrap justify-between items-center gap-2 md:gap-4 space-x-0 lg:space-x-5">
        <ThemeSwitcher />
        <Button
          variant={'default'}
          className="bg-primary/20 rounded-lg hover:bg-primary/15 text-primary font-semibold cursor-not-allowed"
        >
          <Upload />
          Importar
        </Button>
        <NewProjectButton user={user} />
      </div>
    </header>
  );
};

export default UpperInfoBar;
