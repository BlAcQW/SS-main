'use client';

import { useEffect, useState, useCallback, ReactNode } from 'react';

// Storage key for tracking first visit
const LOADER_SHOWN_KEY = 'strichertech_loader_shown';

interface LandingPageLoaderProps {
  children: ReactNode;
  /** Product image URLs to preload */
  imageUrls: string[];
  /** Minimum display time for loader in ms */
  minimumLoadTime?: number;
  /** Maximum wait time before showing content anyway */
  maxWaitTime?: number;
}

// Check if loader has already been shown in this session
function hasLoaderBeenShown(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return sessionStorage.getItem(LOADER_SHOWN_KEY) === 'true';
  } catch {
    // sessionStorage might be blocked in some browsers
    return false;
  }
}

// Mark loader as shown
function markLoaderAsShown(): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(LOADER_SHOWN_KEY, 'true');
  } catch {
    // Ignore storage errors
  }
}

export function LandingPageLoader({
  children,
  imageUrls,
  minimumLoadTime = 1000,
  maxWaitTime = 5000,
}: LandingPageLoaderProps) {
  // Check immediately if loader was already shown - skip if true
  const [hasShownBefore, setHasShownBefore] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadedImages, setLoadedImages] = useState(0);

  const totalImages = imageUrls.length;

  // Check storage on mount (client-side only)
  useEffect(() => {
    const shown = hasLoaderBeenShown();
    setHasShownBefore(shown);
    if (shown) {
      // Skip loader entirely if already shown
      setIsLoading(false);
    }
  }, []);

  // Preload all product images
  const preloadImages = useCallback(async () => {
    if (totalImages === 0) {
      setProgress(100);
      return;
    }

    const loadImage = (src: string): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          setLoadedImages((prev) => {
            const newCount = prev + 1;
            setProgress(Math.round((newCount / totalImages) * 100));
            return newCount;
          });
          resolve();
        };
        img.onerror = () => {
          // Still count failed images to prevent hanging
          setLoadedImages((prev) => {
            const newCount = prev + 1;
            setProgress(Math.round((newCount / totalImages) * 100));
            return newCount;
          });
          resolve();
        };
        img.src = src;
      });
    };

    // Load images in parallel with a concurrency limit
    const concurrencyLimit = 4;
    const chunks: string[][] = [];
    for (let i = 0; i < imageUrls.length; i += concurrencyLimit) {
      chunks.push(imageUrls.slice(i, i + concurrencyLimit));
    }

    for (const chunk of chunks) {
      await Promise.all(chunk.map(loadImage));
    }
  }, [imageUrls, totalImages]);

  useEffect(() => {
    // Skip loading logic if loader was already shown before
    if (hasShownBefore === null) return; // Still checking storage
    if (hasShownBefore) return; // Already shown, skip

    let minTimeElapsed = false;
    let dataReady = false;
    let timedOut = false;

    const checkComplete = () => {
      if ((minTimeElapsed && dataReady) || timedOut) {
        // Mark loader as shown before hiding it
        markLoaderAsShown();
        // Small delay for smooth transition
        setTimeout(() => setIsLoading(false), 100);
      }
    };

    // Minimum display time
    const minTimer = setTimeout(() => {
      minTimeElapsed = true;
      checkComplete();
    }, minimumLoadTime);

    // Maximum wait time (failsafe)
    const maxTimer = setTimeout(() => {
      timedOut = true;
      setProgress(100);
      checkComplete();
    }, maxWaitTime);

    // Start preloading images
    preloadImages().then(() => {
      dataReady = true;
      checkComplete();
    });

    return () => {
      clearTimeout(minTimer);
      clearTimeout(maxTimer);
    };
  }, [hasShownBefore, preloadImages, minimumLoadTime, maxWaitTime]);

  // Still checking if loader was shown before - render nothing briefly
  if (hasShownBefore === null) {
    return null;
  }

  // Loader was already shown - render content immediately without animation
  if (hasShownBefore) {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div 
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Loading homepage content"
      >
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
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-indigo-500/30 animate-bounce">
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
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            StricherTech
          </h1>
          <p className="text-sm sm:text-base text-white/60 mb-6">
            Loading amazing gadgets...
          </p>

          {/* Progress Bar */}
          <div className="w-48 sm:w-64 h-2 bg-white/10 rounded-full overflow-hidden mb-3">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Progress Text */}
          <p className="text-sm text-white/50">
            {progress < 100 ? (
              <>
                Loading {loadedImages} of {totalImages} products
              </>
            ) : (
              'Almost ready...'
            )}
          </p>

          {/* Loading Dots */}
          <div className="flex items-center gap-1.5 mt-6">
            <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </div>
    );
  }

  // Content with smooth fade-in
  return (
    <div className="animate-fade-in">
      {children}
    </div>
  );
}
