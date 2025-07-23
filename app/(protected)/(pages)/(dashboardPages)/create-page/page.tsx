import React, { Suspense } from 'react';

import CreatePageSkeleton from '@/app/(protected)/(pages)/(dashboardPages)/create-page/_components/CreatePage/CreatePageSkeleton';
import RenderPage from '@/app/(protected)/(pages)/(dashboardPages)/create-page/_components/RenderPage';
import { onAuthenticateUser } from '@/actions/user';
import { redirect } from 'next/navigation';

const CreatePage = async () => {
  const checkUser = await onAuthenticateUser();

  if (!checkUser.user) {
    redirect('/sign-in');
  }
  if (!checkUser.user.subscription) {
    redirect('/dashboard');
  }

  return (
    <main className="size-full pt-6">
      <Suspense fallback={<CreatePageSkeleton />}>
        <RenderPage />
      </Suspense>
    </main>
  );
};

export default CreatePage;
