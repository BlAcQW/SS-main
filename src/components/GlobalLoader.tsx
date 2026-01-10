'use client';

import { useEffect, useState } from 'react';

interface GlobalLoaderProps {
  minimumLoadTime?: number;
}

export function GlobalLoader({ minimumLoadTime = 800 }: GlobalLoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Accelerate towards the end
        const increment = prev < 80 ? Math.random() * 15 + 5 : Math.random() * 5 + 2;
        return Math.min(prev + increment, 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Loader Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Brand Logo/Icon */}
        <div className="relative mb-8">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-indigo-500/30 animate-loader-bounce">
            <svg 
              className="w-10 h-10 sm:w-12 sm:h-12 text-white" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M13 10V3L4 14h7v7l9-11h-7z" 
              />
            </svg>
          </div>
          {/* Pulsing ring */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 animate-ping opacity-20" />
        </div>

        {/* Brand Name */}
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 animate-loader-fade-in">
          StricherTech
        </h1>
        <p className="text-sm sm:text-base text-white/60 mb-8 animate-loader-fade-in" style={{ animationDelay: '0.2s' }}>
          Loading amazing gadgets...
        </p>

        {/* Progress Bar */}
        <div className="w-48 sm:w-64 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Loading Dots */}
        <div className="flex items-center gap-1.5 mt-6">
          <div className="w-2 h-2 rounded-full bg-white/60 animate-loader-dot" style={{ animationDelay: '0s' }} />
          <div className="w-2 h-2 rounded-full bg-white/60 animate-loader-dot" style={{ animationDelay: '0.2s' }} />
          <div className="w-2 h-2 rounded-full bg-white/60 animate-loader-dot" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </div>
  );
}

// Skeleton components for page content
export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 animate-pulse">
      {/* Hero Skeleton */}
      <div className="h-64 sm:h-80 md:h-96 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700" />
      
      {/* Filter Bar Skeleton */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 p-4">
        <div className="container mx-auto flex gap-4">
          <div className="flex-1 h-12 bg-slate-200 dark:bg-slate-700 rounded-full" />
          <div className="w-24 h-12 bg-slate-200 dark:bg-slate-700 rounded-full" />
        </div>
      </div>

      {/* Product Grid Skeleton */}
      <div className="container mx-auto px-4 py-8">
        <div className="h-8 w-48 bg-slate-200 dark:bg-slate-700 rounded mb-6" />
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl overflow-hidden shadow-md">
              <div className="aspect-square bg-slate-200 dark:bg-slate-700" />
              <div className="p-3 sm:p-5 space-y-3">
                <div className="h-3 w-16 bg-slate-200 dark:bg-slate-700 rounded" />
                <div className="h-5 w-full bg-slate-200 dark:bg-slate-700 rounded" />
                <div className="flex justify-between items-center">
                  <div className="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded" />
                  <div className="h-8 w-16 bg-slate-200 dark:bg-slate-700 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Product Detail Skeleton
export function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
        <div>
          <div className="aspect-square w-full bg-slate-200 dark:bg-slate-700 rounded-lg" />
          <div className="grid grid-cols-5 gap-2 mt-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="aspect-square bg-slate-200 dark:bg-slate-700 rounded-md" />
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded" />
          <div className="h-10 w-3/4 bg-slate-200 dark:bg-slate-700 rounded" />
          <div className="h-8 w-32 bg-slate-200 dark:bg-slate-700 rounded" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded" />
            <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-700 rounded" />
            <div className="h-4 w-4/6 bg-slate-200 dark:bg-slate-700 rounded" />
          </div>
          <div className="h-12 w-full bg-slate-200 dark:bg-slate-700 rounded-full" />
        </div>
      </div>
    </div>
  );
}
