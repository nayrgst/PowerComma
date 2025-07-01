import { getAllProjects } from '@/actions/project';
import React from 'react';

const DashboardPage = async () => {
  const allProjects = await getAllProjects();
  return (
    <div className="w-full flex flex-col gap-6 relative">
      <div className="flex flex-col-reverse items-start gap-6 w-full sm:flex-row sm:justify-between sm:items-center">
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-semibold dark:text-primary backdrop-blur-lg">Projetos</h1>

          <p className="font-normal text-base dark:text-secondary">
            Todos os seus projetos em um só lugar.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
