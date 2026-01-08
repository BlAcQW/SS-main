'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { IProduct } from "@/types";
import { ShoppingCart, Check } from "lucide-react";

export function AddToCartButton({ product }: { product: IProduct }) {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCart = () => {
    if (product.stock < 1) return;
    
    setIsAdding(true);
    addItem(product);
    
    // Show success state
    setTimeout(() => {
      setIsAdding(false);
      setShowSuccess(true);
      
      // Reset after showing success
      setTimeout(() => {
        setShowSuccess(false);
      }, 1500);
    }, 200);
  };

  return (
    <Button
      onClick={handleAddToCart}
      size="lg"
      className={`
        w-full rounded-full font-semibold text-base
        transition-all duration-300 ease-out
        ${showSuccess 
          ? 'bg-green-500 hover:bg-green-600 animate-cart-add' 
          : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
        }
        ${isAdding ? 'animate-btn-click' : ''}
        hover:shadow-lg hover:shadow-indigo-500/25
        active:scale-[0.98]
        disabled:from-slate-400 disabled:to-slate-500 disabled:cursor-not-allowed
        btn-glow
      `}
      disabled={product.stock < 1 || isAdding}
    >
      {showSuccess ? (
        <>
          <Check className="mr-2 h-5 w-5" />
          Added to Cart!
        </>
      ) : (
        <>
          <ShoppingCart className={`mr-2 h-5 w-5 ${isAdding ? 'animate-icon-bounce' : ''}`} />
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </>
      )}
    </Button>
  );
}
