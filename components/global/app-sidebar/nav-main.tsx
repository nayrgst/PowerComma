'use client';

import Link from 'next/link';
import { LucideProps } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { ForwardRefExoticComponent, RefAttributes } from 'react';

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const NavMain = ({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
    asActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) => {
  const pathname = usePathname();

  return (
    <SidebarGroup className="p-0">
      <SidebarMenu>
        {items.map((items) => (
          <SidebarMenuItem key={items.title}>
            <SidebarMenuButton
              asChild
              tooltip={items.title}
              className={`${pathname.includes(items.url) && 'bg-muted'}`}
            >
              <Link
                href={items.url}
                className={`text-lg ${pathname.includes(items.url) && 'font-bold'} `}
              >
                <items.icon className="text-lg" />
                <span>{items.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default NavMain;
