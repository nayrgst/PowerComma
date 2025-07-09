'use client';

import { User } from '@prisma/client';
import { SignedIn, UserButton, useUser } from '@clerk/nextjs';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

const NavFooter = ({ prismaUser }: { prismaUser: User }) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleUpgrade() {
    console.log('jones');
  }

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex flex-col gap-y-6 items-start group-data-[collapsible=icon]:hidden">
          {!prismaUser.subscription && (
            <div className="flex flex-col items-start p-2 pb-3 gap-4 bg-background-80 rounded-xl ">
              <div className="flex flex-col gap-1 text-center">
                <p className="text-base font-bold text-center">
                  Obter o <span className="text-violet-600">MagIA</span>
                </p>
                <span className="text-sm">
                  Recursos avançados com inteligência artificial, disponíveis para você.
                </span>
              </div>
              <div className="w-full bg-comma-gradient p-[1px] rounded-full">
                <Button
                  className="w-full bg-background-80  hover:bg-background-90 text-primary rounded-full font-bold cursor-pointer"
                  variant={'default'}
                  size={'lg'}
                  onClick={handleUpgrade}
                >
                  {loading ? 'Upgranding' : 'Upgrade'}
                </Button>
              </div>
            </div>
          )}

          <SignedIn>
            <SidebarMenuButton
              size={'lg'}
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <UserButton />
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collpsible-icon]:hidden">
                <span className="truncate font-semibold uppercase">{user?.fullName}</span>
                <span className="truncate text-muted-foreground">
                  {user?.emailAddresses[0]?.emailAddress}
                </span>
              </div>
            </SidebarMenuButton>
          </SignedIn>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default NavFooter;
