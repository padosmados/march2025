'use client';

import React from 'react';
import { Toaster } from '@/components/ui/toaster'; // Ensure this path is correct or adjust it
import { ThemeProvider } from '../theme-provider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster />
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </>
  );
}
