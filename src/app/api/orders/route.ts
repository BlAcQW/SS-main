import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import Product from '@/models/Product';
import { IOrderItem } from '@/types';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { customerName, customerEmail, customerLocation, customerWhatsapp, items, totalPrice, paymentMethod } = body;

    // Basic validation
    if (!customerName || !customerEmail || !customerLocation || !customerWhatsapp || !items || !totalPrice || !paymentMethod) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }
    
    // Check stock and create order items
    const orderItems: IOrderItem[] = [];
    for (const item of items) {
      const product = await Product.findById(item._id);
      if (!product || product.stock < item.quantity) {
        return NextResponse.json({ message: `Product ${item.name} is out of stock or does not exist.` }, { status: 400 });
      }
      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    // Create new order
    const newOrder = new Order({
      customerName,
      customerEmail,
      customerLocation,
      customerWhatsapp,
      items: orderItems,
      totalAmount: totalPrice,
      paymentMethod,
      paymentStatus: 'pending',
      status: 'pending',
    });

    await newOrder.save();

    // Update stock
    for (const item of orderItems) {
      await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
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
