

// //updtated 
// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { useCart } from '@/hooks/useCart';
// import { formatCurrency, generateWhatsAppLink } from '@/lib/utils';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import { useToast } from '@/hooks/use-toast';
// import { Loader2, MessageSquare, CreditCard, Ticket } from 'lucide-react';
// import { IPromoCode } from '@/types';
// import { Separator } from '@/components/ui/separator';
// import Script from 'next/script';
// import { validatePromoCode, createOrder, processPaystackOrder } from '@/app/actions';

// const checkoutSchema = z.object({
//   customerName: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
//   customerEmail: z.string().email({ message: 'Please enter a valid email address.' }),
//   customerLocation: z.string().min(5, { message: 'Location must be at least 5 characters.' }),
//   customerWhatsapp: z.string().min(10, { message: 'Please enter a valid WhatsApp number.' }),
//   paymentMethod: z.enum(['whatsapp', 'paystack'], {
//     required_error: 'You need to select a payment method.',
//   }),
// });

// type CheckoutFormValues = z.infer<typeof checkoutSchema>;

// export default function CheckoutPage() {
//   const router = useRouter();
//   const { items, totalPrice, clearCart, isHydrated } = useCart();
//   const { toast } = useToast();
//   const [isLoading, setIsLoading] = useState(false);
//   const [promoCode, setPromoCode] = useState('');
//   const [appliedPromo, setAppliedPromo] = useState<IPromoCode | null>(null);
//   const [discount, setDiscount] = useState(0);
//   const [paystackLoaded, setPaystackLoaded] = useState(false);

//   const form = useForm<CheckoutFormValues>({
//     resolver: zodResolver(checkoutSchema),
//     defaultValues: {
//       customerName: '',
//       customerEmail: '',
//       customerLocation: '',
//       customerWhatsapp: '',
//       paymentMethod: 'whatsapp',
//     },
//   });

//   const finalTotal = totalPrice - discount;

//   useEffect(() => {
//     if (isHydrated && items.length === 0) {
//       router.push('/cart');
//     }
//   }, [isHydrated, items.length, router]);

//   useEffect(() => {
//     if (typeof window !== 'undefined' && (window as any).PaystackPop) {
//       setPaystackLoaded(true);
//     }
//   }, []);

//   const handleApplyPromoCode = async () => {
//     if (!promoCode) return;
//     setIsLoading(true);
//     try {
//       const promo = await validatePromoCode(promoCode);

//       const applicableItems = promo.applicableProducts.length > 0
//         ? items.filter(item => promo.applicableProducts.includes(item._id))
//         : items;

//       if (applicableItems.length === 0) {
//         throw new Error("Promo code not valid for any items in your cart.");
//       }

//       const eligibleTotal = applicableItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

//       let calculatedDiscount = 0;
//       if (promo.discountType === 'percentage') {
//         calculatedDiscount = (eligibleTotal * promo.value) / 100;
//       } else {
//         calculatedDiscount = promo.value;
//       }

//       setDiscount(Math.min(calculatedDiscount, eligibleTotal));
//       setAppliedPromo(promo);
//       toast({ title: 'Success', description: 'Promo code applied successfully.' });
//     } catch (error) {
//       setAppliedPromo(null);
//       setDiscount(0);
//       toast({ title: 'Error', description: (error as Error).message, variant: 'destructive' });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleWhatsAppOrder = async (values: CheckoutFormValues) => {
//     try {
//       // Create order - this will automatically process WhatsApp orders (deduct stock + send emails)
//       const newOrder = await createOrder({ 
//         ...values, 
//         items, 
//         totalPrice: finalTotal, 
//         paymentMethod: 'whatsapp' 
//       });

//       const orderDetailsText = `*New Order Received!*

// *Order ID:* ${newOrder._id}

// *Customer Details:*
// - *Name:* ${values.customerName}
// - *Email:* ${values.customerEmail}
// - *Location:* ${values.customerLocation}
// - *WhatsApp:* ${values.customerWhatsapp}

// *Order Items:*
// ${items.map(item => `- ${item.name} (x${item.quantity}) - ${formatCurrency(item.price * item.quantity)}`).join('\n')}

// -------------------------
// *Subtotal:* ${formatCurrency(totalPrice)}
// *Discount:* -${formatCurrency(discount)}
// *Total Amount:* *${formatCurrency(finalTotal)}*
// -------------------------
// `;

