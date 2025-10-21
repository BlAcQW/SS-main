import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import PromoCode from '@/models/PromoCode';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json({ message: 'Promo code is required.' }, { status: 400 });
    }

    const promoCode = await PromoCode.findOne({ code: code.toUpperCase() });

    if (!promoCode) {
      return NextResponse.json({ message: 'Invalid promo code.' }, { status: 404 });
    }

    if (!promoCode.isActive) {
      return NextResponse.json({ message: 'This promo code is not active.' }, { status: 400 });
    }

    if (promoCode.expirationDate && new Date(promoCode.expirationDate) < new Date()) {
      promoCode.isActive = false;
      await promoCode.save();
      return NextResponse.json({ message: 'This promo code has expired.' }, { status: 400 });
    }

    return NextResponse.json(promoCode);
  } catch (error) {
    console.error('[PROMO_VALIDATE_ERROR]', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
