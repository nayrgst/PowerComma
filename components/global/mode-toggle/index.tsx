'use client';

import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Switch
      checked={theme === 'light'}
      className="h-10 w-20 pl-1 data-[state=checked]:bg-secondary-80"
      onCheckedChange={toggleTheme}
      aria-label="Toggle dark mode"
    />
  );
};

export default ThemeSwitcher;
