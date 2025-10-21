import { Schema, model, models, Model, Types } from 'mongoose';
import type { IPromoCode } from '@/types';

const PromoCodeSchema = new Schema<IPromoCode>({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed'],
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  expirationDate: {
    type: Date,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  applicableProducts: [{
    type: Types.ObjectId,
    ref: 'Product',
  }],
}, { timestamps: true });

const PromoCode: Model<IPromoCode> = models.PromoCode || model<IPromoCode>('PromoCode', PromoCodeSchema);

export default PromoCode;
