

import { Suspense } from 'react';
import { ProductGrid } from '@/components/store/ProductGrid';
import { Skeleton } from '@/components/ui/skeleton';
import { ICategory, IProduct } from '@/types';
import dbConnect from '@/lib/mongodb';
import Category from '@/models/Category';
import Product from '@/models/Product';
import { ProductFilters } from '@/components/store/ProductFilters';
import { Zap, Sparkles, TrendingUp, Search } from 'lucide-react';
import Link from 'next/link';
import CTASection from '@/components/footer2';

async function getCategories(): Promise<ICategory[]> {
  await dbConnect();
  const categories = await Category.find({}).lean();
  return JSON.parse(JSON.stringify(categories));
}

async function getProducts(): Promise<IProduct[]> {
  await dbConnect();
  const products = await Product.find({}).populate('category').lean();
  return JSON.parse(JSON.stringify(products));
}

export default async function Home({
  searchParams,
}: {
  searchParams: { 
    category?: string; 
    search?: string;
    minPrice?: string;
    maxPrice?: string;
    tag?: string;
  };
}) {
  const { category, search, minPrice, maxPrice, tag } = searchParams;
  
  const [categories, allProducts] = await Promise.all([
    getCategories(),
    getProducts()
  ]);
  
  const maxProductPrice = Math.max(...allProducts.map(p => p.price), 0);

  const filteredProducts = allProducts.filter(product => {
    const categoryId = product.category?._id.toString();
    const categoryMatch = !category || categoryId === category;
    const searchMatch = !search || product.name.toLowerCase().includes(search.toLowerCase());
    
    const price = Number(product.price);
    const minPriceMatch = !minPrice || price >= Number(minPrice);
    const maxPriceMatch = !maxPrice || price <= Number(maxPrice);
    
    // Tag filter
    const tagMatch = !tag || (product.tags && product.tags.includes(tag as any));

    return categoryMatch && searchMatch && minPriceMatch && maxPriceMatch && tagMatch;
  });

  const trendingProducts = filteredProducts.slice(0, 2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDEzNGg5djlsLTktOXoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">New Arrivals Weekly</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
              StricherTech
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                Gadgets
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
              Elevate your World with cutting-edge devices that blend innovation and style
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold hover:bg-opacity-90 transition-all hover:scale-105 shadow-xl">
                Shop Now
              </button>
              {/* <button className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all">
                Fix your Device
              </button> */}
              <Link
  href="/repair"
  className="inline-block bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all"
>
  Fix your Device
</Link>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent"></div>
      </div>

      {/* Search and Filter Bar */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <ProductFilters categories={categories} maxPrice={maxProductPrice} />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
       

        {/* Product Grid */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
            All Products ({filteredProducts.length})
          </h2>
          
          <Suspense fallback={<ProductGridSkeleton />}>
            <ProductGrid products={filteredProducts} />
          </Suspense>
        </div>
      </div>

      {/* Footer CTA */}
      <CTASection/>
    </div>
  );
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-6 w-1/4" />
        </div>
      ))}
    </div>
  );
}