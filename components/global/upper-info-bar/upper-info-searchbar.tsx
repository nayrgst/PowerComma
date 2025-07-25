import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import React from 'react';

const SearchBar = () => {
  return (
    <div className="flex min-w-[60%] relative items-center border rounded-full">
      <Button
        className="absolute left-0 z-10 h-full rounded-r-none !bg-transparent hover:!bg-transparent rounded-full"
        variant={'ghost'}
        type="submit"
        size={'sm'}
      >
        <Search className="size-4" />
        <span className="sr-only">Buscar</span>
      </Button>
      <Input
        type="text"
        placeholder="Procure por um título"
        className="w-full !bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 pl-12 pr-4 rounded-full"
      />
    </div>
  );
};

export default SearchBar;
