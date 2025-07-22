import { Card, CardContent } from '@/components/ui/card';
import { Theme } from '@/lib/types';
import { AnimationControls, motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

type Props = {
  title: string;
  description: string;
  content: React.ReactNode;
  variant: 'main' | 'right' | 'left';
  controls: AnimationControls;
  theme: Theme;
};

const ThemeCard = ({ title, description, content, variant, controls, theme }: Props) => {
  const variants = {
    main: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 30,
          duration: 0.2,
        },
      },
    },
    right: {
      hidden: { opacity: 0, x: '50%', y: '50%', scale: 0.9, rotate: 0 },
      visible: {
        opacity: 1,
        x: '25%',
        y: '25%',
        scale: 0.95,
        rotate: 10,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 30,
          duration: 0.1,
        },
      },
    },
    left: {
      hidden: { opacity: 0, x: '-50%', y: '-50%', scale: 0.9, rotate: 0 },
      visible: {
        opacity: 1,
        x: '-25%',
        y: '-25%',
        scale: 0.95,
        rotate: -10,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 30,
          duration: 0.1,
        },
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate={controls}
      variants={variants[variant]}
      className="absolute w-full max-w-3xl"
      style={{ zIndex: variant === 'main' ? 10 : 0 }}
    >
      <Card
        className="h-full shadow-2xl backdrop-blur-sm p-0"
        style={{
          backgroundColor: theme.backgroundColor,
          border: `1px solid ${theme.accentColor}20`,
        }}
      >
        <div className="flex flex-col md:flex-row">
          <CardContent className="p-8 flex-1 space-y-6">
            <div className="space-y-3">
              <h2
                className="text-3xl font-bold tracking-tight"
                style={{ color: theme.accentColor }}
              >
                {title}
              </h2>

              <p className="text-lg" style={{ color: `${theme.accentColor}90` }}>
                {description}
              </p>
            </div>
            {content}
          </CardContent>
          <div className="relative w-full h-80 rounded-r-lg overflow-hidden md:w-1/2 md:h-auto">
            <Image
              src={
                'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=911&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              }
              alt="Theme preview"
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-500 hover:scale-110"
            />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ThemeCard;
