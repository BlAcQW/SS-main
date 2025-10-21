
import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HydrationErrorBoundary from './HydrationErrorBoundary';
import AuthProvider from '@/components/AuthProvider';

export const metadata: Metadata = {
  title: 'Storely - Your One-Stop Shop',
  description: 'Get your Shop setup in a click.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('min-h-screen bg-background font-body antialiased')} suppressHydrationWarning>
        <AuthProvider>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <HydrationErrorBoundary>
            <main className="flex-1">{children}</main>
            </HydrationErrorBoundary>
            <Footer />
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
