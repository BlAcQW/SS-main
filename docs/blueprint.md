# **App Name**: E-Commerce Lite

## Core Features:

- Category and Product Browsing: Browse categories and products fetched directly from the MongoDB database. 
- Product Detail Pages: Product detail pages rendering key product information like description, pricing and reviews.
- Shopping Cart: Persistent shopping cart for users to manage and view selected products using local storage.
- Checkout Process: Simplified checkout flow with customer information collection and selection of the payment method.
- WhatsApp Order Placement: Offer payment option that redirects to a merchant's Whatsapp contact pre-populated with all of the customer's order details. Generate the wa.me link based on function generateWhatsAppLink(merchantNumber, orderDetails) {return `https://wa.me/${merchantNumber}?text=${encodeURIComponent(orderDetails)}`; }.
- Admin Interface: Display an administration area with a CRUD interface for managing categories and products.
- AI Content Generator: Offer a tool to generate product descriptions, category descriptions, and even promotional content using generative AI to reduce your administrative tasks.

## Style Guidelines:

- Primary color: A gentle, inviting blue (#64B5F6) that evokes trust and stability, without being overbearing.
- Background color: A very light, desaturated blue-gray (#F0F4F8), creating a clean and unobtrusive backdrop.
- Accent color: A complementary, soft orange (#FFA726) that provides a warm, contrasting highlight for key interactive elements.
- Font pairing: 'Poppins' (sans-serif) for headings, lending a geometric and contemporary feel, complemented by 'PT Sans' (sans-serif) for body text to provide readability and warmth.
- Crisp, minimalist icons from a consistent set (e.g., Phosphor or Tabler Icons) to ensure clarity and modernity across the interface.
- A clean, grid-based layout with ample whitespace to ensure a comfortable and intuitive browsing experience.
- Subtle transitions and animations to enhance user interaction without overwhelming, focusing on providing feedback and guidance.