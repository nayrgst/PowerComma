'use client';

import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';

import { cn } from '@/lib/utils';
import { Moon, Sun } from 'lucide-react';

function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input relative',
        className
      )}
      {...props}
    >
      <Moon
        className={cn(
          'size-4 absolute z-[1000] top-[10px] left-[10px] stroke-gray-500 fill-white transition-opacity duration-300 ease-in-out',
          'data-[state=checked]:opacity-100 data-[state=unchecked]:opacity-0'
        )}
      />
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          'pointer-events-none block size-7 rounded-full bg-background shadow-lg ring-0 transition-transform duration-300 ease-in-out data-[state=checked]:translate-x-10 data-[state=unchecked]:translate-x-0'
        )}
      />

      <Sun
        className={cn(
          'size-4 absolute z-[1000] top-[10px] right-[10px] stroke-gray-600 fill-black transition-opacity duration-300 ease-in-out',
          'data-[state=checked]:opacity-0 data-[state=unchecked]:opacity-100'
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
