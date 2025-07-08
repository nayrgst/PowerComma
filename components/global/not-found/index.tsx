import { CircleSlash2 } from 'lucide-react';
import React from 'react';

const NotFound = () => {
  return (
    <div className="w-full flex flex-col min-h-[70vh] justify-center items-center gap-12">
      <CircleSlash2 className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px]" />

      <div className="flex flex-col items-center justify-center text-center">
        <p className="text-3xl font-semibold text-primary">Nada para ver aqui</p>
        <p className="text-base font-normal text-secondary">
          Experimente criar uma imagem com o <span className="text-violet-600">Creative IA</span>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
