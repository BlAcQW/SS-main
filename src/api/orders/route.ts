
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import Product from '@/models/Product';
import { IOrderItem, IOrder } from '@/types';
import { sendNewOrderNotificationEmail, sendOrderConfirmationEmail } from '@/lib/email';

// This route is now primarily for non-Paystack orders (e.g., WhatsApp)
export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    // Note: totalPrice is intentionally removed. It will be recalculated on the server.
    const { customerName, customerEmail, customerLocation, customerWhatsapp, items, paymentMethod } = body;

    // Basic validation
    if (!customerName || !customerEmail || !customerLocation || !customerWhatsapp || !items || !paymentMethod) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }
    
    // This flow is for WhatsApp, so we create the order directly.
    // Stock should be managed manually by the admin for WhatsApp orders.
    const orderItems: IOrderItem[] = [];
    let calculatedTotalPrice = 0;

    for (const item of items) {
      const product = await Product.findById(item._id).lean();
      if (!product) {
         return NextResponse.json({ message: `Product ${item.name} does not exist.` }, { status: 400 });
      }
      // For Paystack, we check stock here before creating the pending order.
      // For WhatsApp, we also check, but fulfillment is manual.
      if (product.stock < item.quantity) {
        return NextResponse.json({ message: `Product ${item.name} is out of stock.` }, { status: 400 });
      }
      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price, // Use price from DB for security
      });
      calculatedTotalPrice += product.price * item.quantity;
    }

    // Create new order
    const newOrder = new Order({
      customerName,
      customerEmail,
      customerLocation,
      customerWhatsapp,
      items: orderItems,
      totalAmount: calculatedTotalPrice, // Use the server-calculated price
      paymentMethod,
      paymentStatus: 'pending', // All orders start as pending
      status: 'pending',
    });

    await newOrder.save();
    
    // For Paystack orders, stock is only decremented AFTER successful payment verification.
    // For WhatsApp orders, we send notifications immediately.
    if (paymentMethod === 'whatsapp') {
      const populatedOrder = await Order.findById(newOrder._id).populate('items.product');
      if (populatedOrder) {
        try {
            await sendNewOrderNotificationEmail(populatedOrder);
            await sendOrderConfirmationEmail(populatedOrder);
        } catch(emailError) {
            console.error(`[WhatsApp Order ${newOrder._id}] Failed to send emails, but order was created.`, emailError)
        }
      }
    }


    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const orders = await Order.find({}).sort({ createdAt: -1 }).populate({
      path: 'items.product',
      model: 'Product'
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.error('GET Orders error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
