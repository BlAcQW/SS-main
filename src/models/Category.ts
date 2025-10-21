import { Schema, model, models, Model } from 'mongoose';
import type { ICategory } from '@/types';

const CategorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Category: Model<ICategory> = models.Category || model<ICategory>('Category', CategorySchema);

export default Category;
