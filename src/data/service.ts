import { RepairService,  } from '../types';

export const repairServices: RepairService[] = [
  {
    id: '1',
    name: 'Screen Replacement',
    description: 'Professional screen replacement for cracked or damaged displays',
    price: 150,
    duration: '1-2 hours',
    category: 'phone'
  },
  {
    id: '2',
    name: 'Battery Replacement',
    description: 'Replace old or degraded batteries to restore device performance',
    price: 80,
    duration: '30-60 minutes',
    category: 'phone'
  },
  {
    id: '3',
    name: 'Laptop Screen Repair',
    description: 'Fix cracked laptop screens and display issues',
    price: 250,
    duration: '2-4 hours',
    category: 'laptop'
  },
  {
    id: '4',
    name: 'Water Damage Repair',
    description: 'Professional cleaning and restoration for water-damaged devices',
    price: 120,
    duration: '1-3 days',
    category: 'other'
  },
  {
    id: '5',
    name: 'Charging Port Repair',
    description: 'Fix loose or broken charging ports',
    price: 90,
    duration: '1-2 hours',
    category: 'phone'
  },
  {
    id: '6',
    name: 'Keyboard Replacement',
    description: 'Replace faulty laptop keyboards',
    price: 180,
    duration: '2-3 hours',
    category: 'laptop'
  },
  {
    id: '7',
    name: 'Other Repairs',
    description: 'Custom repair services for various device issues',
    price: 180,
    duration: '2-3 hours',
    category: 'laptop'
  }
];
