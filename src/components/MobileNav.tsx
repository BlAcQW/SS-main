'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

export function MobileNav() {
  return (
    <div className="md:hidden flex items-center">
      <Link href="/" className="flex items-center space-x-2">
        <ShoppingCart className="h-6 w-6" />
        <span className="font-bold font-headline">Storely</span>
      </Link>
    </div>
  );
}
