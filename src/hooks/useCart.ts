'use client';

import * as React from 'react';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { toast } from '@/hooks/use-toast';
import type { ICartItem, IProduct } from '@/types';

interface CartState {
  items: ICartItem[];
  addItem: (product: IProduct) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      addItem: (product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item._id === product._id);

        if (existingItem) {
          toast({
            title: `${product.name} is already in the cart.`,
            variant: 'default',
          });
          return;
        }

        if (product.stock < 1) {
          toast({
            title: `${product.name} is out of stock.`,
            variant: 'destructive',
          });
          return;
        }

        set((state) => {
          const newItems = [...state.items, { ...product, quantity: 1 }];
          const { totalItems, totalPrice } = calculateTotals(newItems);
          return { items: newItems, totalItems, totalPrice };
        });
        toast({
          title: 'Added to cart',
          description: `${product.name} has been added to your cart.`,
        });
      },
      removeItem: (productId) => {
        set((state) => {
          const newItems = state.items.filter((item) => item._id !== productId);
          const { totalItems, totalPrice } = calculateTotals(newItems);
          return { items: newItems, totalItems, totalPrice };
        });
         toast({
          title: 'Item removed',
          description: `Item has been removed from your cart.`,
        });
      },
      updateQuantity: (productId, quantity) => {
        set((state) => {
          const newItems = state.items.map((item) =>
            item._id === productId ? { ...item, quantity } : item
          );
          const { totalItems, totalPrice } = calculateTotals(newItems);
          return { items: newItems, totalItems, totalPrice };
        });
      },
      clearCart: () => {
        set({ items: [], totalItems: 0, totalPrice: 0 });
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          const { totalItems, totalPrice } = calculateTotals(state.items);
          state.totalItems = totalItems;
          state.totalPrice = totalPrice;
        }
      },
    }
  )
);

const calculateTotals = (items: ICartItem[]) => {
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
  return { totalItems, totalPrice };
};

// Custom hook to use the store
export const useCart = () => {
  const { items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCartStore();
  
  // This ensures that the store is rehydrated on the client before returning values
  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => {
    setHydrated(true);
  }, []);

  return {
    items: hydrated ? items : [],
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems: hydrated ? totalItems : 0,
    totalPrice: hydrated ? totalPrice : 0,
    isHydrated: hydrated,
  };
};
