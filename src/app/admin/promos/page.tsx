import { IPromoCode, IProduct } from "@/types";
import dbConnect from "@/lib/mongodb";
import PromoCode from "@/models/PromoCode";
import Product from "@/models/Product";
import PromosClient from "./PromosClient";

async function getPromoCodes(): Promise<IPromoCode[]> {
  const connection = await dbConnect();
  if (!connection) return [];
  const promos = await PromoCode.find({}).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(promos));
}

async function getProducts(): Promise<IProduct[]> {
  const connection = await dbConnect();
  if (!connection) return [];
  const products = await Product.find({}).select('name').lean();
  return JSON.parse(JSON.stringify(products));
}

export default async function PromosPage() {
  const promos = await getPromoCodes();
  const products = await getProducts();

  return (
    <div>
      
      <PromosClient initialPromos={promos} products={products} />
    </div>
  );
}
