'use client';

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { IProduct } from "@/types";
import { ShoppingCart } from "lucide-react";

export function AddToCartButton({ product }: { product: IProduct }) {
  const { addItem } = useCart();
  return (
    <Button
      onClick={() => addItem(product)}
      size="lg"
      className="w-full"
      disabled={product.stock < 1}
    >
      <ShoppingCart className="mr-2 h-5 w-5" />
      {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
    </Button>
  );
}
