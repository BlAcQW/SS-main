
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { IProduct } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { AddToCartButton } from '@/components/store/AddToCartButton';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { RefreshCw, Home, AlertTriangle, WifiOff } from 'lucide-react';


export function ProductDetailClient({ product }: { product: IProduct }) {
  // Safe access to imageUrls with fallback
  const imageUrls = product?.imageUrls || [];
  const [primaryImage, setPrimaryImage] = useState(imageUrls[0] || '');

  // Handle case where product might be incomplete
  if (!product) {
    return <ProductDetailSkeleton />;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
        <div className="w-full">
          <div className="relative aspect-square w-full overflow-hidden rounded-lg shadow-lg mb-4 bg-slate-100 dark:bg-slate-800">
            {primaryImage ? (
              <Image
                src={primaryImage}
                alt={product.name || 'Product image'}
                fill
                className="h-full w-full object-cover transition-all duration-300"
                data-ai-hint="product image"
                key={primaryImage}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjFmNWY5Ii8+PC9zdmc+"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400">
                No image available
              </div>
            )}
          </div>
          {imageUrls.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {imageUrls.map((url, index) => (
                 <div
                  key={index}
                  className={cn(
                    "relative aspect-square w-full overflow-hidden rounded-md cursor-pointer border-2 transition-all",
                    url === primaryImage ? 'border-indigo-500 ring-2 ring-indigo-500/30' : 'border-transparent hover:border-indigo-400'
                  )}
                  onClick={() => setPrimaryImage(url)}
                >
                  <Image
                    src={url}
                    alt={`${product.name || 'Product'} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    data-ai-hint="product thumbnail"
                    sizes="10vw"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjFmNWY5Ii8+PC9zdmc+"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col h-full">
          <div>
            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">
              {(typeof product.category === 'object' && product.category?.name) || 'Uncategorized'}
            </p>
            <h1 className="text-3xl md:text-4xl font-headline font-bold mb-4 text-slate-800 dark:text-white">
              {product.name || 'Unnamed Product'}
            </h1>
            <p className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
              {formatCurrency(product.price || 0)}
            </p>
            <p className="text-base text-foreground/80 leading-relaxed mb-6">
              {product.description || 'No description available.'}
            </p>
          </div>
          <div className="mt-auto">
             <div className="flex items-center gap-4 mb-6">
              <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
                (product.stock ?? 0) > 0 
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                  : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
              }`}>
                <span className={`w-2 h-2 rounded-full ${(product.stock ?? 0) > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                {(product.stock ?? 0) > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
        <div>
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="grid grid-cols-5 gap-2 mt-4">
            <Skeleton className="aspect-square w-full rounded-md" />
            <Skeleton className="aspect-square w-full rounded-md" />
            <Skeleton className="aspect-square w-full rounded-md" />
            <Skeleton className="aspect-square w-full rounded-md" />
            <Skeleton className="aspect-square w-full rounded-md" />
          </div>
        </div>
        <div className="space-y-6">
          <Skeleton className="h-5 w-1/4" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
}

// Error state component for connection/loading failures
export function ProductErrorState({ 
  productId, 
  errorType 
}: { 
  productId: string; 
  errorType: 'connection_error' | 'unknown_error';
}) {
  const isConnectionError = errorType === 'connection_error';
  
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="relative mx-auto mb-8">
          <div className={`absolute inset-0 ${isConnectionError ? 'bg-orange-500/10' : 'bg-red-500/10'} blur-3xl rounded-full`} />
          <div className={`relative w-20 h-20 mx-auto ${
            isConnectionError 
              ? 'bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950/50 dark:to-yellow-950/50 border-orange-200 dark:border-orange-900' 
              : 'bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/50 dark:to-orange-950/50 border-red-200 dark:border-red-900'
          } rounded-full flex items-center justify-center border-2 shadow-xl`}>
            {isConnectionError ? (
              <WifiOff className="w-10 h-10 text-orange-500 dark:text-orange-400" />
            ) : (
              <AlertTriangle className="w-10 h-10 text-red-500 dark:text-red-400" />
            )}
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white mb-3">
          {isConnectionError ? 'Connection Issue' : 'Something went wrong'}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          {isConnectionError 
            ? 'We\'re having trouble connecting to our servers. This usually resolves quickly.'
            : 'We encountered an unexpected error while loading this product.'}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => window.location.reload()}
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
            Back to Shop
          </Link>
        </div>

        {/* Help Text */}
        <p className="mt-8 text-sm text-slate-500 dark:text-slate-500">
          If the problem persists, please try again in a few moments.
        </p>
      </div>
    </div>
  );
}


// 'use client';

// import { useState } from 'react';
// import Image from 'next/image';
// import type { IProduct } from '@/types';
// import { formatCurrency, cn } from '@/lib/utils';
// import { AddToCartButton } from '@/components/store/AddToCartButton';
// import { Skeleton } from '@/components/ui/skeleton';
// import { Package, CheckCircle, AlertCircle, Tag } from 'lucide-react';

// export function ProductDetailClient({ product }: { product: IProduct }) {
//   // ✅ Prevent crash if product.imageUrls is undefined or empty
//   const [primaryImage, setPrimaryImage] = useState(
//     product?.imageUrls?.[0] || '/placeholder.png'
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
//           {/* Image Gallery */}
//           <div className="w-full">
//             <div className="relative aspect-square w-full overflow-hidden rounded-3xl shadow-2xl mb-6 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700">
//               {primaryImage ? (
//                 <Image
//                   src={primaryImage}
//                   alt={product.name || 'Product image'}
//                   fill
//                   className="h-full w-full object-cover transition-all duration-500 hover:scale-105"
//                   data-ai-hint="product image"
//                   key={primaryImage}
//                   sizes="(max-width: 768px) 100vw, 50vw"
//                   priority
//                 />
//               ) : (
//                 <Skeleton className="h-full w-full rounded-3xl" />
//               )}
//             </div>

//             {product?.imageUrls && product.imageUrls.length > 1 && (
//               <div className="grid grid-cols-5 gap-3">
//                 {product.imageUrls.map((url, index) => (
//                   <div
//                     key={index}
//                     className={cn(
//                       // ✅ replaced invalid Tailwind class `border-3` with valid `border`
//                       "relative aspect-square w-full overflow-hidden rounded-xl cursor-pointer border transition-all duration-300 hover:scale-105",
//                       url === primaryImage
//                         ? 'border-indigo-500 ring-4 ring-indigo-500/30 shadow-lg'
//                         : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 shadow-md'
//                     )}
//                     onClick={() => setPrimaryImage(url)}
//                   >
//                     <Image
//                       src={url}
//                       alt={`${product.name || 'Product'} thumbnail ${index + 1}`}
//                       fill
//                       className="object-cover"
//                       data-ai-hint="product thumbnail"
//                       sizes="20vw"
//                     />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Product Info */}
//           <div className="flex flex-col h-full">
//             <div className="space-y-6">
//               {/* Category Badge */}
//               {product?.category?.name && (
//                 <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-full text-sm font-semibold w-fit">
//                   <Tag className="w-4 h-4" />
//                   {product.category.name}
//                 </div>
//               )}

//               {/* Product Name */}
//               <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white leading-tight">
//                 {product.name || 'Unnamed Product'}
//               </h1>

//               {/* Price */}
//               <div className="flex items-baseline gap-3">
//                 <p className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//                   {formatCurrency(product?.price || 0)}
//                 </p>
//               </div>

//               {/* Stock Status */}
//               <div className="flex items-center gap-2">
//                 {product?.stock && product.stock > 0 ? (
//                   <div className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-950/50 text-green-700 dark:text-green-400 px-4 py-2 rounded-full text-sm font-semibold">
//                     <CheckCircle className="w-4 h-4" />
//                     <span>{product.stock} in stock</span>
//                   </div>
//                 ) : (
//                   <div className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-400 px-4 py-2 rounded-full text-sm font-semibold">
//                     <AlertCircle className="w-4 h-4" />
//                     <span>Out of stock</span>
//                   </div>
//                 )}
//               </div>

//               {/* Description */}
//               <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
//                 <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
//                   <Package className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
//                   Product Description
//                 </h3>
//                 <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
//                   {product?.description || 'No description available.'}
//                 </p>
//               </div>
//             </div>

//             {/* Add to Cart Button */}
//             <div className="mt-8">
//               <AddToCartButton product={product} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export function ProductDetailSkeleton() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
//           <div>
//             <Skeleton className="aspect-square w-full rounded-3xl" />
//             <div className="grid grid-cols-5 gap-3 mt-6">
//               {[...Array(5)].map((_, i) => (
//                 <Skeleton key={i} className="aspect-square w-full rounded-xl" />
//               ))}
//             </div>
//           </div>
//           <div className="space-y-6">
//             <Skeleton className="h-10 w-32 rounded-full" />
//             <Skeleton className="h-12 w-3/4" />
//             <Skeleton className="h-16 w-1/3" />
//             <Skeleton className="h-10 w-40 rounded-full" />
//             <Skeleton className="h-32 w-full rounded-2xl" />
//             <Skeleton className="h-14 w-full rounded-full" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
