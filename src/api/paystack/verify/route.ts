// import { NextResponse, NextRequest } from 'next/server';
// import dbConnect from '@/lib/mongodb';
// import Order from '@/models/Order';
// import Product from '@/models/Product';
// import { sendNewOrderNotificationEmail, sendOrderConfirmationEmail } from '@/lib/email';

// const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY!;

// export async function GET(request: NextRequest) {
//   const searchParams = request.nextUrl.searchParams;
//   const reference = searchParams.get('reference');

//   if (!reference) {
//     console.log("❌ No reference provided.");
//     return NextResponse.redirect(new URL('/checkout?error=no_reference', request.url));
//   }

//   // The order ID is the reference
//   const orderId = reference;
//   console.log(`[${orderId}] 🔍 Starting verification...`);

//   try {
//     // Verify payment with Paystack
//     const PAYSTACK_VERIFY_URL = `https://api.paystack.co/transaction/verify/${reference}`;
//     const verificationResponse = await fetch(PAYSTACK_VERIFY_URL, {
//       method: 'GET',
//       headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` },
//     });

//     const data = await verificationResponse.json();

//     if (!data.status || data.data.status !== 'success') {
//       await Order.findByIdAndUpdate(orderId, { paymentStatus: 'failed' });
//       console.log(`[${orderId}] ❌ Paystack verification failed or status not success. Status: ${data.data?.status}`);
//       return NextResponse.redirect(new URL('/checkout?error=payment_failed', request.url));
//     }
    
//     console.log(`[${orderId}] ✅ Paystack API reported success.`);
//     await dbConnect();
    
//     // Find the order using the reference (order ID)
//     const order = await Order.findById(orderId);

//     if (!order) {
//       console.error(`[${orderId}] ❌ Verification successful, but order not found in DB.`);
//       return NextResponse.redirect(new URL('/checkout?error=order_not_found', request.url));
//     }

//     // Idempotency check: if already paid, redirect to success
//     if (order.paymentStatus === 'paid') {
//       console.log(`[${orderId}] ⚠️ Order already marked as paid. Redirecting to success.`);
//       return NextResponse.redirect(new URL(`/checkout/success?orderId=${order._id}`, request.url));
//     }

//     // Amount verification (amount is in the lowest currency unit, e.g., kobo, pesewas)
//     const amountPaid = data.data.amount;
//     const expectedAmount = Math.round(order.totalAmount * 100);
    
//     if (amountPaid < expectedAmount) {
//        await Order.findByIdAndUpdate(orderId, { paymentStatus: 'failed', status: 'cancelled' });
//        console.error(`[${orderId}] 🚨 FRAUD ALERT: Amount paid (${amountPaid}) is less than expected (${expectedAmount}).`);
//        return NextResponse.redirect(new URL('/checkout?error=payment_tampered', request.url));
//     }
//     console.log(`[${orderId}] ✅ Amount verification passed.`);

//     // Atomically update the order and get the updated document
//     const updatedOrder = await Order.findByIdAndUpdate(
//       orderId,
//       {
//         paymentStatus: 'paid',
//         status: 'processing',
//         paymentReference: reference,
//       },
//       { new: true } // Return the updated document
//     ).populate('items.product');
    
    

//     if (!updatedOrder) {
//        console.error(`[${orderId}] ❌ Failed to update the order in DB after successful payment.`);
//        throw new Error('Failed to update the order.');
//     }
//     console.log(`[${orderId}] ✅ Order status updated to 'paid' and 'processing' in DB.`);


//     // Decrement stock levels
//     for (const item of updatedOrder.items) {
//       if (item.product && typeof item.product === 'object' && '_id' in item.product) {
//         await Product.findByIdAndUpdate(item.product._id, {
//           $inc: { stock: -item.quantity },
//         });
//       }
//     }
//     console.log(`[${orderId}] ✅ Stock levels decremented.`);
    
