// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { useCart } from '@/hooks/useCart';
// import { formatCurrency } from '@/lib/utils';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Separator } from '@/components/ui/separator';
// import { Trash2, ShoppingBag } from 'lucide-react';
// import { Skeleton } from '@/components/ui/skeleton';

// export default function CartPage() {
//   const { items, removeItem, updateQuantity, totalItems, totalPrice, isHydrated } = useCart();

//   if (!isHydrated) {
//     return <CartSkeleton />;
//   }

//   if (items.length === 0) {
//     return (
//       <div className="container mx-auto px-4 py-16 text-center">
//         <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground" />
//         <h1 className="mt-8 text-3xl font-headline font-bold">Your Cart is Empty</h1>
//         <p className="mt-4 text-lg text-muted-foreground">
//           Looks like you haven't added anything to your cart yet.
//         </p>
//         <Button asChild className="mt-8">
//           <Link href="/">Start Shopping</Link>
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
//       <h1 className="text-3xl md:text-4xl font-headline font-bold mb-8">Your Shopping Cart</h1>
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
//         <div className="lg:col-span-2 space-y-6">
//           {items.map((item) => (
//             <Card key={item._id} className="flex flex-col sm:flex-row items-center p-4 gap-4">
//               <div className="relative h-24 w-24 sm:h-28 sm:w-28 flex-shrink-0 overflow-hidden rounded-md">
//                 <Image
//                   src={item.imageUrls[0]}
//                   alt={item.name}
//                   fill
//                   className="object-cover"
//                   data-ai-hint="product image"
//                 />
//               </div>
//               <div className="flex-1 w-full">
//                 <div className="flex justify-between items-start">
//                   <h2 className="font-headline font-semibold text-lg">{item.name}</h2>
//                   <Button variant="ghost" size="icon" onClick={() => removeItem(item._id)} className="sm:hidden">
//                       <Trash2 className="h-5 w-5 text-muted-foreground hover:text-destructive" />
//                   </Button>
//                 </div>
//                 <p className="text-sm text-muted-foreground mb-2">
//                   {formatCurrency(item.price)}
//                 </p>
//                 <div className="flex items-center justify-between">
//                   <Input
//                     type="number"
//                     min="1"
//                     max={item.stock}
//                     value={item.quantity}
//                     onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
//                     className="h-9 w-20"
//                   />
//                    <p className="font-semibold sm:hidden">{formatCurrency(item.price * item.quantity)}</p>
//                 </div>
//               </div>
//               <div className="hidden sm:flex flex-col items-end space-y-2">
//                  <p className="font-semibold text-lg">{formatCurrency(item.price * item.quantity)}</p>
//                  <Button variant="ghost" size="icon" onClick={() => removeItem(item._id)}>
//                     <Trash2 className="h-5 w-5 text-muted-foreground hover:text-destructive" />
//                  </Button>
//               </div>
//             </Card>
//           ))}
//         </div>
        
//         <div className="lg:col-span-1">
//             <Card className="sticky top-24">
//                 <CardHeader>
//                     <CardTitle className="font-headline">Order Summary</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                     <div className="flex justify-between">
//                         <span>Subtotal ({totalItems} items)</span>
//                         <span>{formatCurrency(totalPrice)}</span>
//                     </div>
//                      <div className="flex justify-between">
//                         <span>Shipping</span>
//                         <span>Free</span>
//                     </div>
//                     <Separator />
//                      <div className="flex justify-between font-bold text-lg">
//                         <span>Total</span>
//                         <span>{formatCurrency(totalPrice)}</span>
//                     </div>
//                 </CardContent>
//                 <CardFooter>
//                     <Button asChild size="lg" className="w-full">
//                         <Link href="/checkout">Proceed to Checkout</Link>
//                     </Button>
//                 </CardFooter>
//             </Card>
//         </div>
//       </div>
//     </div>
//   );
// }

