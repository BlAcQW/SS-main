
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { ProductDetailClient, ProductDetailSkeleton } from './ProductDetailClient';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import { IProduct } from '@/types';


async function getProduct(id: string): Promise<IProduct | null> {
  const connection = await dbConnect();
  if (!connection) {
    return null;
  }
  // Populate the category field
  const product = await Product.findById(id).populate('category').lean();
  if (!product) {
    return null;
  }
  return JSON.parse(JSON.stringify(product));
}


export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // In Next.js 15, params is a Promise and must be awaited
  const { id } = await params;
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
