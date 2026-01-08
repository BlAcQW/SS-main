// import { IProduct } from '@/types';
// import { ProductCard } from './ProductCard';

// interface ProductGridProps {
//   products: IProduct[];
// }

// export const ProductGrid = ({ products }: ProductGridProps) => {
//   if (products.length === 0) {
//     return (
//       <div className="text-center py-16">
//         <h2 className="text-2xl font-headline font-semibold">No Products Found</h2>
//         <p className="text-muted-foreground mt-2">Try adjusting your search or category filters.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//       {products.map((product) => (
//         <ProductCard key={product._id} product={product} />
//       ))}
//     </div>
//   );
// };

import { IProduct } from '@/types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: IProduct[];
}

export const ProductGrid = ({ products }: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-indigo-500/10 blur-3xl rounded-full"></div>
          <div className="relative bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 p-12 rounded-full border border-indigo-100 dark:border-indigo-900">
            <svg className="w-20 h-20 text-indigo-400 dark:text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-3">No Products Found</h2>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-md text-center">Try adjusting your search or category filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product, index) => (
        <ProductCard 
          key={product._id} 
          product={product} 
          priority={index < 4} // Prioritize first 4 images (above the fold)
        />
      ))}
    </div>
  );
};
