'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Animated Background Blur */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>

        {/* Error Icon */}
        <div className="relative mx-auto mb-8">
          <div className="absolute inset-0 bg-red-500/10 blur-3xl rounded-full" />
          <div className="relative w-24 h-24 mx-auto bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/50 dark:to-orange-950/50 rounded-full flex items-center justify-center border-2 border-red-200 dark:border-red-900 shadow-xl">
            <AlertTriangle className="w-12 h-12 text-red-500 dark:text-red-400 animate-pulse" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white mb-3">
          Something went wrong
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          We encountered an unexpected error while loading this page.
        </p>
        
        {/* Error Details (only in development) */}
        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-900 text-left">
            <p className="text-sm font-mono text-red-700 dark:text-red-400 break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-red-500 dark:text-red-500 mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold rounded-full border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all hover:scale-105 active:scale-95"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
        </div>

        {/* Help Text */}
        <p className="text-sm text-slate-500 dark:text-slate-500">
          If the problem persists, please try refreshing the page or contact support.
        </p>
      </div>
    </div>
  );
}
