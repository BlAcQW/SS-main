// 'use server'

// import nodemailer from "nodemailer";
// import { IOrder } from "@/types";

// // Email configuration interface
// interface EmailConfig {
//   host: string;
//   port: number;
//   secure: boolean;
//   auth: {
//     user: string;
//     pass: string;
//   };
// }

// // Function to create a Nodemailer transport
// const createTransport = () => {
//   const smtpUser = process.env.SMTP_USER;
//   const smtpPass = process.env.SMTP_PASS;

//   if (!smtpUser || !smtpPass) {
//     console.error("❌ SMTP credentials are not set in environment variables. Email functionality will be disabled.");
//     return null;
//   }

//   const config: EmailConfig = {
//     host: process.env.SMTP_HOST || "smtp.gmail.com",
//     port: parseInt(process.env.SMTP_PORT || "587"),
//     secure: (process.env.SMTP_PORT || "587") === "465", 
//     auth: {
//       user: smtpUser,
//       pass: smtpPass,
//     },
//   };

//   return nodemailer.createTransport(config);
// };

// // Generic function to send an email
// async function sendEmail(to: string, template: { subject: string; html: string }) {
//   const transporter = createTransport();
//   if (!transporter) {
//     console.log(`✉️ Skipping email to ${to} because SMTP is not configured.`);
//     return;
//   }

//   const mailOptions = {
//     from: `"Storely" <${process.env.SMTP_USER}>`, // MUST match the authenticated user
//     to,
//     subject: template.subject,
//     html: template.html,
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log(`✅ Email sent successfully to ${to}. Message ID: ${info.messageId}`);
//     return info;
//   } catch (error) {
//     console.error(`❌ Error sending email to ${to}:`, error);
//     // Re-throw the error to be handled by the calling function
//     throw new Error(`Failed to send email: ${error instanceof Error ? error.message : "Unknown error"}`);
//   }
// }

// // Helper to format currency for emails
// function formatCurrencyForEmail(amount: number) {
//   return new Intl.NumberFormat("en-GH", {
//     style: "currency",
//     currency: "GHS",
//   }).format(amount);
// }

// // Object containing all email templates
// const emailTemplates = {
//   deliveryConfirmation: (order: IOrder) => ({
//     subject: `Your Order #${order._id.toString().slice(-6)} has been Delivered!`,
//     html: `
//       <div style="font-family: Arial, sans-serif; padding: 20px;">
//         <h2 style="color: #2E86C1;">Delivery Confirmation</h2>
//         <p>Hello ${order.customerName},</p>
//         <p>Your order <strong>#${order._id.toString().slice(-6)}</strong> has been successfully delivered.</p>
//         <p>Thank you for shopping with us!</p>
//         <p style="color: #555;">If you have any issues, please contact support.</p>
//       </div>
//     `,
//   }),

//   orderCancellation: (order: IOrder) => ({
//     subject: `Your Order #${order._id.toString().slice(-6)} Has Been Cancelled`,
//     html: `
//       <div style="font-family: Arial, sans-serif; padding: 20px;">
//         <h2 style="color: #C0392B;">Order Cancelled</h2>
//         <p>Hello ${order.customerName},</p>
//         <p>Your order <strong>#${order._id.toString().slice(-6)}</strong> has been cancelled.</p>
//         <p>If this was a mistake, please contact our support team.</p>
//       </div>
//     `,
//   }),

//   newOrderNotification: (order: IOrder) => ({
//     subject: `🎉 New Order Received! #${order._id.toString().slice(-6)}`,
//     html: `
//       <div style="font-family: Arial, sans-serif; padding: 20px;">
//         <h2 style="color: #27AE60;">New Order Notification</h2>
//         <p>A new order has been placed by <strong>${order.customerName}</strong>.</p>
//         <p>Order ID: <strong>#${order._id}</strong></p>
//         <p>Total Amount: <strong>${formatCurrencyForEmail(order.totalAmount)}</strong></p>
//         <p>Check the admin panel for more details.</p>
//       </div>
//     `,
//   }),

//   orderConfirmation: (order: IOrder) => ({
//     subject: `Your Storely Order is Confirmed (#${order._id.toString().slice(-6)})`,
//     html: `
//       <div style="font-family: Arial, sans-serif; padding: 20px;">
//         <h2 style="color: #2E86C1;">Order Confirmation</h2>
//         <p>Hello ${order.customerName},</p>
//         <p>Thank you for your order <strong>#${order._id}</strong>.</p>
//         <p>Total Amount: <strong>${formatCurrencyForEmail(order.totalAmount)}</strong></p>
//         <p>We will notify you once your items are shipped.</p>
//       </div>
//     `,
//   }),
// };

// // Exported functions to be called from other server-side modules
// export async function sendDeliveryConfirmationEmail(order: IOrder): Promise<void> {
//   const template = emailTemplates.deliveryConfirmation(order);
//   await sendEmail(order.customerEmail, template);
// }

// export async function sendOrderCancellationEmail(order: IOrder): Promise<void> {
//   const template = emailTemplates.orderCancellation(order);
//   await sendEmail(order.customerEmail, template);
// }

