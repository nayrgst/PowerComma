import React, { Suspense } from 'react';

import CreatePageSkeleton from '@/app/(protected)/(pages)/(dashboardPages)/create-page/_components/CreatePage/CreatePageSkeleton';
import RenderPage from '@/app/(protected)/(pages)/(dashboardPages)/create-page/_components/RenderPage';

const CreatePage = () => {
  return (
    <main className="size-full pt-6">
      <Suspense fallback={<CreatePageSkeleton />}>
        <RenderPage />
      </Suspense>
    </main>
  );
};

export default CreatePage;
