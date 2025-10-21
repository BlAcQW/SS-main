import { Schema, model, models, Model, Types } from 'mongoose';
import type { IProduct } from '@/types';

const ProductSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  imageUrls: {
    type: [String],
    required: true,
    validate: {
      validator: (v: string[]) => Array.isArray(v) && v.length > 0,
      message: 'At least one image URL is required.',
    },
  },
  category: {
    type: Types.ObjectId,
    ref: 'Category',
    required: true,
  },
}, { timestamps: true });

const Product: Model<IProduct> = models.Product || model<IProduct>('Product', ProductSchema);

export default Product;
