'use client';

import { Button } from '@/components/ui/button';
import { useSlideStore } from '@/store/useSlideStore';
import { Home, Play, Share } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'sonner';

type Props = { presentationId: string };

const Navbar = ({ presentationId }: Props) => {
  const { currentTheme } = useSlideStore();
  const [isPresentationMode, setIsPresentationMode] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(`${window.location.origin}/share/${presentationId}`);
    toast.success('Link copiado!', {
      description: 'Link copiado para a área de transferência',
    });
  }

  return (
    <nav
      className="w-full h-20 flex fixed top-0 left-0 right-0 z-50 justify-between items-center border-b py-4 px-7"
      style={{
        backgroundColor: currentTheme.navbarColor || currentTheme.backgroundColor,
        color: currentTheme.accentColor,
      }}
    >
      <Link href={'/dashboard'} passHref>
        <Button
          variant={'outline'}
          className="flex items-center gap-2"
          style={{ backgroundColor: currentTheme.backgroundColor }}
        >
          <Home className="size-4" />
          <span className="hidden sm:inline">Voltar para o início</span>
        </Button>
      </Link>

      <Link
        href={'/presentation/template-market'}
        className="text-lg font-semibold hidden sm:block"
      >
        Editor de apresentações
      </Link>

      <div className="flex items-center gap-4">
        <Button
          variant={'outline'}
          style={{ backgroundColor: currentTheme.backgroundColor }}
          onClick={handleCopy}
        >
          <Share className="size-4" />
        </Button>

        {/* <SellTemplate /> */}

        <Button
          variant={'default'}
          className="flex items-center gap-2"
          onClick={() => setIsPresentationMode(true)}
        >
          <Play className="size-4" />
          <span className="hidden sm:inline">Apresentação</span>
        </Button>
      </div>

      {/* {isPresentationMode && <PresentationMode />} */}
    </nav>
  );
};

export default Navbar;
