
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import { Types } from 'mongoose';
import Product from '@/models/Product'; // Ensure product model is loaded for population

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const { id } = params;

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid Order ID format.' }, { status: 400 });
    }
    
    Product.init(); // Ensure Product model is initialized for population
    const order = await Order.findById(id)
      .select('status items totalAmount createdAt paymentMethod _id')
      .populate({
        path: 'items.product',
        select: 'name imageUrls' 
      })
      .lean();

    if (!order) {
      return NextResponse.json({ message: 'Order not found.' }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('[ORDER_TRACK_ERROR]', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
