import { Schema, model, models, Model, Types } from 'mongoose';
import type { IOrder, IOrderItem } from '@/types';

const OrderItemSchema = new Schema<IOrderItem>({
  product: { type: Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
}, { _id: false });

const OrderSchema = new Schema<IOrder>({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerLocation: { type: String, required: true },
  customerWhatsapp: { type: String, required: true },
  items: [OrderItemSchema],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending',
  },
  paymentMethod: {
    type: String,
    enum: ['whatsapp', 'paystack'],
    required: true,
  },
  paymentReference: {
    type: String,
  },
}, { timestamps: true });

const Order: Model<IOrder> = models.Order || model<IOrder>('Order', OrderSchema);

export default Order;
