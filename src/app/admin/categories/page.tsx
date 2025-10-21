import { ICategory } from "@/types";
import dbConnect from "@/lib/mongodb";
import Category from "@/models/Category";
import CategoriesClient from "./CategoriesClient";

async function getCategories(): Promise<ICategory[]> {
  const connection = await dbConnect();
  if (!connection) return [];
  const categories = await Category.find({}).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(categories));
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div>
      
      <CategoriesClient initialCategories={categories} />
    </div>
  );
}