// function CartSkeleton() {
//   return (
//     <div className="container mx-auto px-4 py-12">
//       <Skeleton className="h-10 w-1/3 mb-8" />
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
//         <div className="lg:col-span-2 space-y-6">
//           {[...Array(2)].map((_, i) => (
//             <Card key={i} className="flex items-center p-4">
//               <Skeleton className="h-24 w-24 rounded-md" />
//               <div className="ml-6 flex-1 space-y-2">
//                 <Skeleton className="h-6 w-3/4" />
//                 <Skeleton className="h-5 w-1/4" />
//                 <Skeleton className="h-9 w-20" />
//               </div>
//               <div className="flex flex-col items-end space-y-2">
//                  <Skeleton className="h-6 w-16" />
//                  <Skeleton className="h-10 w-10" />
//               </div>
//             </Card>
//           ))}
//         </div>
//         <div className="lg:col-span-1">
//             <Card>
//                 <CardHeader>
//                     <Skeleton className="h-8 w-1/2" />
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                     <Skeleton className="h-6 w-full" />
//                     <Skeleton className="h-6 w-full" />
//                     <Separator />
//                     <Skeleton className="h-8 w-full" />
//                 </CardContent>
//                 <CardFooter>
//                     <Skeleton className="h-12 w-full" />
//                 </CardFooter>
//             </Card>
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Trash2, ShoppingBag, Minus, Plus } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, isHydrated } = useCart();

  if (!isHydrated) {
    return <CartSkeleton />;
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="relative mb-8 inline-block">
            <div className="absolute inset-0 bg-indigo-500/10 blur-3xl rounded-full"></div>
            <div className="relative bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 p-12 rounded-full border border-indigo-100 dark:border-indigo-900">
              <ShoppingBag className="h-20 w-20 text-indigo-400 dark:text-indigo-500" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">Your Cart is Empty</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Button asChild className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105">
            <Link href="/">Start Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">Your Shopping Cart</h1>
          <p className="text-slate-600 dark:text-slate-400">{totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item._id} className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow bg-white dark:bg-slate-800 rounded-2xl">
                <div className="flex flex-col sm:flex-row items-center p-6 gap-6">
                  <div className="relative h-28 w-28 sm:h-32 sm:w-32 flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800">
                    <Image
                      src={item.imageUrls[0]}
                      alt={item.name}
                      fill
                      className="object-cover"
                      data-ai-hint="product image"
                    />
                  </div>
                  
                  <div className="flex-1 w-full">
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="font-bold text-xl text-slate-800 dark:text-white">{item.name}</h2>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeItem(item._id)} 
                        className="sm:hidden hover:bg-red-50 dark:hover:bg-red-950/50 hover:text-red-600 rounded-full transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                    
                    <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-4">
                      {formatCurrency(item.price)} each
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-700 rounded-full p-1">
                        <button
                          onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                          className="h-8 w-8 rounded-full bg-white dark:bg-slate-600 hover:bg-slate-200 dark:hover:bg-slate-500 transition-colors flex items-center justify-center"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-12 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, Math.min(item.stock, item.quantity + 1))}
                          className="h-8 w-8 rounded-full bg-white dark:bg-slate-600 hover:bg-slate-200 dark:hover:bg-slate-500 transition-colors flex items-center justify-center"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="font-bold text-xl sm:hidden bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="hidden sm:flex flex-col items-end space-y-4">
                    <p className="font-bold text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeItem(item._id)}
                      className="hover:bg-red-50 dark:hover:bg-red-950/50 hover:text-red-600 rounded-full transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-0 shadow-lg bg-white dark:bg-slate-800 rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 border-b border-indigo-100 dark:border-indigo-900">
                <CardTitle className="text-2xl font-bold text-slate-800 dark:text-white">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
                  <span className="font-semibold text-slate-800 dark:text-white">{formatCurrency(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">Free</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-slate-800 dark:text-white">Total</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild size="lg" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full py-6 text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105">
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Skeleton className="h-12 w-1/3 mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {[...Array(2)].map((_, i) => (
            <Card key={i} className="flex items-center p-6 rounded-2xl">
              <Skeleton className="h-32 w-32 rounded-xl" />
              <div className="ml-6 flex-1 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-5 w-1/4" />
                <Skeleton className="h-10 w-32" />
              </div>
              <div className="flex flex-col items-end space-y-3">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>
            </Card>
          ))}
        </div>
        <div className="lg:col-span-1">
          <Card className="rounded-2xl">
            <CardHeader>
              <Skeleton className="h-8 w-1/2" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Separator />
              <Skeleton className="h-8 w-full" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-14 w-full rounded-full" />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}