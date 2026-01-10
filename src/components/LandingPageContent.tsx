'use client';

import { ReactNode } from 'react';
import { LandingPageLoader } from './LandingPageLoader';

interface LandingPageContentProps {
  children: ReactNode;
  /** First image URL of each product for preloading */
  productImageUrls: string[];
}

export function LandingPageContent({ 
  children, 
  productImageUrls 
}: LandingPageContentProps) {
  return (
    <LandingPageLoader 
      imageUrls={productImageUrls}
      minimumLoadTime={1000}
      maxWaitTime={5000}
    >
      {children}
    </LandingPageLoader>
  );
}
