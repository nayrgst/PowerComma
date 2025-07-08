import React from 'react';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

type Props = {
  children: React.ReactNode;
  className?: string;
  description: string;
  loading?: boolean;
  open?: boolean;
  handleOpen: () => void;
  onClick?: () => void;
};

const AlertDialogBox = ({
  children,
  description,
  handleOpen,
  className,
  loading = false,
  onClick,
  open,
}: Props) => {
  return (
    <AlertDialog open={open} onOpenChange={handleOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza que deseja fazer isso?</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <Button variant={'destructive'} className={`${className}`} onClick={onClick}>
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                Carrengando...
              </>
            ) : (
              'Continuar'
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogBox;
