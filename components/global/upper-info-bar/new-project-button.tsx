'use client';

import React from 'react';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { User } from '@prisma/client';

const NewProjectButton = ({ user }: { user: User }) => {
  return (
    <Button className="font-semibold rounded-lg " disabled={!user.subscription}>
      <Plus />
      Novo Projeto
    </Button>
  );
};

export default NewProjectButton;
