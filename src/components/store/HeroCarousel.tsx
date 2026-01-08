'use client';

import { useEffect, useCallback, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { IProduct, ProductTag } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Flame, Zap, Sparkles, Star, Crown, ShoppingBag } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

// Tag configuration
const TAG_CONFIG: Record<ProductTag, { icon: typeof Flame; gradient: string }> = {
  'Hot Selling': { icon: Flame, gradient: 'from-orange-500 to-red-500' },
  'Flash Sale': { icon: Zap, gradient: 'from-yellow-500 to-orange-500' },
  'New Products': { icon: Sparkles, gradient: 'from-blue-500 to-cyan-500' },
  'Best Seller': { icon: Star, gradient: 'from-green-500 to-emerald-500' },
  'Limited Edition': { icon: Crown, gradient: 'from-purple-500 to-pink-500' },
};

interface HeroCarouselProps {
  products: IProduct[];
}

export const HeroCarousel = ({ products }: HeroCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    skipSnaps: false,
    dragFree: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const { addItem } = useCart();

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  // Auto-play functionality
  useEffect(() => {
    if (!emblaApi) return;
    
    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);

    return () => clearInterval(autoplay);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  if (!products || products.length === 0) return null;

  return (
    <div className="relative w-full">
      {/* Carousel Container */}
      <div className="overflow-hidden rounded-2xl sm:rounded-3xl" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {products.map((product, index) => {
            const primaryTag = product.tags?.[0] as ProductTag;
            const tagConfig = primaryTag ? TAG_CONFIG[primaryTag] : null;
            const TagIcon = tagConfig?.icon;

            return (
              <div
                key={product._id}
                className="relative flex-none w-full min-w-0 pl-0"
              >
                <div className="relative aspect-[4/3] sm:aspect-[16/9] md:aspect-[2/1] overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800">
                  {/* Background Image with Overlay */}
                  <Image
                    src={product.imageUrls[0]}
                    alt={product.name}
                    fill
                    className="object-cover opacity-40"
                    sizes="100vw"
                    priority={index === 0}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex items-center">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center">
                        {/* Text Content */}
                        <div className="space-y-2 sm:space-y-4 z-10">
                          {/* Tag Badge */}
                          {tagConfig && TagIcon && (
                            <div 
                              className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-gradient-to-r ${tagConfig.gradient} text-white text-xs sm:text-sm font-semibold animate-hero-badge`}
                            >
                              <TagIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span>{primaryTag}</span>
                            </div>
                          )}
                          
                          {/* Product Name */}
                          <h3 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight line-clamp-2 animate-hero-title">
                            {product.name}
                          </h3>
                          
                          {/* Description */}
                          <p className="text-sm sm:text-base md:text-lg text-white/80 line-clamp-2 max-w-lg animate-hero-description">
                            {product.description}
                          </p>
                          
                          {/* Price and CTA */}
                          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2 sm:pt-4 animate-hero-cta">
                            <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                              {formatCurrency(product.price)}
                            </span>
                            
                            <div className="flex gap-2 sm:gap-3">
                              <Link
                                href={`/product/${product._id}`}
                                className="px-4 sm:px-6 py-2 sm:py-3 bg-white text-slate-900 rounded-full font-semibold text-sm sm:text-base hover:bg-white/90 transition-all hover:scale-105 shadow-lg"
                              >
                                View Details
                              </Link>
                              <button
                                onClick={() => addItem(product)}
                                className="px-3 sm:px-4 py-2 sm:py-3 bg-white/20 backdrop-blur-sm text-white rounded-full font-semibold text-sm sm:text-base hover:bg-white/30 transition-all border border-white/30 flex items-center gap-2"
                              >
                                <ShoppingBag className="w-4 h-4" />
                                <span className="hidden sm:inline">Add to Cart</span>
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        {/* Product Image (Desktop) */}
                        <div className="hidden md:flex justify-center items-center">
                          <div className="relative w-64 h-64 lg:w-80 lg:h-80 animate-hero-image">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-3xl blur-2xl" />
                            <Image
                              src={product.imageUrls[0]}
                              alt={product.name}
                              fill
                              className="object-contain drop-shadow-2xl"
                              sizes="(max-width: 1024px) 256px, 320px"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={scrollPrev}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/30 transition-all border border-white/30 z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
      </button>
      
      <button
        onClick={scrollNext}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/30 transition-all border border-white/30 z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-10">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
              index === selectedIndex
                ? 'bg-white w-6 sm:w-8'
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
