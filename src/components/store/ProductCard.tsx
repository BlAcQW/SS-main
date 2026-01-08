// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { IProduct } from '@/types';
// import { formatCurrency } from '@/lib/utils';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { useCart } from '@/hooks/useCart';
// import { ShoppingCart } from 'lucide-react';

// interface ProductCardProps {
//   product: IProduct;
// }

// export const ProductCard = ({ product }: ProductCardProps) => {
//   const { addItem } = useCart();

//   return (
//     <Card className="flex h-full flex-col overflow-hidden rounded-lg shadow-lg transition-all hover:shadow-xl">
//       <CardHeader className="p-0">
//         <Link href={`/product/${product._id}`} className="block">
//           <div className="aspect-square w-full overflow-hidden">
//             <Image
//               src={product.imageUrls[0]}
//               alt={product.name}
//               width={400}
//               height={400}
//               className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
//               data-ai-hint="product image"
//             />
//           </div>
//         </Link>
//       </CardHeader>
//       <CardContent className="flex-1 p-4">
//         <Link href={`/product/${product._id}`}>
//           <CardTitle className="mb-2 font-headline text-lg leading-tight hover:text-primary">
//             {product.name}
//           </CardTitle>
//         </Link>
//         <p className="text-sm text-muted-foreground">
//           {product.category?.name || 'Uncategorized'}
//         </p>
//       </CardContent>
//       <CardFooter className="flex items-center justify-between p-4 pt-0">
//         <p className="text-lg font-semibold text-primary">
//           {formatCurrency(product.price)}
//         </p>
//         <Button onClick={() => addItem(product)} size="sm">
//           <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// };


'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IProduct, ProductTag } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/hooks/useCart';
import { ShoppingCart, Flame, Zap, Sparkles, Star, Crown, Check } from 'lucide-react';

// Tag configuration for display
const TAG_CONFIG: Record<ProductTag, { icon: typeof Flame; color: string; bgColor: string; textColor: string }> = {
  'Hot Selling': { icon: Flame, color: 'text-white', bgColor: 'bg-gradient-to-r from-orange-500 to-red-500', textColor: 'text-white' },
  'Flash Sale': { icon: Zap, color: 'text-white', bgColor: 'bg-gradient-to-r from-yellow-500 to-orange-500', textColor: 'text-white' },
  'New Products': { icon: Sparkles, color: 'text-white', bgColor: 'bg-gradient-to-r from-blue-500 to-cyan-500', textColor: 'text-white' },
  'Best Seller': { icon: Star, color: 'text-white', bgColor: 'bg-gradient-to-r from-green-500 to-emerald-500', textColor: 'text-white' },
  'Limited Edition': { icon: Crown, color: 'text-white', bgColor: 'bg-gradient-to-r from-purple-500 to-pink-500', textColor: 'text-white' },
};

interface ProductCardProps {
  product: IProduct;
  priority?: boolean; // For above-the-fold images
}

export const ProductCard = ({ product, priority = false }: ProductCardProps) => {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAdding(true);
    addItem(product);
    
    setTimeout(() => {
      setIsAdding(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1200);
    }, 150);
  };

  return (
    <Card className="group flex h-full flex-col overflow-hidden rounded-xl sm:rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 border-0 bg-white dark:bg-slate-800">
      <CardHeader className="p-0">
        <Link href={`/product/${product._id}`} className="block relative">
          <div className="aspect-square w-full overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800">
            <Image
              src={product.imageUrls[0]}
              alt={product.name}
              width={400}
              height={400}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              data-ai-hint="product image"
              loading={priority ? 'eager' : 'lazy'}
              priority={priority}
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjFmNWY5Ii8+PC9zdmc+"
            />
            {/* Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Product Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 flex flex-col gap-1">
                {product.tags.slice(0, 2).map((tag) => {
                  const config = TAG_CONFIG[tag as ProductTag];
                  if (!config) return null;
                  const IconComponent = config.icon;
                  return (
                    <span
                      key={tag}
                      className={`${config.bgColor} ${config.textColor} text-[7px] sm:text-xs font-semibold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full flex items-center gap-0.5 sm:gap-1 shadow-lg`}
                    >
                      <IconComponent className="h-2.5 w-2.5 sm:h-3 sm:w-3 flex-shrink-0" />
                      <span className="truncate max-w-[50px] sm:max-w-none">{tag}</span>
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        </Link>
      </CardHeader>
      <CardContent className="flex-1 p-3 sm:p-5">
        <Link href={`/product/${product._id}`}>
          <p className="text-[10px] sm:text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1 sm:mb-2">
            {product.category?.name || 'Uncategorized'}
          </p>
          <CardTitle className="mb-2 sm:mb-3 font-bold text-sm sm:text-lg leading-tight text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
            {product.name}
          </CardTitle>
        </Link>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-3 sm:p-5 pt-0 gap-2">
        <p className="text-base sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          {formatCurrency(product.price)}
        </p>
        <Button 
          onClick={handleAddToCart}
          size="sm"
          className={`
            rounded-full px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm 
            transition-all duration-200 shadow-md
            ${showSuccess 
              ? 'bg-green-500 hover:bg-green-600 animate-cart-add' 
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
            }
            ${isAdding ? 'scale-95' : 'hover:scale-105'}
            hover:shadow-lg hover:shadow-indigo-500/20
            active:scale-95
          `}
          disabled={isAdding}
        >
          {showSuccess ? (
            <Check className="h-3 w-3 sm:h-4 sm:w-4" />
          ) : (
            <>
              <ShoppingCart className={`h-3 w-3 sm:h-4 sm:w-4 sm:mr-2 ${isAdding ? 'animate-icon-bounce' : ''}`} />
              <span className="hidden sm:inline">Add</span>
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};