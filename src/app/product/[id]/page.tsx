import { Suspense } from 'react';
import { notFound, redirect } from 'next/navigation';
import { ProductDetailClient, ProductDetailSkeleton } from './ProductDetailClient';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import { IProduct } from '@/types';
import mongoose from 'mongoose';

// Result type for better error handling
type ProductResult = 
  | { success: true; product: IProduct }
  | { success: false; error: 'invalid_id' | 'not_found' | 'connection_error' | 'unknown_error' };

async function getProduct(id: string, retries = 2): Promise<ProductResult> {
  // Validate ObjectId format before querying
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    console.error('Invalid product ID format:', id);
    return { success: false, error: 'invalid_id' };
  }

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const connection = await dbConnect();
      if (!connection) {
        console.error(`Database connection failed (attempt ${attempt + 1}/${retries + 1})`);
        if (attempt === retries) {
          return { success: false, error: 'connection_error' };
        }
        // Wait before retry with exponential backoff
        await new Promise(resolve => setTimeout(resolve, 500 * Math.pow(2, attempt)));
        continue;
      }

      // Populate the category field with timeout
      const product = await Product.findById(id)
        .populate('category')
        .lean()
        .maxTimeMS(10000); // 10 second timeout

      if (!product) {
        console.error('Product not found:', id);
        return { success: false, error: 'not_found' };
      }

      return { 
        success: true, 
        product: JSON.parse(JSON.stringify(product)) 
      };
    } catch (error) {
      console.error(`Error fetching product (attempt ${attempt + 1}/${retries + 1}):`, error);
      if (attempt === retries) {
        return { success: false, error: 'unknown_error' };
      }
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 500 * Math.pow(2, attempt)));
    }
  }

  return { success: false, error: 'unknown_error' };
}


export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // In Next.js 15, params is a Promise and must be awaited
  const { id } = await params;
  
  // Validate ID before proceeding
  if (!id) {
    notFound();
  }

  const result = await getProduct(id);
  
  if (!result.success) {
    // For not found or invalid ID, show 404
    if (result.error === 'not_found' || result.error === 'invalid_id') {
      notFound();
    }
    // For connection/unknown errors, redirect to homepage
    redirect('/');
  }

  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <ProductDetailClient product={result.product} />
    </Suspense>
  );
}