// export async function sendNewOrderNotificationEmail(order: IOrder): Promise<void> {
//   const adminEmail = process.env.ADMIN_EMAIL;
//   if (!adminEmail) {
//     console.warn("ADMIN_EMAIL not set, skipping new order notification.");
//     return;
//   }
//   const template = emailTemplates.newOrderNotification(order);
//   await sendEmail(adminEmail, template);
// }

// export async function sendOrderConfirmationEmail(order: IOrder): Promise<void> {
//   const template = emailTemplates.orderConfirmation(order);
//   await sendEmail(order.customerEmail, template);
// }

import nodemailer from 'nodemailer';
import { IOrder } from "@/types";

// Email configuration interface
interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  pool?: boolean;
  maxConnections?: number;
  maxMessages?: number;
  rateDelta?: number;
  rateLimit?: number;
  tls?: {
    rejectUnauthorized: boolean;
  };
  connectionTimeout?: number;
  greetingTimeout?: number;
  socketTimeout?: number;
}

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  const config: EmailConfig = {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER || '', // Your email
      pass: process.env.SMTP_PASS || '', // Your email password or app password
    },
    // Additional options to handle Gmail issues
    pool: true, // Use connection pooling
    maxConnections: 1, // Limit concurrent connections
    maxMessages: 3, // Limit messages per connection
    rateDelta: 20000, // 20 seconds between rate limit windows
    rateLimit: 5, // Max 5 emails per rateDelta
    tls: {
      rejectUnauthorized: false, // Accept self-signed certificates
    },
    connectionTimeout: 60000, // 60 seconds connection timeout
    greetingTimeout: 30000, // 30 seconds greeting timeout
    socketTimeout: 60000, // 60 seconds socket timeout
  };

  return nodemailer.createTransport(config);
};

// Email templates
const emailTemplates = {
  deliveryConfirmation: (order: IOrder) => ({
    subject: 'Your Order has been Delivered! 📦',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #10b981; color: white; padding: 20px; text-align: center;">
          <h1>🎉 Order Delivered!</h1>
        </div>
        <div style="padding: 20px;">
          <p>Hi <strong>${order.customerName}</strong>,</p>
          <p>Great news! Your order <strong>#${String(order._id).slice(-6)}</strong> has been delivered.</p>
          
          <div style="background-color: #f3f4f6; padding: 15px; margin: 20px 0; border-radius: 5px;">
            <h3>Order Details:</h3>
            <ul>
              ${order.items.map(item => {
                if (item.product && typeof item.product === 'object' && 'name' in item.product) {
                  return `<li>${item.product.name} (x${item.quantity})</li>`;
                }
                return '';
              }).join('')}
            </ul>
            <p><strong>Total: ${formatCurrency(order.totalAmount)}</strong></p>
          </div>
          
          <p>Thank you for shopping with E-Commerce Lite!</p>
          <p>If you have any questions, feel free to contact our support team.</p>
        </div>
        <div style="background-color: #f9fafb; padding: 10px; text-align: center; font-size: 12px; color: #6b7280;">
          © 2025 E-Commerce Lite. All rights reserved.
        </div>
      </div>
    `,
  }),

  orderCancellation: (order: IOrder) => ({
    subject: 'Order Cancellation Confirmation',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #ef4444; color: white; padding: 20px; text-align: center;">
          <h1>Order Cancelled</h1>
        </div>
        <div style="padding: 20px;">
          <p>Hi <strong>${order.customerName}</strong>,</p>
          <p>We're sorry to inform you that your order <strong>#${String(order._id).slice(-6)}</strong> has been cancelled.</p>
          
          <div style="background-color: #fef2f2; padding: 15px; margin: 20px 0; border-radius: 5px; border-left: 4px solid #ef4444;">
            <p><strong>Important:</strong> If you did not request this cancellation, please contact our support team immediately.</p>
          </div>
          
          <p>If you have any questions or concerns, please don't hesitate to reach out to us.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="mailto:support@ecommercelite.com" style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">Contact Support</a>
          </div>
        </div>
        <div style="background-color: #f9fafb; padding: 10px; text-align: center; font-size: 12px; color: #6b7280;">
          © 2025 E-Commerce Lite. All rights reserved.
        </div>
      </div>
    `,
  }),

  newOrderNotification: (order: IOrder) => ({
    subject: '🎉 New Order Received!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #3b82f6; color: white; padding: 20px; text-align: center;">
          <h1>🎉 New Order Alert!</h1>
        </div>
        <div style="padding: 20px;">
          <p>You have received a new order <strong>#${String(order._id).slice(-6)}</strong>.</p>
          
          <div style="background-color: #f0f9ff; padding: 15px; margin: 20px 0; border-radius: 5px;">
            <h3>Customer Details:</h3>
            <ul style="list-style: none; padding-left: 0;">
              <li><strong>Name:</strong> ${order.customerName}</li>
              <li><strong>Email:</strong> ${order.customerEmail}</li>
              <li><strong>WhatsApp:</strong> ${order.customerWhatsapp}</li>
              <li><strong>Location:</strong> ${order.customerLocation}</li>
            </ul>
          </div>
          
          <div style="background-color: #f3f4f6; padding: 15px; margin: 20px 0; border-radius: 5px;">
            <h3>Order Details:</h3>
            <ul>
              ${order.items.map(item => {
                if (item.product && typeof item.product === 'object' && 'name' in item.product) {
                  return `<li>${item.product.name} (x${item.quantity}) - ${formatCurrency(item.price)}</li>`;
                } else {
                  return `<li>Product ID: ${item.product} (x${item.quantity}) - ${formatCurrency(item.price)}</li>`;
                }
              }).join('')}
            </ul>
            <p><strong>Total Amount: ${formatCurrency(order.totalAmount)}</strong></p>
            <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.ADMIN_DASHBOARD_URL || '#'}" style="background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">View in Dashboard</a>
          </div>
        </div>
      </div>
    `,
  }),

  orderConfirmation: (order: IOrder) => ({
    subject: 'Your E-Commerce Lite Order Confirmation ✅',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #10b981; color: white; padding: 20px; text-align: center;">
          <h1>✅ Order Confirmed!</h1>
        </div>
        <div style="padding: 20px;">
          <p>Hi <strong>${order.customerName}</strong>,</p>
          <p>Thank you for your order! We've received it and will start processing it soon.</p>
          
          <div style="background-color: #ecfdf5; padding: 15px; margin: 20px 0; border-radius: 5px; border-left: 4px solid #10b981;">
            <p><strong>Your Order ID:</strong> ${String(order._id)}</p>
          </div>
          
          <div style="background-color: #f3f4f6; padding: 15px; margin: 20px 0; border-radius: 5px;">
            <h3>Order Summary:</h3>
            <ul>
              ${order.items.map(item => {
                if (item.product && typeof item.product === 'object' && 'name' in item.product) {
                  return `<li>${item.product.name} (x${item.quantity})</li>`;
                }
                return '';
              }).join('')}
            </ul>
            <p><strong>Total: ${formatCurrency(order.totalAmount)}</strong></p>
          </div>
          
          <p>You can track your order status using your Order ID on our website.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.TRACK_ORDER_URL || '#'}" style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">Track Your Order</a>
          </div>
          
          <p>Thank you for shopping with E-Commerce Lite!</p>
        </div>
        <div style="background-color: #f9fafb; padding: 10px; text-align: center; font-size: 12px; color: #6b7280;">
          © 2025 E-Commerce Lite. All rights reserved.
        </div>
      </div>
    `,
  }),
};

