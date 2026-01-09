
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { ProductDetailClient, ProductDetailSkeleton } from './ProductDetailClient';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import { IProduct } from '@/types';
import mongoose from 'mongoose';


async function getProduct(id: string): Promise<IProduct | null> {
  try {
    // Validate ObjectId format before querying
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      console.error('Invalid product ID format:', id);
      return null;
    }

    const connection = await dbConnect();
    if (!connection) {
      console.error('Database connection failed');
      return null;
    }

    // Populate the category field
    const product = await Product.findById(id).populate('category').lean();
    if (!product) {
      console.error('Product not found:', id);
      return null;
    }

    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}


export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // In Next.js 15, params is a Promise and must be awaited
  const { id } = await params;
  
  // Validate ID before proceeding
  if (!id) {
    notFound();
  }

  const product = await getProduct(id);
  
  if (!product) {
    notFound();
  }

  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <ProductDetailClient product={product} />
    </Suspense>
  );
}