//     // Send notifications with error handling
//     try {
//       console.log(`[${orderId}] ✉️ Sending emails...`);
//       await sendNewOrderNotificationEmail(updatedOrder);
//       await sendOrderConfirmationEmail(updatedOrder);
//       console.log(`[${orderId}] ✅ Emails sent successfully.`);
//     } catch (emailError) {
//       console.error(`[${orderId}] ⚠️ Email sending failed, but payment was successful.`, emailError);
//       // Do not block the user flow for email errors.
//     }

//     // Redirect to the success page
//     console.log(`[${orderId}] 🎉 Verification complete. Redirecting to success page.`);
//     return NextResponse.redirect(new URL(`/checkout/success?orderId=${updatedOrder._id}`, request.url));

//   } catch (error) {
//     console.error(`[${orderId}] 🔥 Paystack verification process failed with error:`, error);
//     return NextResponse.redirect(new URL('/checkout?error=verification_failed', request.url));
//   }
// }


// with new email blast 
// /api/paystack/verify/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import dbConnect from '@/lib/mongodb';
// import Order from '@/models/Order';
// import { processPaystackOrder } from '@/app/actions'; // Import your new function

// const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY!;

// export async function GET(request: NextRequest) {
//   const searchParams = request.nextUrl.searchParams;
//   const reference = searchParams.get('reference');

//   if (!reference) {
//     console.log("❌ No reference provided.");
//     return NextResponse.redirect(new URL('/checkout?error=no_reference', request.url));
//   }

//   // The order ID is the reference
//   const orderId = reference;
//   console.log(`[${orderId}] 🔍 Starting verification...`);

//   try {
//     // Verify payment with Paystack
//     const PAYSTACK_VERIFY_URL = `https://api.paystack.co/transaction/verify/${reference}`;
//     const verificationResponse = await fetch(PAYSTACK_VERIFY_URL, {
//       method: 'GET',
//       headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` },
//     });

//     const data = await verificationResponse.json();

//     if (!data.status || data.data.status !== 'success') {
//       console.log(`[${orderId}] ❌ Paystack verification failed or status not success. Status: ${data.data?.status}`);
      
//       // Process failed payment using our new function
//       await processPaystackOrder(orderId, 'failed');
      
//       return NextResponse.redirect(new URL('/checkout?error=payment_failed', request.url));
//     }
    
//     console.log(`[${orderId}] ✅ Paystack API reported success.`);
//     await dbConnect();
    
//     // Find the order to verify amount
//     const order = await Order.findById(orderId);

//     if (!order) {
//       console.error(`[${orderId}] ❌ Verification successful, but order not found in DB.`);
//       return NextResponse.redirect(new URL('/checkout?error=order_not_found', request.url));
//     }

//     // Idempotency check: if already paid, redirect to success
//     if (order.paymentStatus === 'paid') {
//       console.log(`[${orderId}] ⚠️ Order already marked as paid. Redirecting to success.`);
//       return NextResponse.redirect(new URL(`/checkout/success?orderId=${order._id}`, request.url));
      
//     }

//     // Amount verification (amount is in the lowest currency unit, e.g., kobo, pesewas)
//     const amountPaid = data.data.amount;
//     const expectedAmount = Math.round(order.totalAmount * 100);
    
//     if (amountPaid < expectedAmount) {
//        console.error(`[${orderId}] 🚨 FRAUD ALERT: Amount paid (${amountPaid}) is less than expected (${expectedAmount}).`);
       
//        // Process as failed payment
//        await processPaystackOrder(orderId, 'failed');
       
//        return NextResponse.redirect(new URL('/checkout?error=payment_tampered', request.url));
//     }
//     console.log(`[${orderId}] ✅ Amount verification passed.`);

//     // Process successful payment using our new function
//     await processPaystackOrder(orderId, 'paid');

//     // Redirect to the success page
//     console.log(`[${orderId}] 🎉 Verification complete. Redirecting to success page.`);
//     return NextResponse.redirect(new URL(`/checkout/success?orderId=${orderId}`, request.url));

//   } catch (error) {
//     console.error(`[${orderId}] 🔥 Paystack verification process failed with error:`, error);
//     return NextResponse.redirect(new URL('/checkout?error=verification_failed', request.url));
//   }
// }