import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
  }).format(amount);
}

export function generateWhatsAppLink(merchantNumber: string, orderDetails: string) {
  if (!merchantNumber) return '';
  return `https://wa.me/${merchantNumber}?text=${encodeURIComponent(orderDetails)}`;
}
