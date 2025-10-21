import { IOrder } from "@/types";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";
import Product from "@/models/Product"; // Ensure Product model is initialized
import OrdersClient from "./OrdersClient";

async function getOrders(): Promise<IOrder[]> {
  const connection = await dbConnect();
  if (!connection) return [];
  // Ensure Product model is initialized to be used in population
  Product.init();
  const orders = await Order.find({})
    .sort({ createdAt: -1 })
    .populate({
      path: 'items.product',
      model: 'Product',
    })
    .lean();
  return JSON.parse(JSON.stringify(orders));
}


export default async function OrdersPage() {
  const orders = await getOrders();
  return (
    <div>
     
      <OrdersClient initialOrders={orders} />
    </div>
  );
}
