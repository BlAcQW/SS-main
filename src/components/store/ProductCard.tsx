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

import Image from 'next/image';
import Link from 'next/link';
import { IProduct } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/hooks/useCart';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: IProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();

  return (
    <Card className="group flex h-full flex-col overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white dark:bg-slate-800">
      <CardHeader className="p-0">
        <Link href={`/product/${product._id}`} className="block relative">
          <div className="aspect-square w-full overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800">
            <Image
              src={product.imageUrls[0]}
              alt={product.name}
              width={400}
              height={400}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              data-ai-hint="product image"
            />
            {/* Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="flex-1 p-5">
        <Link href={`/product/${product._id}`}>
          <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">
            {product.category?.name || 'Uncategorized'}
          </p>
          <CardTitle className="mb-3 font-bold text-lg leading-tight text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
            {product.name}
          </CardTitle>
        </Link>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-5 pt-0">
        <p className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          {formatCurrency(product.price)}
        </p>
        <Button 
          onClick={() => addItem(product)} 
          size="sm"
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-4 py-2 transition-all hover:scale-105 shadow-md"
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> Add
        </Button>
      </CardFooter>
    </Card>
  );
};