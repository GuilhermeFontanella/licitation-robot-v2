'use client'

import { Outfit } from 'next/font/google';
import './globals.css';
import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import DateProvider from '@/utils/providers/date-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

const outfit = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
            <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <DateProvider>
              <SidebarProvider>{children}</SidebarProvider>
          </DateProvider>
        </ThemeProvider>
            </QueryClientProvider>
      </body>
    </html>
  );
}
