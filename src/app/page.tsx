import { Suspense } from 'react';
import { ProductGrid } from '@/components/store/ProductGrid';
import { Skeleton } from '@/components/ui/skeleton';
import { ICategory, IProduct } from '@/types';
import dbConnect from '@/lib/mongodb';
import Category from '@/models/Category';
import Product from '@/models/Product';
import { ProductFilters } from '@/components/store/ProductFilters';
import { HeroCarousel } from '@/components/store/HeroCarousel';
import { Sparkles, ArrowRight, Zap, Shield, Truck } from 'lucide-react';
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

  // Get Hot Selling products for the hero carousel
  const hotSellingProducts = allProducts.filter(
    product => product.tags?.includes('Hot Selling')
  ).slice(0, 5);

  // Fallback to first 5 products if no Hot Selling products
  const carouselProducts = hotSellingProducts.length > 0 
    ? hotSellingProducts 
    : allProducts.slice(0, 5);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl" />
        </div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
          {/* Top Section - Brand Header */}
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            {/* Announcement Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6 animate-hero-badge border border-white/20">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
              <span className="text-xs sm:text-sm font-medium text-white">New Arrivals Weekly</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-3 sm:mb-4 leading-tight animate-hero-title">
              StricherTech
              <span className="block bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-400 bg-clip-text text-transparent">
                Gadgets
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-base sm:text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-4 sm:mb-6 leading-relaxed animate-hero-description">
              Elevate your world with cutting-edge devices that blend innovation and style
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 animate-hero-cta">
              <Link
                href="#products"
                className="group bg-white text-indigo-600 px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-full font-semibold text-sm sm:text-base hover:bg-white/90 transition-all hover:scale-105 shadow-xl flex items-center gap-2"
              >
                Shop Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/repair"
                className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-full font-semibold text-sm sm:text-base hover:bg-white/20 transition-all"
              >
                Fix your Device
              </Link>
            </div>
          </div>
          
          {/* Hot Selling Products Carousel */}
          {carouselProducts.length > 0 && (
            <div className="mt-6 sm:mt-8 md:mt-10">
              <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
                <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white">Hot Selling Products</h2>
              </div>
              <HeroCarousel products={carouselProducts} />
            </div>
          )}
          
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-white/10">
            <div className="flex items-center gap-2 text-white/70">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm">Secure Payment</span>
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm">Fast Delivery</span>
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm">Quality Guaranteed</span>
            </div>
          </div>
        </div>
        
        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent" />
      </section>

      {/* Search and Filter Bar */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <ProductFilters categories={categories} maxPrice={maxProductPrice} />
        </div>
      </div>

      <div id="products" className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 scroll-mt-20">
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