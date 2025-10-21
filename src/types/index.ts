
import type { Types } from 'mongoose';

export interface ICategory {
  _id: string;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrls: string[];
  category: ICategory | Types.ObjectId | string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICartItem extends IProduct {
  quantity: number;
}

export interface IOrderItem {
  product: IProduct | Types.ObjectId | string;
  quantity: number;
  price: number;
}

export interface IOrder {
  _id: string;
  customerName: string;
  customerEmail: string;
  customerLocation: string;
  customerWhatsapp: string;
  items: IOrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentMethod: 'whatsapp' | 'paystack';
  paymentReference?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPromoCode {
  _id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  expirationDate?: Date;
  isActive: boolean;
  applicableProducts: (Types.ObjectId | string)[];
  createdAt?: Date;
  updatedAt?: Date;
}
export interface RepairService {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  category: 'laptop' | 'phone' | 'tablet' | 'other';
}