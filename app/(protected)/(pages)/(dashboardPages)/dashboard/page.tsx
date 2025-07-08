import React from 'react';

import { getAllProjects } from '@/actions/project';
import Projects from '@/components/global/projects';
import NotFound from '@/components/global/not-found';

const DashboardPage = async () => {
  const allProjects = await getAllProjects();

  return (
    <div className="w-full flex flex-col gap-6 relative p-4 md:p-0">
      <div className="flex flex-col-reverse items-start gap-6 w-full sm:flex-row sm:justify-between sm:items-center">
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-semibold dark:text-primary backdrop-blur-lg">Projetos</h1>

          <p className="font-normal text-base text-secondary">
            Todos os seus projetos em um só lugar
          </p>
        </div>
      </div>

      {allProjects.data && allProjects.data?.length > 0 ? (
        <Projects projects={allProjects.data} />
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default DashboardPage;
