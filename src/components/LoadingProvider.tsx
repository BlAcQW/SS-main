'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { GlobalLoader } from './GlobalLoader';

interface LoadingContextType {
  isLoading: boolean;
  isInitialLoad: boolean;
  setLoading: (loading: boolean) => void;
  startTransition: () => void;
  endTransition: () => void;
}

const LoadingContext = createContext<LoadingContextType>({
  isLoading: true,
  isInitialLoad: true,
  setLoading: () => {},
  startTransition: () => {},
  endTransition: () => {},
});

export const useLoading = () => useContext(LoadingContext);

interface LoadingProviderProps {
  children: ReactNode;
  minimumLoadTime?: number;
}

export function LoadingProvider({ 
  children, 
  minimumLoadTime = 800 
}: LoadingProviderProps) {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDataReady, setIsDataReady] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Handle initial page load
  useEffect(() => {
    const minLoadTimer = setTimeout(() => {
      setIsDataReady(true);
    }, minimumLoadTime);

    // Also check if document is fully loaded
    const handleLoad = () => {
      setIsDataReady(true);
    };

    if (document.readyState === 'complete') {
      setIsDataReady(true);
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      clearTimeout(minLoadTimer);
      window.removeEventListener('load', handleLoad);
    };
  }, [minimumLoadTime]);

  // Transition from initial load to ready state
  useEffect(() => {
    if (isDataReady && isInitialLoad) {
      // Small delay for smooth animation
      const transitionTimer = setTimeout(() => {
        setIsInitialLoad(false);
      }, 100);
      return () => clearTimeout(transitionTimer);
    }
  }, [isDataReady, isInitialLoad]);

  // Handle route changes - show transitioning state
  useEffect(() => {
    // Reset transitioning state when route changes complete
    setIsTransitioning(false);
  }, [pathname, searchParams]);

  const setLoading = useCallback((loading: boolean) => {
    setIsTransitioning(loading);
  }, []);

  const startTransition = useCallback(() => {
    setIsTransitioning(true);
  }, []);

  const endTransition = useCallback(() => {
    setIsTransitioning(false);
  }, []);

  const isLoading = isInitialLoad || isTransitioning;

  return (
    <LoadingContext.Provider value={{ 
      isLoading, 
      isInitialLoad, 
      setLoading, 
      startTransition, 
      endTransition 
    }}>
      {/* Initial Load Screen - blocks all interaction */}
      {isInitialLoad && (
        <div 
          className="fixed inset-0 z-[9999]"
          aria-live="polite"
          aria-busy="true"
          aria-label="Loading application"
        >
          <GlobalLoader minimumLoadTime={minimumLoadTime} />
        </div>
      )}

      {/* Page Transition Overlay */}
      {isTransitioning && !isInitialLoad && (
        <div 
          className="fixed inset-0 z-[9998] bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300"
          aria-live="polite"
          aria-busy="true"
        >
          <div className="flex flex-col items-center gap-4">
            {/* Spinner */}
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full border-4 border-indigo-100 dark:border-indigo-900" />
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-600 dark:border-t-indigo-400 animate-spin" />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 animate-pulse">
              Loading...
            </p>
          </div>
        </div>
      )}

      {/* Main Content - hidden during initial load with smooth reveal */}
      <div 
        className={`transition-opacity duration-500 ${
          isInitialLoad ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        aria-hidden={isInitialLoad}
        inert={isInitialLoad ? '' : undefined}
      >
        {children}
      </div>
    </LoadingContext.Provider>
  );
}

// Hook to manually control loading state for data fetching
export function useDataLoading() {
  const { startTransition, endTransition } = useLoading();
  
  const withLoading = useCallback(async <T,>(asyncFn: () => Promise<T>): Promise<T> => {
    startTransition();
    try {
      const result = await asyncFn();
      return result;
    } finally {
      endTransition();
    }
  }, [startTransition, endTransition]);

  return { withLoading, startTransition, endTransition };
}

// Wrapper component for Suspense boundaries with branded fallback
export function SuspenseLoading({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[200px] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 rounded-full border-3 border-slate-200 dark:border-slate-700" />
          <div className="absolute inset-0 rounded-full border-3 border-transparent border-t-indigo-600 dark:border-t-indigo-400 animate-spin" />
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Loading content...
        </p>
      </div>
    </div>
  );
}