// Generic email sending function with retry logic
async function sendEmail(to: string, from: string, template: { subject: string; html: string }, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`📧 Attempting to send email to ${to} (attempt ${attempt}/${retries})`);
      
      const transporter = createTransporter();

      const mailOptions = {
        from: `"Storely" <${from}>`,
        to: to,
        subject: template.subject,
        html: template.html,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log(`✅ Email sent successfully to ${to}`);
      console.log('Message ID:', info.messageId);
      
      // Close the connection after sending
      transporter.close();
      
      return info;
    } catch (error) {
      console.error(`❌ Attempt ${attempt} failed for ${to}:`, error);
      
      if (attempt === retries) {
        console.error(`❌ All ${retries} attempts failed for ${to}. Final error:`, error);
        throw new Error(`Failed to send email after ${retries} attempts: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
      
      // Wait before retrying (exponential backoff)
      const delay = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s...
      console.log(`⏳ Waiting ${delay/1000} seconds before retry...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

/**
 * Sends a delivery confirmation email to the customer.
 * @param order The order that has been delivered.
 */
export async function sendDeliveryConfirmationEmail(order: IOrder): Promise<void> {
  const template = emailTemplates.deliveryConfirmation(order);
  await sendEmail(order.customerEmail, 'sales@ecommercelite.com', template);
}

/**
 * Sends an order cancellation email to the customer.
 * @param order The order that has been cancelled.
 */
export async function sendOrderCancellationEmail(order: IOrder): Promise<void> {
  const template = emailTemplates.orderCancellation(order);
  await sendEmail(order.customerEmail, 'sales@ecommercelite.com', template);
}

/**
 * Sends a new order notification to the admin.
 * @param order The new order that has been placed.
 */
export async function sendNewOrderNotificationEmail(order: IOrder): Promise<void> {
  const adminEmail = process.env.ADMIN_EMAIL || 'enochhenyo@gmail.com';
  const template = emailTemplates.newOrderNotification(order);
  await sendEmail(adminEmail, 'enochhenyo@gmail.com', template);
}

/**
 * Sends an order confirmation email to the customer.
 * @param order The order that has been successfully placed.
 */
export async function sendOrderConfirmationEmail(order: IOrder): Promise<void> {
  const template = emailTemplates.orderConfirmation(order);
  await sendEmail(order.customerEmail, 'sales@ecommercelite.com', template);
}

// Utility function for currency formatting
function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
  }).format(amount);
}

// Test email connection
export async function testEmailConnection(): Promise<boolean> {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully');
    return true;
  } catch (error) {
    console.error('❌ SMTP connection failed:', error);
    return false;
  }
}