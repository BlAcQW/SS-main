import { ICategory, IProduct } from "@/types";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import Category from "@/models/Category";
import ProductsClient from "./ProductsClient";

async function getProducts(): Promise<IProduct[]> {
  const connection = await dbConnect();
  if (!connection) return [];
  const products = await Product.find({}).sort({ createdAt: -1 }).populate('category').lean();
  return JSON.parse(JSON.stringify(products));
}

async function getCategories(): Promise<ICategory[]> {
  const connection = await dbConnect();
  if (!connection) return [];
  const categories = await Category.find({}).lean();
  return JSON.parse(JSON.stringify(categories));
}

export default async function ProductsPage() {
  const products = await getProducts();
  const categories = await getCategories();

  return (
    <div>
      {/* <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-headline">Products</h1>
      </div> */}
      <ProductsClient 
        initialProducts={products}
        categories={categories}
      />
    </div>
  );
}