//       const merchantNumber = process.env.NEXT_PUBLIC_MERCHANT_WHATSAPP_NUMBER || '';
//       const whatsappUrl = generateWhatsAppLink(merchantNumber, orderDetailsText);

//       clearCart();
//       toast({ title: 'Order Submitted!', description: 'Redirecting to WhatsApp...' });
//       window.location.href = whatsappUrl;

//     } catch (error) {
//       toast({
//         title: 'Error',
//         description: (error as Error).message || 'Something went wrong. Please try again.',
//         variant: 'destructive',
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handlePaystackOrder = async (values: CheckoutFormValues) => {
//     setIsLoading(true);
    
//     try {
//       if (!paystackLoaded || !(window as any).PaystackPop) {
//         throw new Error("Paystack is not loaded. Please wait and try again.");
//       }

//       // Create order - this will NOT process Paystack orders (no stock deduction or emails yet)
//       const newOrder = await createOrder({ 
//         ...values, 
//         items, 
//         totalPrice: finalTotal, 
//         paymentMethod: 'paystack' 
//       });

//       const config = {
//         reference: newOrder._id,
//         email: values.customerEmail,
//         amount: Math.round(finalTotal * 100),
//         publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
//         currency: "GHS",
//         metadata: {
//           orderId: newOrder._id,
//           customerName: values.customerName,
//           customerEmail: values.customerEmail,
//         },
//       };

//       const PaystackPop = (window as any).PaystackPop;

//       const handleSuccess = (response: any) => {
//         setTimeout(async () => {
//           try {
//             console.log("🔍 Starting payment verification for reference:", response.reference);
            
//             // Call your verification endpoint which should now use processPaystackOrder()
//             const verifyResponse = await fetch(`/api/paystack/verify?reference=${response.reference}`);
            
//             if (!verifyResponse.ok) {
//               throw new Error(`HTTP error! status: ${verifyResponse.status}`);
//             }
            
//             const data = await verifyResponse.json();
//             console.log("📋 Verification response:", data);
            
//             if (data.status === "success") {
//               const orderId = data.orderId || newOrder._id;
//               console.log("✅ Payment verified successfully. Order ID:", orderId);
//               await processPaystackOrder(orderId, 'paid');
              
              
//               clearCart();
              
//               const successUrl = `/checkout/success?orderId=${orderId}`;
//               console.log("🔗 Navigating to:", successUrl);
              
//               window.location.href = successUrl;
//             } else {
//               console.error("❌ Payment verification failed:", data);
//               throw new Error(data.message || "Payment verification failed");
//             }
//           } catch (error) {
//             console.error("❌ Verification failed:", error);
            
//             let errorMessage = "We could not verify your payment.";
//             if (error instanceof Error) {
//               errorMessage = error.message;
//             }
            
//             toast({
//               title: "Verification Error", 
//               description: errorMessage,
//               variant: "destructive",
//             });
//           } finally {
//             setIsLoading(false);
//           }
//         }, 100); 
//       };

//       const handleClose = () => {
//         toast({
//           title: "Payment window closed",
//           description: "Your order was not completed.",
//           variant: "destructive",
//         });
//         setIsLoading(false);
//       };
      
//       const handler = PaystackPop.setup({
//         key: config.publicKey,
//         email: config.email,
//         amount: config.amount,
//         currency: config.currency,
//         ref: config.reference,
//         metadata: config.metadata,
//         callback: handleSuccess,
//         onClose: handleClose
//       });
      
//       handler.openIframe();

//     } catch (error) {
//       console.error("🔥 Payment initialization error:", error);
//       toast({
//         title: "Error",
//         description: (error as Error).message || "Failed to initialize payment.",
//         variant: "destructive",
//       });
//       setIsLoading(false);
//     }
//   };

//   const onSubmit = async (values: CheckoutFormValues) => {
//     setIsLoading(true);
//     if (items.length === 0) {
//       toast({ title: 'Your cart is empty', description: 'Please add items to your cart before checking out.', variant: 'destructive' });
//       setIsLoading(false);
//       return;
//     }

//     if (values.paymentMethod === 'paystack') {
//       await handlePaystackOrder(values);
//     } else {
//       await handleWhatsAppOrder(values);
//     }
//   };

//   if (!isHydrated) {
//     return null;
//   }

//   return (
//     <>
//       <Script
//         src="https://js.paystack.co/v1/inline.js"
//         onLoad={() => setPaystackLoaded(true)}
//         onError={(e) => console.error('Failed to load Paystack script', e)}
//       />
      
//       <div className="container mx-auto px-4 py-8 md:py-12">
//         <h1 className="text-3xl md:text-4xl font-headline font-bold mb-8 text-center">Checkout</h1>
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
//           <div className="lg:order-2">
//             <div className="space-y-6 lg:sticky lg:top-24">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Promo Code</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex gap-2">
//                     <Input
//                       placeholder="Enter your promo code"
//                       value={promoCode}
//                       onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
//                       disabled={!!appliedPromo}
//                     />
//                     <Button onClick={handleApplyPromoCode} disabled={!promoCode || isLoading || !!appliedPromo}>
//                       <Ticket className="mr-2 h-4 w-4" />
//                       Apply
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Your Order</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <ul className="divide-y">
//                     {items.map(item => (
//                       <li key={item._id} className="py-3 flex justify-between items-center">
//                         <div>
//                           <p className="font-semibold">{item.name}</p>
//                           <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
//                         </div>
//                         <p>{formatCurrency(item.price * item.quantity)}</p>
//                       </li>
//                     ))}
//                   </ul>
//                   <Separator className="my-4" />
//                   <div className="space-y-2">
//                     <div className="flex justify-between">
//                       <p>Subtotal</p>
//                       <p>{formatCurrency(totalPrice)}</p>
//                     </div>
//                     {appliedPromo && (
//                       <div className="flex justify-between text-green-600">
//                         <p>Discount ({appliedPromo.code})</p>
//                         <p>-{formatCurrency(discount)}</p>
//                       </div>
//                     )}
//                     <div className="flex justify-between font-bold text-lg">
//                       <p>Total</p>
//                       <p>{formatCurrency(finalTotal)}</p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//           <div className="lg:order-1">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Customer Information</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <Form {...form}>
//                   <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//                     <FormField control={form.control} name="customerName" render={({ field }) => (<FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>)} />
//                     <FormField control={form.control} name="customerEmail" render={({ field }) => (<FormItem><FormLabel>Email Address</FormLabel><FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl><FormMessage /></FormItem>)} />
//                     <FormField control={form.control} name="customerLocation" render={({ field }) => (<FormItem><FormLabel>Delivery Address</FormLabel><FormControl><Input placeholder="123 Main St, Anytown" {...field} /></FormControl><FormMessage /></FormItem>)} />
//                     <FormField control={form.control} name="customerWhatsapp" render={({ field }) => (<FormItem><FormLabel>WhatsApp Number</FormLabel><FormControl><Input placeholder="+233..." {...field} /></FormControl><FormMessage /></FormItem>)} />

//                     <FormField
//                       control={form.control}
//                       name="paymentMethod"
//                       render={({ field }) => (
//                         <FormItem className="space-y-3">
//                           <FormLabel>Payment Method</FormLabel>
//                           <FormControl>
//                             <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2">
//                               <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
//                                 <FormControl>
//                                   <RadioGroupItem value="whatsapp" />
//                                 </FormControl>
//                                 <FormLabel className="font-normal flex items-center gap-2">
//                                   <MessageSquare className="h-5 w-5" /> Pay via WhatsApp
//                                 </FormLabel>
//                               </FormItem>
//                               <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
//                                 <FormControl>
//                                   <RadioGroupItem value="paystack" />
//                                 </FormControl>
//                                 <FormLabel className="font-normal flex items-center gap-2">
//                                   <CreditCard className="h-5 w-5" /> Pay with Paystack
//                                   {!paystackLoaded && <span className="text-xs text-muted-foreground">(Loading...)</span>}
//                                 </FormLabel>
//                               </FormItem>
//                             </RadioGroup>
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     <Button 
//                       type="submit" 
//                       className="w-full" 
//                       size="lg" 
//                       disabled={isLoading || (form.watch('paymentMethod') === 'paystack' && !paystackLoaded)}
//                     >
//                       {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
//                       Place Order
//                     </Button>
//                   </form>
//                 </Form>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCart } from '@/hooks/useCart';
import { formatCurrency, generateWhatsAppLink } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { Loader2, MessageSquare, CreditCard, Ticket, ShoppingBag, Tag } from 'lucide-react';
import { IPromoCode } from '@/types';
import { Separator } from '@/components/ui/separator';
import Script from 'next/script';
import { validatePromoCode, createOrder, processPaystackOrder } from '@/app/actions';

const checkoutSchema = z.object({
  customerName: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  customerEmail: z.string().email({ message: 'Please enter a valid email address.' }),
  customerLocation: z.string().min(5, { message: 'Location must be at least 5 characters.' }),
  customerWhatsapp: z.string().min(10, { message: 'Please enter a valid WhatsApp number.' }),
  customerReference: z.string().optional(),
  paymentMethod: z.enum(['whatsapp', 'paystack'], {
    required_error: 'You need to select a payment method.',
  }),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart, isHydrated } = useCart();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<IPromoCode | null>(null);
  const [discount, setDiscount] = useState(0);
  const [paystackLoaded, setPaystackLoaded] = useState(false);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customerName: '',
      customerEmail: '',
      customerLocation: '',
      customerWhatsapp: '',
      customerReference: '',
      paymentMethod: 'whatsapp',
    },
  });

  const finalTotal = totalPrice - discount;

  useEffect(() => {
    if (isHydrated && items.length === 0) {
      router.push('/cart');
    }
  }, [isHydrated, items.length, router]);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).PaystackPop) {
      setPaystackLoaded(true);
    }
  }, []);

  const handleApplyPromoCode = async () => {
    if (!promoCode) return;
    setIsLoading(true);
    try {
      const promo = await validatePromoCode(promoCode);

      const applicableItems = promo.applicableProducts.length > 0
        ? items.filter(item => promo.applicableProducts.includes(item._id))
        : items;

      if (applicableItems.length === 0) {
        throw new Error("Promo code not valid for any items in your cart.");
      }

      const eligibleTotal = applicableItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

      let calculatedDiscount = 0;
      if (promo.discountType === 'percentage') {
        calculatedDiscount = (eligibleTotal * promo.value) / 100;
      } else {
        calculatedDiscount = promo.value;
      }

      setDiscount(Math.min(calculatedDiscount, eligibleTotal));
      setAppliedPromo(promo);
      toast({ title: 'Success', description: 'Promo code applied successfully.' });
    } catch (error) {
      setAppliedPromo(null);
      setDiscount(0);
      toast({ title: 'Error', description: (error as Error).message, variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsAppOrder = async (values: CheckoutFormValues) => {
    try {
      const newOrder = await createOrder({ 
        ...values, 
        items, 
        totalPrice: finalTotal, 
        paymentMethod: 'whatsapp' 
      });

      const orderDetailsText = `*New Order Received!*

*Order ID:* ${newOrder._id}

*Customer Details:*
- *Name:* ${values.customerName}
- *Email:* ${values.customerEmail}
- *Location:* ${values.customerLocation}
- *WhatsApp:* ${values.customerWhatsapp}

*Order Items:*
${items.map(item => `- ${item.name} (x${item.quantity}) - ${formatCurrency(item.price * item.quantity)}`).join('\n')}

-------------------------
*Subtotal:* ${formatCurrency(totalPrice)}
*Discount:* -${formatCurrency(discount)}
*Total Amount:* *${formatCurrency(finalTotal)}*
-------------------------
`;

      const merchantNumber = process.env.NEXT_PUBLIC_MERCHANT_WHATSAPP_NUMBER || '';
      const whatsappUrl = generateWhatsAppLink(merchantNumber, orderDetailsText);

      clearCart();
      toast({ title: 'Order Submitted!', description: 'Redirecting to WhatsApp...' });
      window.location.href = whatsappUrl;

    } catch (error) {
      toast({
        title: 'Error',
        description: (error as Error).message || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaystackOrder = async (values: CheckoutFormValues) => {
    setIsLoading(true);
    
    try {
      if (!paystackLoaded || !(window as any).PaystackPop) {
        throw new Error("Paystack is not loaded. Please wait and try again.");
      }

      const newOrder = await createOrder({ 
        ...values, 
        items, 
        totalPrice: finalTotal, 
        paymentMethod: 'paystack' 
      });

      const config = {
        reference: newOrder._id,
        email: values.customerEmail,
        amount: Math.round(finalTotal * 100),
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
        currency: "GHS",
        metadata: {
          orderId: newOrder._id,
          customerName: values.customerName,
          customerEmail: values.customerEmail,
        },
      };

      const PaystackPop = (window as any).PaystackPop;

      const handleSuccess = (response: any) => {
        setTimeout(async () => {
          try {
            console.log("🔍 Starting payment verification for reference:", response.reference);
            
            const verifyResponse = await fetch(`/api/paystack/verify?reference=${response.reference}`);
            
            if (!verifyResponse.ok) {
              throw new Error(`HTTP error! status: ${verifyResponse.status}`);
            }
            
            const data = await verifyResponse.json();
            console.log("📋 Verification response:", data);
            
            if (data.status === "success") {
              const orderId = data.orderId || newOrder._id;
              console.log("✅ Payment verified successfully. Order ID:", orderId);
              await processPaystackOrder(orderId, 'paid');
              
              clearCart();
              
              const successUrl = `/checkout/success?orderId=${orderId}`;
              console.log("🔗 Navigating to:", successUrl);
              
              window.location.href = successUrl;
            } else {
              console.error("❌ Payment verification failed:", data);
              throw new Error(data.message || "Payment verification failed");
            }
          } catch (error) {
            console.error("❌ Verification failed:", error);
            
            let errorMessage = "We could not verify your payment.";
            if (error instanceof Error) {
              errorMessage = error.message;
            }
            
            toast({
              title: "Verification Error", 
              description: errorMessage,
              variant: "destructive",
            });
          } finally {
            setIsLoading(false);
          }
        }, 100); 
      };

      const handleClose = () => {
        toast({
          title: "Payment window closed",
          description: "Your order was not completed.",
          variant: "destructive",
        });
        setIsLoading(false);
      };
      
      const handler = PaystackPop.setup({
        key: config.publicKey,
        email: config.email,
        amount: config.amount,
        currency: config.currency,
        ref: config.reference,
        metadata: config.metadata,
        callback: handleSuccess,
        onClose: handleClose
      });
      
      handler.openIframe();

    } catch (error) {
      console.error("🔥 Payment initialization error:", error);
      toast({
        title: "Error",
        description: (error as Error).message || "Failed to initialize payment.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const onSubmit = async (values: CheckoutFormValues) => {
    setIsLoading(true);
    if (items.length === 0) {
      toast({ title: 'Your cart is empty', description: 'Please add items to your cart before checking out.', variant: 'destructive' });
      setIsLoading(false);
      return;
    }

    if (values.paymentMethod === 'paystack') {
      await handlePaystackOrder(values);
    } else {
      await handleWhatsAppOrder(values);
    }
  };

  if (!isHydrated) {
    return null;
  }

  return (
    <>
      <Script
        src="https://js.paystack.co/v1/inline.js"
        onLoad={() => setPaystackLoaded(true)}
        onError={(e) => console.error('Failed to load Paystack script', e)}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">Complete Your Order</h1>
            <p className="text-slate-600 dark:text-slate-400">Just a few more steps to get your gadgets</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="lg:order-2">
              <div className="space-y-6 lg:sticky lg:top-24">
                {/* Promo Code Card */}
                <Card className="border-0 shadow-lg bg-white dark:bg-slate-800 rounded-2xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-pink-50 dark:from-orange-950/30 dark:to-pink-950/30 border-b border-orange-100 dark:border-orange-900">
                    <CardTitle className="flex items-center gap-2 text-slate-800 dark:text-white">
                      <Tag className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                      Have a Promo Code?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                        disabled={!!appliedPromo}
                        className="rounded-full border-2 focus:border-orange-500"
                      />
                      <Button 
                        onClick={handleApplyPromoCode} 
                        disabled={!promoCode || isLoading || !!appliedPromo}
                        className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white rounded-full px-6 shadow-md hover:shadow-lg transition-all hover:scale-105"
                      >
                        <Ticket className="mr-2 h-4 w-4" />
                        Apply
                      </Button>
                    </div>
                    {appliedPromo && (
                      <div className="mt-4 p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl">
                        <p className="text-sm font-semibold text-green-700 dark:text-green-400">
                          🎉 Code "{appliedPromo.code}" applied! You saved {formatCurrency(discount)}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Order Summary Card */}
                <Card className="border-0 shadow-lg bg-white dark:bg-slate-800 rounded-2xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 border-b border-indigo-100 dark:border-indigo-900">
                    <CardTitle className="flex items-center gap-2 text-slate-800 dark:text-white">
                      <ShoppingBag className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      Order Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="divide-y divide-slate-200 dark:divide-slate-700">
                      {items.map(item => (
                        <li key={item._id} className="py-4 flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-slate-800 dark:text-white">{item.name}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-semibold text-slate-800 dark:text-white">{formatCurrency(item.price * item.quantity)}</p>
                        </li>
                      ))}
                    </ul>
                    <Separator className="my-6" />
                    <div className="space-y-3">
                      <div className="flex justify-between text-slate-600 dark:text-slate-400">
                        <p>Subtotal</p>
                        <p className="font-semibold">{formatCurrency(totalPrice)}</p>
                      </div>
                      {appliedPromo && (
                        <div className="flex justify-between text-green-600 dark:text-green-400">
                          <p className="flex items-center gap-1">
                            <Tag className="h-4 w-4" />
                            Discount ({appliedPromo.code})
                          </p>
                          <p className="font-semibold">-{formatCurrency(discount)}</p>
                        </div>
                      )}
                      <Separator />
                      <div className="flex justify-between items-center">
                        <p className="text-lg font-bold text-slate-800 dark:text-white">Total</p>
                        <p className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                          {formatCurrency(finalTotal)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="lg:order-1">
              <Card className="border-0 shadow-lg bg-white dark:bg-slate-800 rounded-2xl">
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 border-b border-indigo-100 dark:border-indigo-900">
                  <CardTitle className="text-slate-800 dark:text-white">Customer Information</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField control={form.control} name="customerName" render={({ field }) => (<FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" className="rounded-xl border-2 focus:border-indigo-500" {...field} /></FormControl><FormMessage /></FormItem>)} />
                      <FormField control={form.control} name="customerEmail" render={({ field }) => (<FormItem><FormLabel>Email Address</FormLabel><FormControl><Input type="email" placeholder="you@example.com" className="rounded-xl border-2 focus:border-indigo-500" {...field} /></FormControl><FormMessage /></FormItem>)} />
                      <FormField control={form.control} name="customerLocation" render={({ field }) => (<FormItem><FormLabel>Delivery Address</FormLabel><FormControl><Input placeholder="123 Main St, Anytown" className="rounded-xl border-2 focus:border-indigo-500" {...field} /></FormControl><FormMessage /></FormItem>)} />
                      <FormField control={form.control} name="customerWhatsapp" render={({ field }) => (<FormItem><FormLabel>WhatsApp Number</FormLabel><FormControl><Input placeholder="+233..." className="rounded-xl border-2 focus:border-indigo-500" {...field} /></FormControl><FormMessage /></FormItem>)} />
                      <FormField control={form.control} name="customerReference" render={({ field }) => (<FormItem><FormLabel>Reference <span className="text-muted-foreground text-xs font-normal">(Optional)</span></FormLabel><FormControl><Input placeholder="e.g., PO number, project code, or custom reference" className="rounded-xl border-2 focus:border-indigo-500" {...field} /></FormControl><FormMessage /></FormItem>)} />

                      <FormField
                        control={form.control}
                        name="paymentMethod"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="text-base font-semibold">Payment Method</FormLabel>
                            <FormControl>
                              <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-3">
                                <FormItem className="flex items-center space-x-3 space-y-0 rounded-xl border-2 p-4 hover:border-indigo-500 transition-colors cursor-pointer">
                                  <FormControl>
                                    <RadioGroupItem value="whatsapp" />
                                  </FormControl>
                                  <FormLabel className="font-normal flex items-center gap-2 cursor-pointer flex-1">
                                    <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                                      <MessageSquare className="h-5 w-5 text-green-600 dark:text-green-400" />
                                    </div>
                                    <div>
                                      <p className="font-semibold">Pay via WhatsApp</p>
                                      <p className="text-xs text-muted-foreground">Complete payment through WhatsApp</p>
                                    </div>
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0 rounded-xl border-2 p-4 hover:border-indigo-500 transition-colors cursor-pointer">
                                  <FormControl>
                                    <RadioGroupItem value="paystack" />
                                  </FormControl>
                                  <FormLabel className="font-normal flex items-center gap-2 cursor-pointer flex-1">
                                    <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg">
                                      <CreditCard className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                    <div>
                                      <p className="font-semibold">Pay with Paystack</p>
                                      <p className="text-xs text-muted-foreground">
                                        Secure card payment
                                        {!paystackLoaded && <span className="ml-1">(Loading...)</span>}
                                      </p>
                                    </div>
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full py-6 text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105" 
                        size="lg" 
                        disabled={isLoading || (form.watch('paymentMethod') === 'paystack' && !paystackLoaded)}
                      >
                        {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                        {isLoading ? 'Processing...' : 'Place Order'}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}