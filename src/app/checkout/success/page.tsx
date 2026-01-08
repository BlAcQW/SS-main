// import Link from 'next/link';
// import Image from 'next/image';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Separator } from '@/components/ui/separator';
// import { CheckCircle, AlertTriangle } from 'lucide-react';
// import { IOrder } from '@/types';
// import { formatCurrency } from '@/lib/utils';
// import { notFound } from 'next/navigation';
// import { getOrder } from '@/app/actions';


// export default async function CheckoutSuccessPage({
//   searchParams,
// }: {
//   searchParams: { orderId?: string };
// }) {
//   const { orderId } = searchParams;

//   if (!orderId) {
//     notFound();
//   }

//   const order = await getOrder(orderId);

//   if (!order) {
//     return (
//       <div className="container mx-auto px-4 py-16 flex items-center justify-center">
//         <Card className="w-full max-w-lg text-center">
//           <CardHeader>
//             <div className="mx-auto bg-red-100 rounded-full h-16 w-16 flex items-center justify-center">
//               <AlertTriangle className="h-10 w-10 text-red-600" />
//             </div>
//             <CardTitle className="mt-4 text-3xl font-headline">Order Not Found</CardTitle>
//             <CardDescription className="text-lg">
//               We could not find the details for this order. Please check the ID or contact support.
//             </CardDescription>
//           </CardHeader>
//           <CardFooter className="flex-col gap-4">
//             <Button asChild className="w-full">
//               <Link href="/track">Track a Different Order</Link>
//             </Button>
//           </CardFooter>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-16 flex items-center justify-center">
//       <Card className="w-full max-w-2xl">
//         <CardHeader className="text-center">
//           <div className="mx-auto bg-green-100 rounded-full h-16 w-16 flex items-center justify-center">
//             <CheckCircle className="h-10 w-10 text-green-600" />
//           </div>
//           <CardTitle className="mt-4 text-3xl font-headline">Payment Successful!</CardTitle>
//           <CardDescription className="text-lg text-muted-foreground">
//             Thank you, {order.customerName}. Your order is confirmed.
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           <div className="text-center p-3 bg-muted rounded-md">
//             <p className="text-sm text-muted-foreground">Your Order ID is:</p>
//             <p className="font-mono text-lg font-semibold">{order._id}</p>
//           </div>

//           <div>
//             <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
//             <ul className="divide-y divide-border">
//               {order.items.map((item) => (
//                 <li key={String(item.product._id)} className="py-4 flex items-center gap-4">
//                   {item.product.imageUrls?.[0] && (
//                     <Image
//                       src={item.product.imageUrls[0]}
//                       alt={item.product.name}
//                       width={64}
//                       height={64}
//                       className="rounded-md object-cover"
//                       data-ai-hint="product image"
//                     />
//                   )}
//                   <div className="flex-1">
//                     <p className="font-medium">{item.product.name}</p>
//                     <p className="text-sm text-muted-foreground">
//                       {item.quantity} x {formatCurrency(item.price)}
//                     </p>
//                   </div>
//                   <p className="font-semibold">{formatCurrency(item.quantity * item.price)}</p>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <Separator />

//           <div className="space-y-2">
//             <div className="flex justify-between">
//               <span className="text-muted-foreground">Subtotal</span>
//               <span>{formatCurrency(order.totalAmount)}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-muted-foreground">Shipping</span>
//               <span>Free</span>
//             </div>
//             <div className="flex justify-between text-lg font-bold">
//               <span>Total Paid</span>
//               <span>{formatCurrency(order.totalAmount)}</span>
//             </div>
//           </div>
//         </CardContent>
//         <CardFooter className="flex-col gap-4">
//           <Button asChild className="w-full">
//             <Link href="/track">Track Your Order</Link>
//           </Button>
//           <Button asChild variant="outline" className="w-full">
//             <Link href="/">Continue Shopping</Link>
//           </Button>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }


import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, AlertTriangle, Package, ShoppingBag } from 'lucide-react';
import { IOrder } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { notFound } from 'next/navigation';
import { getOrder } from '@/app/actions';


export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: { orderId?: string };
}) {
  const { orderId } = searchParams;

  if (!orderId) {
    notFound();
  }

  const order = await getOrder(orderId);

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg text-center border-0 shadow-2xl bg-white dark:bg-slate-800 rounded-3xl">
          <CardHeader className="pt-12">
            <div className="relative mx-auto mb-6">
              <div className="absolute inset-0 bg-red-500/10 blur-3xl rounded-full"></div>
              <div className="relative bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/50 dark:to-orange-950/50 rounded-full h-24 w-24 mx-auto flex items-center justify-center border border-red-200 dark:border-red-900">
                <AlertTriangle className="h-12 w-12 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <CardTitle className="text-4xl font-bold text-slate-800 dark:text-white mb-3">Order Not Found</CardTitle>
            <CardDescription className="text-lg text-slate-600 dark:text-slate-400">
              We could not find the details for this order. Please check the ID or contact support.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex-col gap-3 pb-12">
            <Button asChild className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full py-6 text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105">
              <Link href="/track">Track a Different Order</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl border-0 shadow-2xl bg-white dark:bg-slate-800 rounded-3xl overflow-hidden">
        <CardHeader className="text-center pt-12 pb-8 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950/30 dark:via-emerald-950/30 dark:to-teal-950/30">
          <div className="relative mx-auto mb-6">
            <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/50 dark:to-emerald-900/50 rounded-full h-24 w-24 mx-auto flex items-center justify-center border-4 border-green-200 dark:border-green-800 shadow-xl">
              <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">
            Payment Successful!
          </CardTitle>
          <CardDescription className="text-lg text-slate-700 dark:text-slate-300">
            Thank you, <span className="font-semibold text-slate-800 dark:text-white">{order.customerName}</span>. Your order is confirmed.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6 p-8">
          <div className="text-center p-5 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 rounded-2xl border border-indigo-100 dark:border-indigo-900">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Your Order ID</p>
            <p className="font-mono text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {order._id}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              Order Summary
            </h3>
            <ul className="divide-y divide-slate-200 dark:divide-slate-700">
              {order.items.map((item) => (
                <li key={String(item.product._id)} className="py-4 flex items-center gap-4">
                  {item.product.imageUrls?.[0] && (
                    <div className="relative h-16 w-16 rounded-xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 flex-shrink-0">
                      <Image
                        src={item.product.imageUrls[0]}
                        alt={item.product.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjFmNWY5Ii8+PC9zdmc+"
                        data-ai-hint="product image"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800 dark:text-white">{item.product.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {item.quantity} x {formatCurrency(item.price)}
                    </p>
                  </div>
                  <p className="font-bold text-slate-800 dark:text-white">{formatCurrency(item.quantity * item.price)}</p>
                </li>
              ))}
            </ul>
          </div>

          <Separator className="my-6" />

          <div className="space-y-3 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl">
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-800 dark:text-white">{formatCurrency(order.totalAmount)}</span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Shipping</span>
              <span className="font-semibold text-green-600 dark:text-green-400">Free</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-slate-800 dark:text-white">Total Paid</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {formatCurrency(order.totalAmount)}
              </span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex-col gap-3 p-8 pt-4 pb-12">
          <Button asChild className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full py-6 text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105">
            <Link href="/track">
              <Package className="mr-2 h-5 w-5" />
              Track Your Order
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full rounded-full py-6 text-lg border-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
            <Link href="/">Continue Shopping</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}