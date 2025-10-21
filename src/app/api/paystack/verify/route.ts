// import { NextResponse, NextRequest } from 'next/server';
// import dbConnect from '@/lib/mongodb';
// import Order from '@/models/Order';
// import Product from '@/models/Product';
// import crypto from 'crypto';

// const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY!;

// export async function GET(request: NextRequest) {
//   const searchParams = request.nextUrl.searchParams;
//   const reference = searchParams.get('reference');

//   if (!reference) {
//     return NextResponse.redirect(new URL('/checkout?error=no_reference', request.url));
//   }

//   // The order ID is used as the reference.
//   const orderId = reference;

//   const PAYSTACK_VERIFY_URL = `https://api.paystack.co/transaction/verify/${reference}`;
  
//   try {
//     const verificationResponse = await fetch(PAYSTACK_VERIFY_URL, {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
//       },
//     });

//     const data = await verificationResponse.json();

//     if (data.status && data.data.status === 'success') {
//       await dbConnect();
      
//       const order = await Order.findById(orderId);

//       if (!order) {
//         // If order not found, it might be an error.
//         return NextResponse.redirect(new URL('/checkout?error=order_not_found', request.url));
//       }
      
//       // If order is already paid, just redirect to success.
//       if (order.paymentStatus === 'paid') {
//           return NextResponse.redirect(new URL(`/checkout/success?orderId=${order._id}`, request.url));
//       }

//       // Update Order Status
//       order.paymentStatus = 'paid';
//       order.paymentReference = reference;
//       await order.save();


//       // Decrement stock levels for each product in the order
//       for (const item of order.items) {
//         await Product.findByIdAndUpdate(item.product, {
//           $inc: { stock: -item.quantity },
//         });
//       }
      
//       // Redirect to a success page
//       return NextResponse.redirect(new URL(`/checkout/success?orderId=${order._id}`, request.url));

//     } else {
//       // Payment failed or was cancelled
//       await Order.findByIdAndUpdate(orderId, { paymentStatus: 'failed' });
//       return NextResponse.redirect(new URL('/checkout?error=payment_failed', request.url));
//     }
//   } catch (error) {
//     console.error('Paystack verification error:', error);
//     return NextResponse.redirect(new URL('/checkout?error=verification_failed', request.url));
//   }
// }



import { NextResponse, NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import Product from '@/models/Product';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY!;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const reference = searchParams.get('reference');

  if (!reference) {
    return NextResponse.json(
      { status: 'error', message: 'No reference provided' },
      { status: 400 }
    );
  }

  const PAYSTACK_VERIFY_URL = `https://api.paystack.co/transaction/verify/${reference}`;

  try {
    const verificationResponse = await fetch(PAYSTACK_VERIFY_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await verificationResponse.json();
    

    if (data.status && data.data.status === 'success') {
      await dbConnect();

      const orderId = data.data.metadata?.orderId;
      

      const order = await Order.findById(orderId);
      

      if (!order) {
        return NextResponse.json(
          { status: 'error', message: 'Order not found' },
          { status: 404 }
        );
      }

      if (order.paymentStatus === 'paid') {
        console.log("⚠️ Order already marked as paid:", order._id);
        return NextResponse.json(
          { 
            status: 'success', 
            message: 'Payment already confirmed',
            orderId: order._id 
          },
          { status: 200 }
        );
      }

      // Update order status
      order.paymentStatus = 'paid';
      order.paymentReference = data.data.reference;
      await order.save();

      console.log("✅ Order updated to paid:", order._id);

      // Update product stock
      for (const item of order.items) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: -item.quantity },
        });
      }

      return NextResponse.json(
        { 
          status: 'success', 
          message: 'Payment verified successfully',
          orderId: order._id 
        },
        { status: 200 }
      );
    } else {
      console.log("❌ Payment verification failed:", data);

      const orderId = data?.data?.metadata?.orderId;
      if (orderId) {
        await dbConnect();
        await Order.findByIdAndUpdate(orderId, { paymentStatus: 'failed' });
        console.log("⚠️ Order updated to failed:", orderId);
      }

      return NextResponse.json(
        { status: 'error', message: 'Payment verification failed' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('🔥 Paystack verification error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Verification failed due to server error' },
      { status: 500 }
    );
  }
}