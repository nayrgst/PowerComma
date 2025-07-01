import { House, LayoutGrid, Settings, Trash } from 'lucide-react';

export const data = {
  user: {
    name: 'jones',
    email: 'jones@email.com',
    avatar: '/avatar/jones.jpg',
  },

  navMain: [
    {
      title: 'Inicio',
      url: '/dashboard',
      icon: House,
    },
    {
      title: 'Modelos',
      url: '/templates',
      icon: LayoutGrid,
    },

    {
      title: 'Lixeira',
      url: '/trash',
      icon: Trash,
    },

    {
      title: 'Configurações',
      url: '/settings',
      icon: Settings,
    },
  ],
};
