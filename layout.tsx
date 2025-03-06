import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar/Navbar';
import Providers from './providers';
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Camino Tiger',
  description: 'Book your Accommodation on Camino de Santiago!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider signInUrl="/sign-in">
      <html lang="en">
        <body className={`${inter.className} min-h-screen flex flex-col`} suppressHydrationWarning>
          <Providers>
            <Navbar />
            <main className="container flex-1">{children}</main>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
