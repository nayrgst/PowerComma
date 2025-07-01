import { Loader } from 'lucide-react';
import React from 'react';

const AuthLoading = () => {
  return (
    <div className="flex w-full h-screen items-center justify-center">
      <Loader className="animate-spin" />
    </div>
  );
};

export default AuthLoading;
