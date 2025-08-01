import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import React from 'react';

const SearchBar = () => {
  return (
    <div className="flex w-full relative items-center border rounded-lg sm:rounded-full bg-background">
      <Button
        className="absolute left-0 z-10 h-full rounded-r-none !bg-transparent hover:!bg-transparent rounded-l-lg sm:rounded-l-full"
        variant={'ghost'}
        type="submit"
        size={'sm'}
      >
        <Search className="size-4" />
        <span className="sr-only">Buscar</span>
      </Button>
      <Input
        type="text"
        placeholder="Procure por um título..."
        className="w-full !bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 pl-10 pr-3 sm:pl-12 sm:pr-4 rounded-lg sm:rounded-full text-sm sm:text-base h-9 sm:h-10"
      />
    </div>
  );
};

export default SearchBar;
