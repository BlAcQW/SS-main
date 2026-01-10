'use client';

import { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return <ErrorFallback onRetry={() => this.setState({ hasError: false })} />;
    }

    return this.props.children;
  }
}

interface ErrorFallbackProps {
  onRetry?: () => void;
  title?: string;
  message?: string;
}

export function ErrorFallback({ 
  onRetry, 
  title = "Something went wrong",
  message = "We're having trouble loading this page. Please try again."
}: ErrorFallbackProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="relative mx-auto mb-8">
          <div className="absolute inset-0 bg-red-500/10 blur-3xl rounded-full" />
          <div className="relative w-24 h-24 mx-auto bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/50 dark:to-orange-950/50 rounded-full flex items-center justify-center border-2 border-red-200 dark:border-red-900 shadow-xl">
            <AlertTriangle className="w-12 h-12 text-red-500 dark:text-red-400" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white mb-3">
          {title}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          {message}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </button>
          )}
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold rounded-full border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
        </div>

        {/* Help Text */}
        <p className="mt-8 text-sm text-slate-500 dark:text-slate-500">
          If the problem persists, please contact support or try again later.
        </p>
      </div>
    </div>
  );
}

// Network Error Component
export function NetworkError() {
  return (
    <ErrorFallback
      title="Connection Lost"
      message="Please check your internet connection and try again."
      onRetry={() => window.location.reload()}
    />
  );
}

// Not Found Error Component  
export function NotFoundError() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="text-8xl sm:text-9xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
          404
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white mb-3">
          Page Not Found
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
