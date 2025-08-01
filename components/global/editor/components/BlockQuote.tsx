'use client';

import { useSlideStore } from '@/store/useSlideStore';
import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const BlockQuote = ({ className, children }: Props) => {
  const { currentTheme } = useSlideStore();
  return <blockquote>BlockQuote</blockquote>;
};

export default BlockQuote;
