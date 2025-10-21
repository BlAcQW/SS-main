// 'use client';

// import { useCallback } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { ICategory } from '@/types';
// import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Slider } from '@/components/ui/slider';
// import { Search } from 'lucide-react';
// import { formatCurrency } from '@/lib/utils';
// import { useDebouncedCallback } from 'use-debounce';
// import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

// interface ProductFiltersProps {
//   categories: ICategory[];
//   maxPrice: number;
// }

// export const ProductFilters = ({ categories, maxPrice }: ProductFiltersProps) => {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const currentCategory = searchParams.get('category') || 'all';
//   const currentSearch = searchParams.get('search') || '';
//   const currentMinPrice = Number(searchParams.get('minPrice')) || 0;
//   const currentMaxPrice = Number(searchParams.get('maxPrice')) || maxPrice;
  
//   const createQueryString = useCallback(
//     (name: string, value: string) => {
//       const params = new URLSearchParams(searchParams.toString())
//       if (value) {
//         params.set(name, value)
//       } else {
//         params.delete(name)
//       }
 
//       return params.toString()
//     },
//     [searchParams]
//   )

//   const handleCategoryChange = (value: string) => {
//     const newPath = createQueryString('category', value === 'all' ? '' : value);
//     router.push(`?${newPath}`, { scroll: false });
//   };
  
//   const handleSearchChange = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//     const newPath = createQueryString('search', e.target.value);
//     router.push(`?${newPath}`, { scroll: false });
//   }, 300);
  
//   const handlePriceChange = useDebouncedCallback(([min, max]: number[]) => {
//     let params = new URLSearchParams(searchParams.toString());
//     params.set('minPrice', String(min));
//     params.set('maxPrice', String(max));
//     router.push(`?${params.toString()}`, { scroll: false });
//   }, 300);


//   return (
//     <div className="space-y-6">
//       <ScrollArea className="w-full whitespace-nowrap">
//         <div className="flex justify-center">
//           <Tabs 
//             value={currentCategory} 
//             onValueChange={handleCategoryChange} 
//             className="w-max"
//           >
//             <TabsList className="bg-background/50 p-1 rounded-lg border">
//               <TabsTrigger value="all">All</TabsTrigger>
//               {categories.map((category) => (
//                 <TabsTrigger key={category._id} value={category._id}>
//                   {category.name}
//                 </TabsTrigger>
//               ))}
//             </TabsList>
//           </Tabs>
//         </div>
//         <ScrollBar orientation="horizontal" />
//       </ScrollArea>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
//          <div className="relative w-full max-w-lg mx-auto">
//            <Input
//             type="search"
//             placeholder="Search products..."
//             className="w-full rounded-full border-2 py-6 pl-12 pr-4"
//             defaultValue={currentSearch}
//             onChange={handleSearchChange}
//           />
//           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
//         </div>
        
//         <div className="flex flex-col gap-3">
//             <Label htmlFor="price-range" className="mb-2">Price Range</Label>
//             <div className="flex items-center gap-2 md:gap-4">
//                 <span className="text-xs md:text-sm">{formatCurrency(currentMinPrice)}</span>
//                  <Slider
//                     id="price-range"
//                     min={0}
//                     max={maxPrice}
//                     step={1}
//                     value={[currentMinPrice, currentMaxPrice]}
//                     onValueChange={handlePriceChange}
//                     minStepsBetweenThumbs={1}
//                     className="flex-1"
//                 />
//                 <span className="text-xs md:text-sm">{formatCurrency(currentMaxPrice)}</span>
//             </div>
//         </div>
//       </div>
//     </div>
//   );
// };


'use client';

import { useCallback, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ICategory } from '@/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { useDebouncedCallback } from 'use-debounce';

interface ProductFiltersProps {
  categories: ICategory[];
  maxPrice: number;
}

export const ProductFilters = ({ categories, maxPrice }: ProductFiltersProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  const currentCategory = searchParams.get('category') || 'all';
  const currentSearch = searchParams.get('search') || '';
  const currentMinPrice = Number(searchParams.get('minPrice')) || 0;
  const currentMaxPrice = Number(searchParams.get('maxPrice')) || maxPrice;
  
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(name, value)
      } else {
        params.delete(name)
      }
 
      return params.toString()
    },
    [searchParams]
  )

  const handleCategoryChange = (value: string) => {
    const newPath = createQueryString('category', value === 'all' ? '' : value);
    router.push(`?${newPath}`, { scroll: false });
  };
  
  const handleSearchChange = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newPath = createQueryString('search', e.target.value);
    router.push(`?${newPath}`, { scroll: false });
  }, 300);
  
  const handlePriceChange = useDebouncedCallback(([min, max]: number[]) => {
    let params = new URLSearchParams(searchParams.toString());
    params.set('minPrice', String(min));
    params.set('maxPrice', String(max));
    router.push(`?${params.toString()}`, { scroll: false });
  }, 300);

  return (
    <div className="space-y-4">
      {/* Search Bar and Filter Toggle */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            type="search"
            placeholder="Search for gadgets..."
            className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-indigo-500 focus:outline-none transition-colors text-base"
            defaultValue={currentSearch}
            onChange={handleSearchChange}
          />
        </div>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-medium whitespace-nowrap"
        >
          {showFilters ? (
            <>
              <X className="w-5 h-5" />
              <span>Close</span>
            </>
          ) : (
            <>
              <SlidersHorizontal className="w-5 h-5" />
              <span>Filters</span>
            </>
          )}
        </button>
      </div>

      {/* Expandable Filter Panel */}
      {showFilters && (
        <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl space-y-6 animate-in slide-in-from-top duration-300">
          {/* Category Pills */}
          <div>
            <Label className="text-sm font-semibold mb-3 block">Categories</Label>
            <div className="flex flex-wrap gap-2 md:gap-3">
              <button
                onClick={() => handleCategoryChange('all')}
                className={`px-5 py-2.5 rounded-full font-medium transition-all text-sm ${
                  currentCategory === 'all'
                    ? 'bg-indigo-600 text-white shadow-lg scale-105'
                    : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600'
                }`}
              >
                All Products
              </button>
              {categories.map((category) => (
                <button
                  key={category._id}
                  onClick={() => handleCategoryChange(category._id)}
                  className={`px-5 py-2.5 rounded-full font-medium transition-all text-sm ${
                    currentCategory === category._id
                      ? 'bg-indigo-600 text-white shadow-lg scale-105'
                      : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div>
            <Label className="text-sm font-semibold mb-3 block">
              Price Range: {formatCurrency(currentMinPrice)} - {formatCurrency(currentMaxPrice)}
            </Label>
            <div className="px-2">
              <Slider
                min={0}
                max={maxPrice}
                step={1}
                value={[currentMinPrice, currentMaxPrice]}
                onValueChange={handlePriceChange}
                minStepsBetweenThumbs={1}
                className="w-full"
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-slate-500 dark:text-slate-400">
              <span>{formatCurrency(0)}</span>
              <span>{formatCurrency(maxPrice)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Quick Category Pills (Always Visible) */}
      <div className="flex items-center justify-center gap-3 pb-2 ">
        <button
          onClick={() => handleCategoryChange('all')}
          className={`px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all ${
            currentCategory === 'all'
              ? 'bg-indigo-600 text-white shadow-lg scale-105'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
          }`}
        >
          All Products
        </button>
        {categories.map(category => (
          <button
            key={category._id}
            onClick={() => handleCategoryChange(category._id)}
            className={`px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all ${
              currentCategory === category._id
                ? 'bg-indigo-600 text-white shadow-lg scale-105'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};