
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { IOrder } from '@/types';
import { formatCurrency, cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Search, PackageCheck, PackageX, Truck, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { getTrackOrder } from '@/app/actions';

const formSchema = z.object({
  orderId: z.string().min(1, 'Order ID is required.'),
});

const statusSteps = ['pending', 'processing', 'shipped', 'delivered'] as const;

export default function TrackOrderPage() {
  const [order, setOrder] = useState<IOrder | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { orderId: '' },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setOrder(null);
    setError(null);
    try {
      const data = await getTrackOrder(values.orderId);
      setOrder(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const currentStepIndex = order ? statusSteps.indexOf(order.status) : -1;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-2xl md:text-3xl font-headline">Track Your Order</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row items-start gap-2">
              <FormField
                control={form.control}
                name="orderId"
                render={({ field }) => (
                  <FormItem className="flex-1 w-full">
                    <FormLabel className="sr-only">Order ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your order ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                <span className="ml-2">Track</span>
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {error && (
        <Card className="max-w-2xl mx-auto mt-8 bg-destructive/10 border-destructive">
          <CardHeader>
            <CardTitle className="text-center text-destructive">{error}</CardTitle>
          </CardHeader>
        </Card>
      )}

      {order && (
        <Card className="max-w-2xl mx-auto mt-8">
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
            <div className="text-sm text-muted-foreground">
              Order placed on {new Date(order.createdAt!).toLocaleDateString()}
            </div>
            <p className="font-mono text-xs pt-1">ID: {order._id}</p>
          </CardHeader>
          <CardContent>
            {order.status === 'cancelled' ? (
              <div className="flex items-center gap-4 p-4 rounded-lg bg-red-50 text-red-800">
                <PackageX className="h-10 w-10" />
                <div>
                  <h3 className="text-xl font-bold">Order Cancelled</h3>
                  <p>This order has been cancelled.</p>
                </div>
              </div>
            ) : (
              <div className="my-8">
                <div className="flex justify-between items-center relative">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-muted">
                    <div
                      className="absolute left-0 top-0 h-full bg-primary transition-all duration-500"
                      style={{ width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%` }}
                    />
                  </div>
                  {statusSteps.map((step, index) => (
                    <div key={step} className="relative z-10 flex flex-col items-center">
                      <div
                        className={cn(
                          'w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300',
                           index <= currentStepIndex ? 'bg-primary text-primary-foreground' : 'bg-muted-foreground/30 text-muted-foreground'
                        )}
                      >
                        {index < currentStepIndex ? <Check className="w-5 h-5" /> : <div className="w-2 h-2 rounded-full bg-current" />}
                      </div>
                      <p className="text-xs mt-2 capitalize">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <Separator className="my-6" />

            <div>
              <h3 className="font-semibold text-lg mb-4">Items in your order</h3>
              <ul className="space-y-4">
                {order.items.map((item, index) => (
                   <li key={index} className="flex items-center gap-4">
                     {item.product && typeof item.product === 'object' && 'imageUrls' in item.product && (
                       <Image
                         src={item.product.imageUrls[0] || 'https://placehold.co/64x64.png'}
                         alt={item.product.name || 'Product Image'}
                         width={64}
                         height={64}
                         className="rounded-md object-cover"
                         loading="lazy"
                         placeholder="blur"
                         blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjFmNWY5Ii8+PC9zdmc+"
                         data-ai-hint="product image"
                       />
                     )}
                     <div className="flex-1">
                       <p className="font-semibold">{item.product && typeof item.product === 'object' && 'name' in item.product ? item.product.name : 'Unknown Product'}</p>
                       <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                     </div>
                     <p className="font-medium">{formatCurrency(item.price * item.quantity)}</p>
                  </li>
                ))}
              </ul>
            </div>
            
            <Separator className="my-6" />

            <div>
              <h3 className="font-semibold text-lg mb-2">Payment</h3>
              <div className="flex justify-between items-center text-sm">
                <p className="text-muted-foreground">Payment Method</p>
                <Badge variant="outline" className="capitalize">{order.paymentMethod}</Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/50 p-4 rounded-b-lg">
             <div className="w-full flex justify-between items-center font-bold text-lg">
                <span>Total Amount</span>
                <span>{formatCurrency(order.totalAmount)}</span>
             </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}


//updated 
// 'use client';

// import { useState } from 'react';
// import Image from 'next/image';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { IOrder } from '@/types';
// import { formatCurrency, cn } from '@/lib/utils';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// import { useToast } from '@/hooks/use-toast';
// import { 
//   Loader2, 
//   Search, 
//   PackageCheck, 
//   PackageX, 
//   Truck, 
//   Check, 
//   Package, 
//   Clock, 
//   CheckCircle2, 
//   XCircle, 
//   MapPin,
//   CreditCard,
//   Calendar,
//   User,
//   ShoppingBag,
//   ArrowRight
// } from 'lucide-react';
// import { Badge } from '@/components/ui/badge';
// import { Separator } from '@/components/ui/separator';
// import { getTrackOrder } from '@/app/actions';

// const formSchema = z.object({
//   orderId: z.string().min(1, 'Order ID is required.'),
// });

// const statusSteps = ['pending', 'processing', 'shipped', 'delivered'] as const;

// const statusConfig = {
//   pending: {
//     icon: Clock,
//     color: 'text-yellow-600',
//     bgColor: 'bg-yellow-100',
//     description: 'Your order has been received and is being prepared'
//   },
//   processing: {
//     icon: Package,
//     color: 'text-blue-600',
//     bgColor: 'bg-blue-100',
//     description: 'Your order is being processed and prepared for shipment'
//   },
//   shipped: {
//     icon: Truck,
//     color: 'text-indigo-600',
//     bgColor: 'bg-indigo-100',
//     description: 'Your order has been shipped and is on its way'
//   },
//   delivered: {
//     icon: CheckCircle2,
//     color: 'text-green-600',
//     bgColor: 'bg-green-100',
//     description: 'Your order has been successfully delivered'
//   },
//   cancelled: {
//     icon: XCircle,
//     color: 'text-red-600',
//     bgColor: 'bg-red-100',
//     description: 'This order has been cancelled'
//   }
// };

// export default function TrackOrderPage() {
//   const [order, setOrder] = useState<IOrder | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const { toast } = useToast();

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: { orderId: '' },
//   });

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     setIsLoading(true);
//     setOrder(null);
//     setError(null);
//     try {
//       const data = await getTrackOrder(values.orderId);
//       setOrder(data);
//     } catch (err) {
//       const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
//       setError(errorMessage);
//       toast({
//         title: 'Error',
//         description: errorMessage,
//         variant: 'destructive',
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const currentStepIndex = order ? statusSteps.indexOf(order.status) : -1;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
//           <div className="text-center">
//             <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Track Your Order</h1>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               Enter your order ID to get real-time updates on your delivery status
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
//         {/* Search Card */}
//         <Card className="max-w-2xl mx-auto shadow-lg border-0 bg-white/80 backdrop-blur-sm">
//           <CardHeader className="pb-4">
//             <div className="flex items-center justify-center mb-4">
//               <div className="bg-blue-500 p-3 rounded-xl">
//                 <Search className="h-6 w-6 text-white" />
//               </div>
//             </div>
//             <CardTitle className="text-center text-xl font-semibold text-gray-900">
//               Enter Order Details
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Form {...form}>
//               <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//                 <FormField
//                   control={form.control}
//                   name="orderId"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-gray-700 font-medium">Order ID</FormLabel>
//                       <FormControl>
//                         <div className="relative">
//                           <Input 
//                             placeholder="Enter your order ID (e.g., 67890abc)" 
//                             {...field}
//                             className="pl-4 pr-4 py-3 text-lg border-2 border-gray-200 focus:border-blue-500 transition-colors"
//                           />
//                         </div>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <Button 
//                   type="submit" 
//                   disabled={isLoading} 
//                   className="w-full py-3 text-lg bg-blue-600 hover:bg-blue-700 transition-colors"
//                 >
//                   {isLoading ? (
//                     <>
//                       <Loader2 className="h-5 w-5 animate-spin mr-2" />
//                       Searching...
//                     </>
//                   ) : (
//                     <>
//                       <Search className="h-5 w-5 mr-2" />
//                       Track Order
//                     </>
//                   )}
//                 </Button>
//               </form>
//             </Form>
//           </CardContent>
//         </Card>

//         {/* Error State */}
//         {error && (
//           <Card className="max-w-2xl mx-auto mt-8 border-red-200 bg-red-50/50 backdrop-blur-sm">
//             <CardContent className="pt-6">
//               <div className="flex items-center gap-4 text-center">
//                 <div className="mx-auto">
//                   <div className="bg-red-100 p-3 rounded-full mb-4 inline-flex">
//                     <XCircle className="h-8 w-8 text-red-600" />
//                   </div>
//                   <h3 className="text-xl font-semibold text-red-800 mb-2">Order Not Found</h3>
//                   <p className="text-red-700 mb-4">{error}</p>
//                   <p className="text-sm text-red-600">
//                     Please check your order ID and try again, or contact customer support if you need assistance.
//                   </p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         )}

//         {/* Order Details */}
//         {order && (
//           <div className="max-w-4xl mx-auto mt-8 space-y-6">
//             {/* Order Header */}
//             <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
//               <CardHeader className="pb-4">
//                 <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//                   <div>
//                     <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
//                       Order #{order._id.slice(-8)}
//                     </CardTitle>
//                     <div className="flex items-center gap-4 text-sm text-gray-600">
//                       <div className="flex items-center gap-1">
//                         <Calendar className="h-4 w-4" />
//                         <span>Placed on {new Date(order.createdAt!).toLocaleDateString('en-US', {
//                           year: 'numeric',
//                           month: 'long',
//                           day: 'numeric'
//                         })}</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <User className="h-4 w-4" />
//                         <span>{order.customerName}</span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <div className="text-2xl font-bold text-gray-900">{formatCurrency(order.totalAmount)}</div>
//                     <Badge 
//                       variant={order.paymentStatus === 'paid' ? 'default' : 'secondary'}
//                       className={`mt-2 ${order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'} border-0 font-medium`}
//                     >
//                       Payment {order.paymentStatus}
//                     </Badge>
//                   </div>
//                 </div>
//               </CardHeader>
//             </Card>

//             {/* Order Status */}
//             <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2 text-xl">
//                   <Package className="h-5 w-5 text-blue-600" />
//                   Order Status
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 {order.status === 'cancelled' ? (
//                   <div className="flex items-center gap-6 p-6 rounded-xl bg-red-50 border border-red-100">
//                     <div className="bg-red-100 p-4 rounded-full">
//                       <PackageX className="h-12 w-12 text-red-600" />
//                     </div>
//                     <div className="flex-1">
//                       <h3 className="text-2xl font-bold text-red-800 mb-2">Order Cancelled</h3>
//                       <p className="text-red-700 text-lg">This order has been cancelled and will not be delivered.</p>
//                       <p className="text-sm text-red-600 mt-2">
//                         If you have any questions, please contact our customer support team.
//                       </p>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="space-y-8">
//                     {/* Current Status Card */}
//                     <div className={cn(
//                       "flex items-center gap-6 p-6 rounded-xl border-2 transition-all",
//                       statusConfig[order.status].bgColor,
//                       "border-current"
//                     )}>
//                       <div className={cn(
//                         "p-4 rounded-full",
//                         statusConfig[order.status].bgColor
//                       )}>
//                         {React.createElement(statusConfig[order.status].icon, {
//                           className: cn("h-12 w-12", statusConfig[order.status].color)
//                         })}
//                       </div>
//                       <div className="flex-1">
//                         <h3 className={cn(
//                           "text-2xl font-bold capitalize mb-2",
//                           statusConfig[order.status].color
//                         )}>
//                           {order.status}
//                         </h3>
//                         <p className="text-gray-700 text-lg">
//                           {statusConfig[order.status].description}
//                         </p>
//                       </div>
//                     </div>

//                     {/* Progress Timeline */}
//                     <div className="relative">
//                       <div className="flex justify-between items-start">
//                         {statusSteps.map((step, index) => {
//                           const isCompleted = index <= currentStepIndex;
//                           const isCurrent = index === currentStepIndex;
//                           const StatusIcon = statusConfig[step].icon;
                          
//                           return (
//                             <div key={step} className="flex flex-col items-center flex-1 relative">
//                               {/* Progress Line */}
//                               {index < statusSteps.length - 1 && (
//                                 <div className="absolute top-6 left-1/2 w-full h-1 -translate-y-1/2">
//                                   <div className="w-full h-full bg-gray-200 rounded-full">
//                                     <div 
//                                       className={cn(
//                                         "h-full rounded-full transition-all duration-700 ease-out",
//                                         isCompleted ? "bg-blue-500" : "bg-gray-200"
//                                       )}
//                                       style={{ 
//                                         width: isCompleted ? '100%' : '0%'
//                                       }}
//                                     />
//                                   </div>
//                                 </div>
//                               )}
                              
//                               {/* Status Node */}
//                               <div className={cn(
//                                 "w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-500 z-10 mb-3",
//                                 isCompleted 
//                                   ? "bg-blue-500 border-blue-500 text-white shadow-lg scale-110" 
//                                   : "bg-white border-gray-300 text-gray-400",
//                                 isCurrent && "ring-4 ring-blue-200 ring-opacity-50"
//                               )}>
//                                 {isCompleted ? (
//                                   <Check className="w-6 h-6" />
//                                 ) : (
//                                   <StatusIcon className="w-6 h-6" />
//                                 )}
//                               </div>
                              
//                               {/* Status Label */}
//                               <div className="text-center">
//                                 <p className={cn(
//                                   "text-sm font-medium capitalize mb-1",
//                                   isCompleted ? "text-blue-600" : "text-gray-500"
//                                 )}>
//                                   {step}
//                                 </p>
//                                 {isCurrent && (
//                                   <p className="text-xs text-gray-500 hidden md:block max-w-24">
//                                     Current status
//                                   </p>
//                                 )}
//                               </div>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>

//             <div className="grid md:grid-cols-2 gap-6">
//               {/* Order Items */}
//               <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <ShoppingBag className="h-5 w-5 text-green-600" />
//                     Order Items
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     {order.items.map((item, index) => (
//                       <div key={index} className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 bg-white">
//                         <div className="flex-shrink-0">
//                           {item.product && typeof item.product === 'object' && 'imageUrls' in item.product ? (
//                             <Image
//                               src={item.product.imageUrls[0] || 'https://placehold.co/64x64.png'}
//                               alt={item.product.name || 'Product Image'}
//                               width={64}
//                               height={64}
//                               className="rounded-lg object-cover border-2 border-gray-100"
//                             />
//                           ) : (
//                             <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
//                               <Package className="h-6 w-6 text-gray-400" />
//                             </div>
//                           )}
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <h4 className="font-semibold text-gray-900 truncate">
//                             {item.product && typeof item.product === 'object' && 'name' in item.product 
//                               ? item.product.name 
//                               : 'Unknown Product'}
//                           </h4>
//                           <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
//                           <p className="text-sm text-gray-500">
//                             {formatCurrency(item.price)} each
//                           </p>
//                         </div>
//                         <div className="text-right">
//                           <p className="font-bold text-lg text-gray-900">
//                             {formatCurrency(item.price * item.quantity)}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Delivery & Payment Info */}
//               <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <MapPin className="h-5 w-5 text-purple-600" />
//                     Delivery & Payment
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   {/* Delivery Address */}
//                   <div>
//                     <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
//                       <MapPin className="h-4 w-4 text-gray-600" />
//                       Delivery Address
//                     </h4>
//                     <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
//                       <p className="text-gray-700">{order.customerLocation}</p>
//                     </div>
//                   </div>

//                   {/* Payment Method */}
//                   <div>
//                     <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
//                       <CreditCard className="h-4 w-4 text-gray-600" />
//                       Payment Method
//                     </h4>
//                     <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
//                       <span className="capitalize text-gray-700">{order.paymentMethod}</span>
//                       <Badge 
//                         variant={order.paymentStatus === 'paid' ? 'default' : 'secondary'}
//                         className={`${order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'} border-0`}
//                       >
//                         {order.paymentStatus}
//                       </Badge>
//                     </div>
//                   </div>

//                   {/* Order Summary */}
//                   <div className="pt-4 border-t border-gray-200">
//                     <div className="flex items-center justify-between text-xl font-bold text-gray-900">
//                       <span>Total Amount</span>
//                       <span>{formatCurrency(order.totalAmount)}</span>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Help Section */}
//             <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
//               <CardContent className="pt-6">
//                 <div className="text-center">
//                   <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h3>
//                   <p className="text-gray-600 mb-4">
//                     If you have any questions about your order or need assistance, our customer support team is here to help.
//                   </p>
//                   <div className="flex flex-col sm:flex-row gap-3 justify-center">
//                     <Button variant="outline" className="bg-white hover:bg-gray-50">
//                       Contact Support
//                     </Button>
//                     <Button variant="outline" className="bg-white hover:bg-gray-50">
//                       FAQ
//                     </Button>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }