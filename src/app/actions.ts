'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { Types } from 'mongoose';
import dbConnect from '@/lib/mongodb';
import Category from '@/models/Category';
import Product from '@/models/Product';
import Order from "@/models/Order";
import PromoCode from '@/models/PromoCode';
import { ICategory, IProduct, IOrder, IOrderItem } from '@/types';
import { sendOrderConfirmationEmail as sendOrderConfirmation, sendNewOrderNotificationEmail as sendNewOrderNotification, sendDeliveryConfirmationEmail as sendDeliveryConfirmation, sendOrderCancellationEmail as sendOrderCancellation } from '@/lib/email';


// Email Actions (as Server Actions)
export async function sendDeliveryConfirmationEmail(order: IOrder): Promise<void> {
  await sendDeliveryConfirmation(order);
}

export async function sendOrderCancellationEmail(order: IOrder): Promise<void> {
  await sendOrderCancellation(order);
}

export async function sendNewOrderNotificationEmail(order: IOrder): Promise<void> {
  await sendNewOrderNotification(order);
}

export async function sendOrderConfirmationEmail(order: IOrder): Promise<void> {
  await sendOrderConfirmation(order);
}


// Category Actions

const categorySchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
});

export async function createCategory(formData: FormData): Promise<ICategory> {
  const validatedFields = categorySchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    throw new Error('Invalid category data.');
  }
  await dbConnect();
  const newCategory = new Category(validatedFields.data);
  await newCategory.save();
  revalidatePath('/admin/categories');
  return JSON.parse(JSON.stringify(newCategory));
}

export async function updateCategory(id: string, formData: FormData): Promise<ICategory> {
  const validatedFields = categorySchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    throw new Error('Invalid category data.');
  }
  await dbConnect();
  const updatedCategory = await Category.findByIdAndUpdate(id, validatedFields.data, { new: true });
  if (!updatedCategory) throw new Error("Category not found");
  revalidatePath('/admin/categories');
  return JSON.parse(JSON.stringify(updatedCategory));
}

export async function deleteCategory(id: string) {
  await dbConnect();
  const productCount = await Product.countDocuments({ category: id });
  if (productCount > 0) {
    throw new Error('Cannot delete category with associated products.');
  }
  await Category.findByIdAndDelete(id);
  revalidatePath('/admin/categories');
}


// Product Actions
const VALID_TAGS = ['Hot Selling', 'Flash Sale', 'New Products', 'Best Seller', 'Limited Edition'] as const;

const productSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  price: z.coerce.number().min(0.01),
  stock: z.coerce.number().min(0),
  category: z.string().min(1),
  imageUrls: z.array(z.string().url()).min(1),
  tags: z.array(z.enum(VALID_TAGS)).optional().default([]),
});

export async function createProduct(values: unknown): Promise<IProduct> {
  const validatedFields = productSchema.safeParse(values);

  if (!validatedFields.success) {
    console.error(validatedFields.error);
    throw new Error('Invalid product data.');
  }
  await dbConnect();
  const newProduct = new Product({
    ...validatedFields.data,
    category: new Types.ObjectId(validatedFields.data.category),
    tags: validatedFields.data.tags || [],
  });
  await newProduct.save();
  const populatedProduct = await Product.findById(newProduct._id).populate('category');
  revalidatePath('/admin/products');
  revalidatePath('/');
  return JSON.parse(JSON.stringify(populatedProduct));
}

export async function updateProduct(id: string, values: unknown): Promise<IProduct> {
  const validatedFields = productSchema.safeParse(values);
  if (!validatedFields.success) {
    throw new Error('Invalid product data.');
  }
  await dbConnect();
  const updatedProduct = await Product.findByIdAndUpdate(id, {
    ...validatedFields.data,
    category: new Types.ObjectId(validatedFields.data.category),
    tags: validatedFields.data.tags || [],
  }, { new: true }).populate('category');
  if (!updatedProduct) throw new Error("Product not found");
  revalidatePath('/admin/products');
  revalidatePath('/');
  return JSON.parse(JSON.stringify(updatedProduct));
}

export async function deleteProduct(id: string) {
  await dbConnect();
  await Product.findByIdAndDelete(id);
  revalidatePath('/admin/products');
}

// Promo Actions

const promoCodeSchema = z.object({
  code: z.string().min(3).max(50).trim().toUpperCase(),
  discountType: z.enum(['percentage', 'fixed']),
  value: z.coerce.number().min(0.01),
  expirationDate: z.date().optional(),
  isActive: z.boolean(),
  applicableProducts: z.array(z.string()).optional(),
});


export async function createPromoCode(values: unknown) {
  const validatedFields = promoCodeSchema.safeParse(values);
  if (!validatedFields.success) {
    throw new Error('Invalid promo code data.');
  }

  await dbConnect();
  const newPromoCode = new PromoCode(validatedFields.data);
  await newPromoCode.save();
  revalidatePath('/admin/promos');
  return JSON.parse(JSON.stringify(newPromoCode));
}

export async function updatePromoCode(id: string, values: unknown) {
  const validatedFields = promoCodeSchema.safeParse(values);
  if (!validatedFields.success) {
    throw new Error('Invalid promo code data.');
  }
  await dbConnect();
  const updatedPromoCode = await PromoCode.findByIdAndUpdate(id, validatedFields.data, { new: true });
  if (!updatedPromoCode) throw new Error("Promo code not found");
  revalidatePath('/admin/promos');
  return JSON.parse(JSON.stringify(updatedPromoCode));
}

export async function deletePromoCode(id: string) {
  await dbConnect();
  await PromoCode.findByIdAndDelete(id);
  revalidatePath('/admin/promos');
}

// Order Actions
export async function getOrder(orderId: string): Promise<IOrder | null> {
  await dbConnect();
  Product.init(); // Ensure Product model is initialized for population
  const order = await Order.findById(orderId)
    .populate({
      path: 'items.product',
      model: 'Product'
    })
    .lean();

  if (!order) {
    return null;
  }
  return JSON.parse(JSON.stringify(order));
}

export async function getTrackOrder(id: string): Promise<IOrder | null> {
  await dbConnect();

  if (!Types.ObjectId.isValid(id)) {
    throw new Error('Invalid Order ID format.');
  }

  Product.init(); // Ensure Product model is initialized for population
  const order = await Order.findById(id)
    .select('status items totalAmount createdAt paymentMethod _id')
    .populate({
      path: 'items.product',
      select: 'name imageUrls'
    })
    .lean();

  if (!order) {
    throw new Error('Order not found.');
  }

  return JSON.parse(JSON.stringify(order));
}

// export async function getTrackOrder(id: string): Promise<IOrder | null> {
//   await dbConnect();

//   // Clean the input
//   const cleanId = id.trim();
  
//   // If it's less than 24 characters, it might be a partial ID
//   // If it's exactly 24 characters, check if it's a valid ObjectId
//   // Otherwise, treat it as a string search
  
//   let query;
//   if (cleanId.length === 24 && Types.ObjectId.isValid(cleanId)) {
//     // It's a full ObjectId
//     query = { _id: cleanId };
//   } else if (cleanId.length >= 8) {
//     // It's a partial ID or full string ID - search by string match
//     query = { _id: { $regex: cleanId, $options: 'i' } };
//   } else {
//     throw new Error('Order ID must be at least 8 characters long.');
//   }

//   try {
//     Product.init(); // Ensure Product model is initialized for population
    
//     const order = await Order.findOne(query)
//       .select('status items totalAmount createdAt paymentMethod paymentStatus customerName customerLocation customerEmail customerWhatsapp _id')
//       .populate({
//         path: 'items.product',
//         select: 'name imageUrls'
//       })
//       .lean();

//     if (!order) {
//       throw new Error('Order not found. Please check your order ID and try again.');
//     }

//     return JSON.parse(JSON.stringify(order));
//   } catch (error) {
//     console.error('Error fetching order:', error);
//     if (error instanceof Error) {
//       throw error;
//     }
//     throw new Error('Failed to fetch order details.');
//   }
// }


// export async function createOrder(values: any): Promise<IOrder> {
//   await dbConnect();
//   const { customerName, customerEmail, customerLocation, customerWhatsapp, items, totalPrice, paymentMethod } = values;

//   // Basic validation
//   if (!customerName || !customerEmail || !customerLocation || !customerWhatsapp || !items || !totalPrice || !paymentMethod) {
//     throw new Error('Missing required fields');
//   }

//   const orderItems: IOrderItem[] = [];
//   for (const item of items) {
//     const product = await Product.findById(item._id);
//     if (!product) {
//         throw new Error(`Product ${item.name} does not exist.`);
//     }
//     if (product.stock < item.quantity) {
//       throw new Error(`Product ${item.name} is out of stock.`);
//     }
//     orderItems.push({
//       product: product._id,
//       quantity: item.quantity,
//       price: product.price,
//     });
//   }

//   const newOrder = new Order({
//     customerName,
//     customerEmail,
//     customerLocation,
//     customerWhatsapp,
//     items: orderItems,
//     totalAmount: totalPrice,
//     paymentMethod,
//     paymentStatus: 'pending',
//     status: 'pending',
//   });

//   await newOrder.save();

//   // This logic is now handled in the API route for immediate feedback
//   if (paymentMethod === 'whatsapp') {
//     const populatedOrder = await Order.findById(newOrder._id).populate('items.product');
//     if (populatedOrder) {
//       try {
//         await sendNewOrderNotificationEmail(populatedOrder);
//         await sendOrderConfirmationEmail(populatedOrder);
//       } catch (emailError) {
//           console.error(`Email sending failed for WhatsApp order ${populatedOrder._id}.`, emailError);
//       }
//     }
//   }

//   revalidatePath('/admin/orders');
//   return JSON.parse(JSON.stringify(newOrder));
// }

// export async function createOrder(values: any): Promise<IOrder> {
//   await dbConnect();
//   const { customerName, customerEmail, customerLocation, customerWhatsapp, items, totalPrice, paymentMethod } = values;

//   // Basic validation
//   if (!customerName || !customerEmail || !customerLocation || !customerWhatsapp || !items || !totalPrice || !paymentMethod) {
//     throw new Error('Missing required fields');
//   }

//   const orderItems: IOrderItem[] = [];
//   for (const item of items) {
//     const product = await Product.findById(item._id);
//     if (!product) {
//       throw new Error(`Product ${item.name} does not exist.`);
//     }
//     if (product.stock < item.quantity) {
//       throw new Error(`Product ${item.name} is out of stock.`);
//     }
//     orderItems.push({
//       product: product._id,
//       quantity: item.quantity,
//       price: product.price,
//     });
//   }

//   const newOrder = new Order({
//     customerName,
//     customerEmail,
//     customerLocation,
//     customerWhatsapp,
//     items: orderItems,
//     totalAmount: totalPrice,
//     paymentMethod,
//     paymentStatus: paymentMethod === 'paystack' ? 'pending' : 'pending',
//     status: 'pending',
//   });

//   await newOrder.save();

//   // Only send emails and deduct stock for WhatsApp payments (immediate confirmation)
//   // For Paystack payments, this will be handled after payment verification
//   if (paymentMethod === 'whatsapp') {
//     const populatedOrder = await Order.findById(newOrder._id).populate('items.product');

//     if (populatedOrder) {
//       // Deduct stock for WhatsApp orders (immediate payment)
//       for (const item of populatedOrder.items) {
//         if (item.product && typeof item.product === 'object' && '_id' in item.product) {
//           await Product.findByIdAndUpdate(item.product._id, {
//             $inc: { stock: -item.quantity },
//           });
//         }
//       }
//       console.log(`[${populatedOrder._id}] ✅ Stock levels decremented for WhatsApp order.`);

//       // Send emails for WhatsApp orders
//       try {
//         await sendNewOrderNotificationEmail(populatedOrder);
//         await sendOrderConfirmationEmail(populatedOrder);
//         console.log(`[${populatedOrder._id}] ✅ Emails sent successfully for WhatsApp order.`);
//       } catch (emailError) {
//         console.error(`[${populatedOrder._id}] ⚠️ Email sending failed for WhatsApp order.`, emailError);
//       }
//     }
//   } else if (paymentMethod === 'paystack') {
//     const populatedOrderp = await Order.findById(newOrder._id).populate('items.product');
//     if (populatedOrderp) {
//       // Deduct stock for WhatsApp orders (immediate payment)
//       for (const item of populatedOrderp.items) {
//         if (item.product && typeof item.product === 'object' && '_id' in item.product) {
//           await Product.findByIdAndUpdate(item.product._id, {
//             $inc: { stock: -item.quantity },
//           });
//         }
//       }
//       console.log(`[${populatedOrderp._id}] ✅ Stock levels decremented for WhatsApp order.`);

//       // Send emails for WhatsApp orders
//       try {
//         await sendNewOrderNotificationEmail(populatedOrderp);
//         await sendOrderConfirmationEmail(populatedOrderp);
//         console.log(`[${populatedOrderp._id}] ✅ Emails sent successfully for WhatsApp order.`);
//       } catch (emailError) {
//         console.error(`[${populatedOrderp._id}] ⚠️ Email sending failed for WhatsApp order.`, emailError);
//       }


//       console.log(`[${newOrder._id}] 📝 Paystack order created. Emails and stock deduction will happen after payment verification.`);
//     }
//   }
//     revalidatePath('/admin/orders');
//     return JSON.parse(JSON.stringify(newOrder));
//   }

  // Update Order Status 
  // Main order creation function
export async function createOrder(values: any): Promise<IOrder> {
  await dbConnect();
  const { customerName, customerEmail, customerLocation, customerWhatsapp, customerReference, items, totalPrice, paymentMethod } = values;

  // Basic validation
  if (!customerName || !customerEmail || !customerLocation || !customerWhatsapp || !items || !totalPrice || !paymentMethod) {
    throw new Error('Missing required fields');
  }

  const orderItems: IOrderItem[] = [];
  for (const item of items) {
    const product = await Product.findById(item._id);
    if (!product) {
      throw new Error(`Product ${item.name} does not exist.`);
    }
    if (product.stock < item.quantity) {
      throw new Error(`Product ${item.name} is out of stock.`);
    }
    orderItems.push({
      product: product._id,
      quantity: item.quantity,
      price: product.price,
    });
  }

  const newOrder = new Order({
    customerName,
    customerEmail,
    customerLocation,
    customerWhatsapp,
    customerReference: customerReference || undefined,
    items: orderItems,
    totalAmount: totalPrice,
    paymentMethod,
    paymentStatus: paymentMethod === 'paystack' ? 'pending' : 'pending',
    status: 'pending',
  });

  await newOrder.save();

  // Handle WhatsApp orders immediately (immediate confirmation)
  if (paymentMethod === 'whatsapp') {
    await processWhatsAppOrder(newOrder._id);
  } else if (paymentMethod === 'paystack') {
    console.log(`[${newOrder._id}] 📝 Paystack order created. Emails and stock deduction will happen after payment verification.`);
  }

  revalidatePath('/admin/orders');
  return JSON.parse(JSON.stringify(newOrder));
}

// Function to process WhatsApp orders (immediate processing)
async function processWhatsAppOrder(orderId: string): Promise<void> {
  const populatedOrder = await Order.findById(orderId).populate('items.product');

  if (!populatedOrder) {
    console.error(`[${orderId}] ❌ Order not found for WhatsApp processing.`);
    return;
  }

  try {
    // Deduct stock for WhatsApp orders
    for (const item of populatedOrder.items) {
      if (item.product && typeof item.product === 'object' && '_id' in item.product) {
        await Product.findByIdAndUpdate(item.product._id, {
          $inc: { stock: -item.quantity },
        });
      }
    }
    console.log(`[${populatedOrder._id}] ✅ Stock levels decremented for WhatsApp order.`);

    // Send emails for WhatsApp orders
    await sendNewOrderNotificationEmail(populatedOrder);
    await sendOrderConfirmationEmail(populatedOrder);
    console.log(`[${populatedOrder._id}] ✅ Emails sent successfully for WhatsApp order.`);

  } catch (error) {
    console.error(`[${populatedOrder._id}] ⚠️ Error processing WhatsApp order:`, error);
    throw error;
  }
}

// Function to process Paystack orders after payment verification
export async function processPaystackOrder(orderId: string, paymentStatus: 'paid' | 'failed'): Promise<void> {
  const populatedOrder = await Order.findById(orderId).populate('items.product');

  if (!populatedOrder) {
    console.error(`[${orderId}] ❌ Order not found for Paystack processing.`);
    throw new Error('Order not found');
  }

  if (populatedOrder.paymentMethod !== 'paystack') {
    console.error(`[${orderId}] ❌ Order is not a Paystack order.`);
    throw new Error('Order is not a Paystack order');
  }

  try {
    // Update payment status
    await Order.findByIdAndUpdate(orderId, { 
      paymentStatus: paymentStatus,
      status: paymentStatus === 'paid' ? 'confirmed' : 'cancelled'
    });

    if (paymentStatus === 'paid') {
      // Only process if payment is successful
      
      // Deduct stock for successful Paystack payments
      // for (const item of populatedOrder.items) {
      //   if (item.product && typeof item.product === 'object' && '_id' in item.product) {
      //     await Product.findByIdAndUpdate(item.product._id, {
      //       $inc: { stock: -item.quantity },
      //     });
      //   }
      // }
      console.log(`[${populatedOrder._id}] ✅ Stock levels decremented for successful Paystack payment.`);

      // Send emails for successful Paystack payments
      await sendNewOrderNotificationEmail(populatedOrder);
      await sendOrderConfirmationEmail(populatedOrder);
      console.log(`[${populatedOrder._id}] ✅ Emails sent successfully for successful Paystack payment.`);

    } else {
      // Payment failed - log but don't deduct stock or send confirmation emails
      console.log(`[${populatedOrder._id}] ❌ Paystack payment failed. No stock deduction or emails sent.`);
    }

    revalidatePath('/admin/orders');

  } catch (error) {
    console.error(`[${populatedOrder._id}] ⚠️ Error processing Paystack order:`, error);
    throw error;
  }
}




  export async function updateOrderStatus(orderId: string, status: IOrder['status']): Promise<IOrder> {
    await dbConnect();
    Product.init();

    const originalOrder = await Order.findById(orderId).lean();

    if (!originalOrder) {
      throw new Error('Order not found');
    }

    const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true })
      .populate({
        path: 'items.product',
        model: 'Product'
      });

    if (!updatedOrder) {
      throw new Error('Order not found');
    }

    // Use the direct email functions for reliability from server-side actions
    if (originalOrder?.status !== 'delivered' && updatedOrder.status === 'delivered') {
      await sendDeliveryConfirmation(updatedOrder);
    }

    if (originalOrder?.status !== 'cancelled' && updatedOrder.status === 'cancelled') {
      await sendOrderCancellation(updatedOrder);

      // Restock items for cancelled orders
      for (const item of updatedOrder.items) {
        if (item.product && typeof item.product === 'object' && '_id' in item.product) {
          await Product.findByIdAndUpdate(item.product._id, {
            $inc: { stock: item.quantity },
          });
        }
      }
    }

    revalidatePath('/admin/orders');
    revalidatePath(`/track?orderId=${orderId}`);
    return JSON.parse(JSON.stringify(updatedOrder));
  }

  export async function deleteOrder(orderId: string) {
    await dbConnect();
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      throw new Error('Order not found');
    }
    revalidatePath('/admin/orders');
  }


  // Promo Actions
  export async function validatePromoCode(code: string) {
    await dbConnect();

    if (!code) {
      throw new Error('Promo code is required.');
    }

    const promoCode = await PromoCode.findOne({ code: code.toUpperCase() });

    if (!promoCode) {
      throw new Error('Invalid promo code.');
    }

    if (!promoCode.isActive) {
      throw new Error('This promo code is not active.');
    }

    if (promoCode.expirationDate && new Date(promoCode.expirationDate) < new Date()) {
      promoCode.isActive = false;
      await promoCode.save();
      throw new Error('This promo code has expired.');
    }

    return JSON.parse(JSON.stringify(promoCode));
  }
