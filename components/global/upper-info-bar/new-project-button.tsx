'use client';

import React from 'react';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';

const NewProjectButton = ({ user }: { user: User }) => {
  const router = useRouter();

  return (
    <Button
      className="font-semibold rounded-lg cursor-pointer"
      disabled={!user.subscription}
      onClick={() => router.push('/create-page')}
    >
      <Plus />
      Novo Projeto
    </Button>
  );
};

export default NewProjectButton;
